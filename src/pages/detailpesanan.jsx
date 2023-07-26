import React, { useEffect, useRef, useState } from "react";
import "../style/detailpesanan.css";
import NavbarCheckout from "../component/navbar/navbarCheckout";
import { MdKeyboardArrowRight, MdLocationOn } from "react-icons/md";
import { TbDiscount2, TbTruckDelivery } from "react-icons/tb";
import { RiErrorWarningFill } from "react-icons/ri";
import { formatPrice } from "../utils/helpers";
import { useLocation } from "react-router-dom";
import axios from "axios";
import token from "../utils/token";
import apiurl from "../utils/apiurl";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

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
      setSelectedItems(JSON.parse(storedSelectedItems));
    } else {
      setSelectedItems([]);
    }
    console.log(localStorage.getItem("selectedProducts"));
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
    console.log(snapToken);
    scriptFunctionSnap.type = "text/javascript";
    scriptFunctionSnap.innerHTML = `
              var payButton = document.getElementById('pay-button');
              payButton.addEventListener('click', function () {
                snap.pay('${snapTokenRef.current}');
              });    
          `;
    document.body.appendChild(scriptFunctionSnap);

    return () => {
      document.body.removeChild(scriptFunctionSnap);
    };
  }, [snapToken]);

  function calculateTotalPrice() {
    let totalPrice = 0;
    selectedItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
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

      console.log(selectedProducts);

      formData.append("cart_id", 9);

      axios
        .post(apiurl() + "checkout", formData, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        })
        .then((response) => {
          console.log("Respon dari server:", response.data);
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
                <div className="top-alamat">
                  <div className="top-left-alamat">
                    <MdLocationOn color="#969696" />
                    <h4>Rumah</h4>
                    <div className="role-alamat">
                      <h3>Utama</h3>
                    </div>
                  </div>
                  <div className="top-right-alamat">
                    <h3>Ubah</h3>
                  </div>
                </div>
                <div className="content-address">
                  <div className="name-user">
                    <h3>Andi</h3>
                    <div className="line-address"></div>
                    <p>082128066795</p>
                  </div>
                  <div className="full-address">
                    <p>
                      7VXR+CCF, Kajar Selatan, Kajar, Kec. Dawe, Kabupaten
                      Kudus, Jawa Tengah 59353, Indonesia Kajar - Dawe - Kab.
                      Kudus - Jawa Tengah - 59353
                    </p>
                  </div>
                  <h2>Catatan Alamat</h2>
                </div>
              </div>
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
                      <h3>Kuantitas : {item.product.quantity}</h3>
                    </div>
                  </div>
                  <div className="line-shipping"></div>
                  <div className="shipping">
                    <div className="top-shipping">
                      <div className="icon-top-shipping">
                        <TbTruckDelivery color="EF233C" />
                        <p>Regular</p>
                      </div>
                      <div className="btn-pilih-shipping">
                        <h2>Pilih Metode Lain</h2>
                      </div>
                    </div>
                    <div className="info-shipping">
                      <h2>Rp25.000</h2>
                      <h3>Estimasi pesanan sampai 2 - 4 hari.</h3>
                      <div className="warning-icon">
                        <RiErrorWarningFill />
                        <h3>Biaya sudah termasuk asuransi pengiriman.</h3>
                      </div>
                    </div>
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
                  </div>
                  <div className="total-pro-right">
                    <p>Rp {formatPrice(calculateTotalPrice())}</p>
                    {discountApplied && (
                      <p>-{formatPrice(calculateTotalDiscount())}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="line-subtotal-pro"></div>
              <div className="total-harga-cart">
                <h2>Total Harga</h2>
                <h2>Rp {formatPrice(calculateTotalPrice())}</h2>
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
