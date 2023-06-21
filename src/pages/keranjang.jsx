import React from "react";
import "../style/keranjang.css";
import Navbar from "../component/navbar/navbar";
import { styled } from "@mui/material/styles";
import { Checkbox, Snackbar } from "@mui/material";
import Footer from "../component/footer/footer";
import ImgCartToko from "../assets/icon/icon makanan minuman 1.svg";
import ImgProduk from "../assets/image/shopping-bag-chat.svg";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { TbDiscount2 } from "react-icons/tb";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useState } from "react";
import { useEffect } from "react";
import token from "../utils/token";
import { formatPrice } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import imgbelanja from "../assets/image/shopping-bag-chat.svg";
import LoadingKeranjang from "../component/loader/LoadingKeranjanjg";

function Keranjang() {
  const navigate = useNavigate();
  const [product, setCart] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false); // Ganti nilai awal sesuai kebutuhan
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCart();
    window.scrollTo(0, 0);
  }, []);

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 23,
    height: 23,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    ".Mui-focusVisible &": {
      outline: "2px auto #000",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      outline: "2px auto #EF233C",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#EF233C",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 23,
      height: 23,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#EF233C",
    },
  });

  function BpCheckbox(props) {
    const handleCheckboxChange = (event) => {
      setSelectAll(event.target.checked);
    };

    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checked={props.checked || selectAll} // Tambahkan selectAll ke prop checked
        onChange={handleCheckboxChange} // Tambahkan event handler untuk perubahan checkbox
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  function handleSelectAllCheckboxChange() {
    if (selectAll) {
      setSelectedItems([]); // Jika selectAll true, kosongkan selectedItems
    } else {
      const allProductIds = product.map((item) => item.id); // Ambil ID semua produk
      setSelectedItems(allProductIds); // Tambahkan ID semua produk ke selectedItems
    }
    setSelectAll(!selectAll); // Ubah status selectAll
  }

  function handleItemCheckboxChange(itemId) {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId)); // Hapus ID produk dari selectedItems jika sudah terpilih
    } else {
      setSelectedItems([...selectedItems, itemId]); // Tambahkan ID produk ke selectedItems jika belum terpilih
    }
    setSelectAll(false); // Set selectAll menjadi false ketika checkbox produk diklik
  }

  function getCart() {
    axios
      .get(apiurl() + "cart/items", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.data && response.data.data.cartItems.length > 0) {
          const cartItems = response.data.data.cartItems;
          const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
          const updatedProduct = cartItems.map((item) => {
            const storedItem = storedCartItems.find(
              (storedItem) => storedItem.id === item.id
            );
            if (storedItem) {
              return {
                ...item,
                quantity: storedItem.quantity,
              };
            } else {
              return item;
            }
          });
          setCart(updatedProduct);
          saveToLocalStorage(updatedProduct);
          console.log(updatedProduct);
        } else {
          storedCart();
        }
      })
      .catch((error) => console.error(error));
  }

  function storedCart() {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCart(JSON.parse(storedCartItems));
      console.log("Data berhasil dimuat dari localStorage");
    }
  }

  function saveToLocalStorage(updatedProduct) {
    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
      console.log("Data berhasil disimpan di localStorage");
    } catch (error) {
      console.error("Gagal menyimpan data di localStorage:", error);
    }
  }

  function handleQuantityChange(e, index) {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue);

    if (inputValue.trim() === "" || isNaN(numericValue)) {
      const updatedProduct = [...product];
      updatedProduct[index] = {
        ...updatedProduct[index],
        quantity: 1,
      };
      setCart(updatedProduct);
      saveToLocalStorage(updatedProduct);
    } else {
      const updatedProduct = [...product];
      updatedProduct[index] = {
        ...updatedProduct[index],
        quantity: numericValue,
      };
      setCart(updatedProduct);
      saveToLocalStorage(updatedProduct);
    }
  }

  function incrementQuantity(index) {
    const updatedProduct = [...product];
    const currentQuantity = parseInt(updatedProduct[index].quantity);
    updatedProduct[index].quantity = currentQuantity + 1;
    setCart(updatedProduct);
    saveToLocalStorage(updatedProduct);
  }

  function decrementQuantity(index) {
    const updatedProduct = [...product];
    updatedProduct[index].quantity = Math.max(
      updatedProduct[index].quantity - 1,
      1
    );
    setCart(updatedProduct);
    saveToLocalStorage(updatedProduct);
  }

  function calculateTotalPrice() {
    let totalPrice = 0;
    product.forEach((item) => {
      if (selectedItems.includes(item.id)) {
        totalPrice += item.product.price * item.quantity;
      }
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

  function isProductSelected() {
    return selectedItems.length > 0;
  }

  const handleBeliClick = () => {
    navigate("/detailpesanan");
  };

  function deleteItem(itemId) {
    deleteItemFromAPI(itemId);
    removeFromCart(itemId);
  }

  // Hapus item dari keranjang
  function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      handleErrorAlertOpen();
      console.log("Item berhasil dihapus dari keranjang");
    } else {
      handleErrorAlertOpen();
      console.log("Item tidak ditemukan di keranjang");
    }
  }

  // Hapus item dari API
  function deleteItemFromAPI(id) {
    axios
      .delete(apiurl() + "cart/delete/" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        handleSuccessAlertOpen();
        console.log("Item berhasil dihapus dari API");
      })
      .catch((error) => {
        handleErrorAlertOpen();
        console.log("Gagal menghapus item dari API:", error);
      });
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  function renderEmptyCart() {
    return (
      <div className="empty-cart">
        <img src={imgbelanja} alt="" loading="lazy" />
        <h2>Keranjang Anda Kosong</h2>
        <p>Anda belum menambahkan produk apapun ke dalam keranjang.</p>
        <button onClick={() => navigate("/")} className="btn-primary">
          Lanjut Belanja
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <Navbar />
      <div className="container-keranjang">
        <div className="container-item-keranjang">
          {product.length > 0 && (
            <>
              <h1>Keranjang</h1>
              <div className="checkbox-keranjang">
                <BpCheckbox
                  checked={selectAll}
                  onChange={handleSelectAllCheckboxChange}
                />
                <label htmlFor="">Pilih Semua</label>
              </div>
              <div className="line-keranjang"></div>
            </>
          )}
          {product.length === 0 ? (
            isLoading ? (
              <LoadingKeranjang />
            ) : (
              renderEmptyCart()
            )
          ) : (
            <>
              <div className="item-cart">
                {product.map((item, index) => (
                  <div key={item.id} className="keranjang-item">
                    <div className="checkbox-keranjang">
                      <BpCheckbox
                        checked={selectedItems.includes(item.id)} // Gunakan nilai selectedItems untuk status checked
                        onChange={() => handleItemCheckboxChange(item.id)} // Tambahkan event handler untuk perubahan checkbox
                      />
                      <div className="toko-keranjang">
                        <div className="img-checkbox">
                          <img src={ImgCartToko} alt="" />
                        </div>
                        <div className="nama-toko-keranjang">
                          <h3>Nama Toko</h3>
                          <p>Sumbawa Besar</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-pro-detail">
                      <div className="item-pro">
                        <BpCheckbox
                          checked={selectedItems.includes(item.id)} // Gunakan nilai selectedItems untuk status checked
                          onChange={() => handleItemCheckboxChange(item.id)} // Tambahkan event handler untuk perubahan checkbox
                        />
                        <div className="img-item-pro">
                          <img
                            src={item.product.picturePath}
                            alt="gambar produk"
                          />
                        </div>
                        <div className="nama-item-pro">
                          <h3 className="name-pro-cart">{item.product.name}</h3>
                          <h4 className="harga-pro-cart">
                            Rp {formatPrice(item.product.price)}
                          </h4>
                          {item.ukuran && <p>{item.ukuran}</p>}
                          {item.warna && <p>{item.warna}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="item-pro-bottom">
                      <div className="pro-bottom-wish">
                        <span>Pindahkan ke Wishlist</span>
                        <div className="line-bottom-wish"></div>
                        <BsTrash3
                          className="icon-trash-cart"
                          onClick={() => deleteItem(item.id)}
                        />
                        <div className="kuantitas-keranjang">
                          <div className="kuantitas-item">
                            <button onClick={() => decrementQuantity(index)}>
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(e, index)}
                            />
                            <button onClick={() => incrementQuantity(index)}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ---------- LINE PEMISAH ---------*/}
                    <div className="line-keranjang"></div>
                    {/* ---------- LINE PEMISAH ---------*/}
                  </div>
                ))}
              </div>
              <div className="wishlist-kamu">
                <h1>Wujudkan Whislist Anda!</h1>
                <div className="wishlist-pro-kamu">
                  <div className="pro-wishlist-cart">
                    <div className="item-wishlist-cart">
                      <div className="img-wishlist-cart">
                        <img src={ImgProduk} alt="" />
                      </div>
                      <div className="nama-wishlist-cart">
                        <h3>Jual Tablet Xiaomi Mi Pad 4 4/64Gb</h3>
                        <span>Rp 6.000.000</span>
                        <div className="toko-wishlist-cart">
                          <div className="img-toko-wishlist-cart">
                            <img src={ImgCartToko} alt="" />
                          </div>
                          <div className="nama-toko-wishlist-cart">
                            <h4>Nama Toko</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wishlist-bottom-action">
                      <BsTrash3 className="icon-bottom-action" />
                      <div className="btn-keranjang-action">
                        <AiOutlinePlus className="icon-btn-keranjang-icon" />
                        <span>Keranjang</span>
                      </div>
                    </div>
                  </div>
                  <div className="pro-wishlist-cart">
                    <div className="item-wishlist-cart">
                      <div className="img-wishlist-cart">
                        <img src={ImgProduk} alt="" />
                      </div>
                      <div className="nama-wishlist-cart">
                        <h3>Jual Tablet Xiaomi Mi Pad 4 4/64Gb</h3>
                        <span>Rp 6.000.000</span>
                        <div className="toko-wishlist-cart">
                          <div className="img-toko-wishlist-cart">
                            <img src={ImgCartToko} alt="" />
                          </div>
                          <div className="nama-toko-wishlist-cart">
                            <h4>Nama Toko</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wishlist-bottom-action">
                      <BsTrash3 className="icon-bottom-action" />
                      <div className="btn-keranjang-action">
                        <AiOutlinePlus className="icon-btn-keranjang-icon" />
                        <span>Keranjang</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {product.length > 0 && (
          <div className="container-subtotal">
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
                <button
                  disabled={!isProductSelected()} // Menonaktifkan tombol jika tidak ada produk yang dipilih
                  onClick={handleBeliClick} // Memanggil fungsi handleBeliClick saat tombol diklik
                  style={{
                    backgroundColor: isProductSelected() ? "#EF233C" : "gray",
                    cursor: isProductSelected() ? "pointer" : "not-allowed",
                  }} // Mengatur warna dan kursor tombol
                >
                  Beli({selectedItems.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={5000}
        variant="filled"
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Produk Berhasil dihapus dari Keranjang
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        variant="filled"
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Gagal Menghapus Produk Dari Keranjang
        </MuiAlert>
      </Snackbar>
      <Footer />
    </div>
  );
}

export default Keranjang;
