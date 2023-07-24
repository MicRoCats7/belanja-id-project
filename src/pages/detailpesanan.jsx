import React, { useEffect, useState } from "react";
import "../style/detailpesanan.css";
import NavbarCheckout from "../component/navbar/navbarCheckout";
import { MdKeyboardArrowRight, MdLocationOn } from "react-icons/md";
import { TbDiscount2, TbTruckDelivery } from "react-icons/tb";
import { RiErrorWarningFill } from "react-icons/ri";
import { formatPrice } from "../utils/helpers";
import { Navigate, useLocation } from "react-router-dom";

function Detailpesanan() {
  const [product, setProduct] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedIds = queryParams.get("selectedIds");

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

  function calculateTotalPrice() {
    let totalPrice = 0;

    const storedProducts = localStorage.getItem("products");
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    selectedItems.forEach((itemId) => {
      const selectedItem = products.find((item) => item.id === itemId);
      if (selectedItem) {
        totalPrice += selectedItem.product.price * selectedItem.quantity;
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

  const handleBeliClick = () => {
    Navigate("/detailpesanan");
  };

  function isProductSelected() {
    return selectedItems.length > 0;
  }
  console.log(selectedItems);

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
                <button
                  disabled={!isProductSelected()}
                  onClick={handleBeliClick}
                  style={{
                    backgroundColor: isProductSelected() ? "#EF233C" : "gray",
                    cursor: isProductSelected() ? "pointer" : "not-allowed",
                  }}
                >
                  Pilih Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailpesanan;
