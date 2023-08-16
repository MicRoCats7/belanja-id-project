import React, { useEffect, useRef, useState } from "react";
import "../style/detailpesanan.css";
import NavbarCheckout from "../component/navbar/navbarCheckout";
import {
  MdDone,
  MdKeyboardArrowRight,
  MdLocationOn,
  MdOutlineClose,
} from "react-icons/md";
import { TbDiscount2, TbTruckDelivery } from "react-icons/tb";
import { RiErrorWarningFill } from "react-icons/ri";
import { formatPrice } from "../utils/helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";
import token from "../utils/token";
import apiurl from "../utils/apiurl";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Skeleton from "react-loading-skeleton";
import ModalEditAlamat from "../component/modal/modalEditAlamat";
import { IoMdClose } from "react-icons/io";
import ModalAddAlamat from "../component/modal/modalAddAlamat";

function Detailpesanan() {
  const [product, setProduct] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedIds = queryParams.get("selectedIds");
  const [snapToken, setSnapToken] = useState("");
  const snapTokenRef = useRef("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [showShippingPopup, setShowShippingPopup] = useState(false);
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedPrimaryAddress, setSelectedPrimaryAddress] = useState(null);
  const [alamatList, setAlamatList] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        setProduct(JSON.parse(storedProducts));
      }
    };
    fetchProducts();

    const storedSelectedItems = localStorage.getItem("selectedProducts");
    if (storedSelectedItems) {
      const selectedItemsParsed = JSON.parse(storedSelectedItems);
      // Tambahkan harga produk ke setiap item yang diseleksi
      const selectedItemsWithPrice = selectedItemsParsed.map((item) => ({
        ...item,
        productPrice: item.product.price * item.quantity,
      }));
      setSelectedItems(selectedItemsWithPrice);
    } else {
      setSelectedItems([]);
    }
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          apiurl() + "user_addresses/" + user_id,
          {
            headers: {
              Authorization: `Bearer ${token()}`,
            },
          }
        );
        const primaryAddress = response.data.data.find(
          (address) => address.is_primary === "1"
        );
        // Filter alamat yang tidak utama
        const otherAddresses = response.data.data.filter(
          (address) => address.is_primary !== "1"
        );
        setSelectedPrimaryAddress(primaryAddress);
        setAddresses(otherAddresses);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const scriptSnap = document.createElement("script");

    scriptSnap.type = "text/javascript";
    scriptSnap.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    scriptSnap.setAttribute(
      "data-client-key",
      "SB-Mid-client-q5egH5AqzMeOGbOi"
    );

    document.body.appendChild(scriptSnap);

    return () => {
      document.body.removeChild(scriptSnap);
    };
  }, []);

  useEffect(() => {
    const scriptFunctionSnap = document.createElement("script");

    scriptFunctionSnap.type = "text/javascript";
    scriptFunctionSnap.innerHTML = `
    var payButton = document.getElementById('pay-button');
    if (payButton) {
      payButton.addEventListener('click', function () {
        snap.pay('${snapTokenRef.current}');
      });
    }
  `;

    document.body.appendChild(scriptFunctionSnap);

    return () => {
      document.body.removeChild(scriptFunctionSnap);
    };
  }, [snapToken]);

  useEffect(() => {
    axios
      .get(
        apiurl() +
          "shipping/cost?origin_city_id=209&destination_city_id=209&weight=500",
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      )
      .then((response) => {
        setCouriers(response.data.data.delivery_courier);
      })
      .catch((error) => {
        console.error("Error fetching courier data:", error);
      });
  }, []);

  function calculateTotalPrice() {
    let totalPrice = 0;
    selectedItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice + shippingCost;
  }

  function calculateTotalOriginalPrice() {
    let totalOriginalPrice = 0;
    selectedItems.forEach((item) => {
      totalOriginalPrice += item.product.price * item.quantity;
    });
    return totalOriginalPrice;
  }

  function calculateGrandTotal() {
    return calculateTotalOriginalPrice() + calculateShippingCost();
  }

  function calculateShippingCost() {
    if (selectedCourier) {
      return shippingCost;
    }
    return 0;
  }

  function calculateTotalDiscount() {
    let totalDiscount = 0;
    if (discountApplied) {
      totalDiscount = 20000;
    }
    return totalDiscount;
  }

  const handleBeliClick = () => {
    if (isProductSelected()) {
      setIsLoading(true);
      const selectedProducts = JSON.parse(
        localStorage.getItem("selectedProducts")
      );
      const formData = new FormData();

      selectedProducts.forEach((item, index) => {
        formData.append("product_id[]", item.product.id);
        formData.append("quantity[]", item.quantity);
        formData.append("total", calculateTotalPrice());
        formData.append("status", "PENDING");
        formData.append("origin_city_id", 1);
        formData.append("destination_city_id", 2);
        const weights = selectedProducts.map(
          (item) => item.product.weight * item.quantity
        );
        const couriers = selectedProducts.map((item) => item.product.courier);
        weights.forEach((weight, index) => {
          formData.append("weight[]", weight);
          formData.append("courier[]", "jne");
        });
      });

      // console.log(selectedProducts);

      formData.append("cart_id", 9);

      axios
        .post(apiurl() + "checkout", formData, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        })
        .then((response) => {
          // console.log("Respon dari server:", response.data);
          setSnapToken(response.data.data.snap_token);
          snapTokenRef.current = response.data.data.snap_token;
          setShowConfirmation(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat mengirim pesanan:", error);
          setIsLoading(false);
          handleErrorAlertOpen();
        });
    }
  };

  function updatePrimaryAddressInDatabase(addressId) {
    // Menggunakan Promise.all untuk menjalankan kedua permintaan bersamaan
    Promise.all([
      axios.put(
        apiurl() + "user_addresses/" + addressId,
        { is_primary: "1" },
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      ),
      // Mengubah is_primary menjadi 0 untuk alamat lainnya
      ...alamatList.map((alamat) =>
        axios.put(
          apiurl() + "user_addresses/" + alamat.id,
          { is_primary: alamat.id === addressId ? "1" : "0" },
          {
            headers: {
              Authorization: `Bearer ${token()}`,
            },
          }
        )
      ),
    ])
      .then((responses) => {
        // Ambil respons pertama, yang berisi pembaruan alamat utama
        const response = responses[0];
        console.log(
          "Alamat utama berhasil diperbarui di database:",
          response.data
        );

        // Update is_primary value in alamatList
        const updatedAlamatList = alamatList.map((alamat) => {
          if (alamat.id === addressId) {
            return { ...alamat, is_primary: "1" };
          } else {
            return { ...alamat, is_primary: "0" };
          }
        });
        setAlamatList(updatedAlamatList);
      })
      .catch((error) => {
        console.log("Gagal memperbarui alamat utama di database:", error);
      });
  }

  function deleteAlamat(id) {
    axios
      .delete(apiurl() + "user_addresses/" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        handleSuccessAlertOpen();
        setAlamatList((prevAlamatList) =>
          prevAlamatList.filter((alamat) => alamat.id !== id)
        );
        if (selectedPrimaryAddress && selectedPrimaryAddress.id === id) {
          const newPrimaryAddress = alamatList.find(
            (alamat) => alamat.id !== id
          );
          setSelectedPrimaryAddress(newPrimaryAddress);
          updatePrimaryAddressInDatabase(newPrimaryAddress.id);
        }
        console.log("Alamat berhasil dihapus:", response.data);
      })
      .catch((error) => {
        console.log("Gagal menghapus alamat:", error);
        handleErrorAlertOpen();
      });
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  function isProductSelected() {
    return selectedItems.length > 0;
  }

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
  };

  const handlePilihMetodeLain = () => {
    setShowShippingPopup(true);
  };

  const handleCloseShippingPopup = () => {
    setShowShippingPopup(false);
  };

  const handleSelectCourier = (courier) => {
    setSelectedCourier(courier);
    setShippingCost(courier.cost);
    setShowShippingPopup(false);
  };

  function handlePrimaryAddressSelection(address) {
    setSelectedPrimaryAddress(address);

    const updatedAlamatList = alamatList.map((a) =>
      a.id === address.id
        ? { ...a, is_primary: "1" }
        : { ...a, is_primary: "0" }
    );
    setAlamatList(updatedAlamatList);
  }

  const addNewAlamat = (newAlamat) => {
    setAlamatList([...alamatList, newAlamat]);
    setIsAddModalOpen(false); // Menutup modal setelah alamat ditambahkan
  };

  return (
    <div>
      <NavbarCheckout />
      <div className="container-checkout">
        <h1 className="title-checkout">Checkout</h1>
        <div className="container-detailpesanan">
          <div className="container-info-pesanan">
            <div className="container-info-alamat">
              <div className="container-alamat">
                <h1>Alamat pengiriman</h1>
                {selectedPrimaryAddress ? (
                  <div className="main-box-address">
                    <div className="top-alamat">
                      <div className="top-left-alamat">
                        <MdLocationOn color="#969696" />
                        <h4>{selectedPrimaryAddress.label_address}</h4>
                        <div className="role-alamat">
                          <h3>Utama</h3>
                        </div>
                      </div>
                      <div className="top-right-alamat">
                        <h3 onClick={() => setIsEditClicked(true)}>Ubah</h3>
                      </div>
                    </div>
                    <div className="content-address">
                      <div className="name-user">
                        <h3>{selectedPrimaryAddress.receiver_name}</h3>
                        <div className="line-address"></div>
                        <p>{selectedPrimaryAddress.phone_number}</p>
                      </div>
                      <div className="full-address">
                        <p>{selectedPrimaryAddress.address_one}</p>
                        <p>{`${selectedPrimaryAddress.regencies} - ${selectedPrimaryAddress.provinces} - ${selectedPrimaryAddress.zip_code}`}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ModalAddAlamat
                    addNewAlamat={addNewAlamat}
                    closeModal={() => setIsAddModalOpen(false)}
                  />
                )}
              </div>
              {isEditClicked && (
                <div className="address-popup-overlay">
                  <div className="address-popup-content">
                    <div className="top-addres-popup-close">
                      <div className="plus-alamat">
                        <ModalAddAlamat
                          addNewAlamat={addNewAlamat}
                          closeModal={() => setIsAddModalOpen(false)}
                        />
                      </div>
                      <button
                        className="address-popup-close"
                        onClick={() => setIsEditClicked(false)}
                      >
                        <IoMdClose fontSize={30} />
                      </button>
                    </div>
                    {addresses.map((address) => (
                      <div className="box-alamat-popup" key={address.id}>
                        <div className="isi-alamat">
                          <div className="item-alamat" key={address.id}>
                            <div className="text-alamat">
                              <h3>{address.label_address}</h3>
                              {!selectedPrimaryAddress ||
                              selectedPrimaryAddress.id !== address.id ? (
                                <button
                                  className="btn-utama-alamat"
                                  onClick={() => {
                                    handlePrimaryAddressSelection(address);
                                    setIsEditClicked(false); // Close the popup
                                  }}
                                >
                                  Pilih Alamat
                                </button>
                              ) : (
                                <MdDone fontSize={30} color="#ef233c" />
                              )}
                            </div>
                            <div className="line-atas"></div>
                            <div className="nama-nomer-alamat">
                              <h3 className="nama-user-alamat">
                                {address.receiver_name}
                              </h3>
                              <hr />
                              <h3>{address.phone_number}</h3>
                            </div>
                            <div className="deskripsi-alamat">
                              <h3 className="detail-alamat">
                                {address.address_one}
                              </h3>
                              <h3 className="desa-kecamatan">{`${address.regencies} - ${address.provinces} - ${address.zip_code}`}</h3>
                            </div>
                            <div className="line-bawah"></div>
                            <div className="opsi-alamat">
                              <h3
                                onClick={() => deleteAlamat(address.id)}
                                style={{ cursor: "pointer" }}
                              >
                                Hapus
                              </h3>
                              <div>
                                <ModalEditAlamat
                                  address={editingAddress}
                                  closeModal={() => setEditingAddress(null)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {selectedItems.map((item, idx) => (
              <div key={idx} className="container-info-produk">
                <div className="city-address">
                  <MdLocationOn color="#969696" />
                  <h1>Kota Kudus</h1>
                </div>
                <div className="shipping-produk">
                  <div className="pro-shipping">
                    <div className="img-pro-ship">
                      <img src={item.product.picturePath} alt="" />
                    </div>
                    <div className="info-pro-ship">
                      <h1>{item.product.name}</h1>
                      <h2>Rp {formatPrice(item.product.price)}</h2>
                      <h3>Kuantitas : {item.quantity}</h3>
                    </div>
                  </div>
                  <div className="line-shipping"></div>
                  <div className="shipping">
                    {selectedCourier ? (
                      <>
                        <div className="top-shipping">
                          <div className="icon-top-shipping">
                            <TbTruckDelivery color="EF233C" />
                            <p>{selectedCourier.courier}</p>
                          </div>
                          <div className="btn-pilih-shipping">
                            <h2 onClick={handlePilihMetodeLain}>
                              Pilih Metode Lain
                            </h2>
                          </div>
                        </div>
                        <div className="info-shipping">
                          <h2>Rp {formatPrice(selectedCourier.cost)}</h2>
                          <h3>Estimasi pesanan sampai {selectedCourier.etd}</h3>
                          <div className="warning-icon">
                            <RiErrorWarningFill />
                            <h3>Biaya sudah termasuk asuransi pengiriman.</h3>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p>Pilih kurir untuk melihat detail pengiriman.</p>
                        <div className="btn-pilih-shipping">
                          <button onClick={handlePilihMetodeLain}>
                            Pilih Pengiriman
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container-payment-detail">
            <div className="border-subtotal">
              <div className="container-diskon">
                <TbDiscount2 className="icon-container-diskon" />
                <h1>Makin Hemat Pakai Promo</h1>
                <MdKeyboardArrowRight className="icon-container-arrow" />
              </div>
              <div className="container-total-produk">
                <h2>Ringkasan Belanja</h2>
                <div className="total-pro">
                  <div className="total-pro-left">
                    <p>Total Harga ({selectedItems.length} Barang)</p>
                    {discountApplied && <p>Total Diskon</p>}
                    {selectedCourier && <p>Biaya Pengiriman</p>}
                  </div>
                  <div className="total-pro-right">
                    <p>Rp {formatPrice(calculateTotalOriginalPrice())}</p>
                    {discountApplied && (
                      <p>-{formatPrice(calculateTotalDiscount())}</p>
                    )}
                    {selectedCourier && <p>Rp {formatPrice(shippingCost)}</p>}
                  </div>
                </div>
              </div>
              <div className="line-subtotal-pro"></div>
              <div className="total-harga-cart">
                <h2>Total Harga</h2>
                <h2>Rp {formatPrice(calculateGrandTotal())}</h2>
              </div>
              <div className="btn-bayar">
                <div className="button-wrapper">
                  <button
                    className="pay-button"
                    disabled={!isProductSelected() || isLoading}
                    onClick={handleBeliClick}
                    style={{
                      backgroundColor: isProductSelected() ? "#EF233C" : "gray",
                      cursor: isProductSelected() ? "pointer" : "not-allowed",
                    }}
                  >
                    {isLoading ? (
                      <div className="loading-spinner-container">
                        <div className="loading-spinner"></div>
                      </div>
                    ) : (
                      "Pilih Pembayaran"
                    )}
                  </button>
                </div>
                {showConfirmation && (
                  <div className="modal-container">
                    <div className="modal-content">
                      <h2>Apakah Pesananmu sudah benar?</h2>
                      <div className="modal-buttons">
                        <button id="pay-button" onClick={handleConfirm}>
                          Lanjut Bayar
                        </button>
                        <button onClick={handleCancel}>Cek Lagi</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showShippingPopup && (
        <div className="shipping-popup-container">
          <div className="shipping-popup">
            <div className="top-shipping-popup">
              <h2>Metode pengiriman</h2>
              <MdOutlineClose onClick={handleCloseShippingPopup} />
            </div>
            {couriers.length > 0 ? (
              couriers.map((courier, index) => (
                <div
                  className="list-shipping-popup"
                  key={index}
                  onClick={() => handleSelectCourier(courier)}
                >
                  <h1>
                    <TbTruckDelivery style={{ fontSize: "20px" }} />{" "}
                    {courier.courier}
                  </h1>
                  <h1 style={{ color: "#f37021" }}>
                    Rp {formatPrice(courier.cost)}
                  </h1>
                  <h1>Estimasi pesanan sampai {courier.etd}</h1>
                </div>
              ))
            ) : (
              <div style={{ marginTop: "15px" }}>
                <Skeleton
                  height={80}
                  count={3}
                  style={{ marginBottom: "7px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Anda berhasil logout!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Terjadi kesalahan saat mengirim pesanan, Coba lagi nanti!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Detailpesanan;
