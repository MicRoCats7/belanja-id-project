import React from "react";
import Navbar from "../component/navbar/navbar";
import "../style/detailproduct.css";
import iconHome from "../assets/icon/icon home.svg";
import { Link } from "react-router-dom";
import iconSold from "../assets/icon/icon sold.svg";
import iconLove from "../assets/icon/icon love.svg";
import iconRatings from "../assets/icon/icon star.svg";
import iconToko from "../assets/icon/icon toko.svg";
import imgProduct from "../assets/image/imgProduk.svg";
import cart from "../assets/icon/cart.svg";
import { useState } from "react";
import exampProfile from "../assets/image/profile.png";
import { Rating } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Footer from "../component/footer/footer";

function DetailProduct() {
  const [value, setValue] = React.useState(5);

  const [appState, changeState] = useState({
    activeObject: null,
    objects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  });

  function toggleActive(index) {
    changeState({ ...appState, activeObject: appState.objects[index] });
  }

  function toggleActiveStyles(index) {
    if (appState.objects[index] === appState.activeObject) {
      return "pilih-product-item active";
    } else {
      return "pilih-product-item inactive";
    }
  }

  return (
    <div className="main-detail">
      <Navbar />
      <div className="container-detail">
        <div className="navigation">
          <div className="navigation-item">
            <ul>
              <img src={iconHome} alt="" />
              <Link to={"/"}>
                <h4>Home /</h4>
              </Link>
              <Link to={"/pakaian"}>
                <h4>Pakaian /</h4>
              </Link>
              <span>Baju Polo, Pria lengan pendek polos original Ukuran L</span>
            </ul>
          </div>
        </div>
        <div className="detail-product">
          <div className="detail-product-img">
            <div className="main-img">
              <img src={imgProduct} alt="" />
            </div>
            <h3>Foto Produk Lainnya</h3>
            <div className="more-img">
              <img src={imgProduct} alt="" />
              <img src={imgProduct} alt="" />
              <img src={imgProduct} alt="" />
            </div>
          </div>
          <div className="detail-product-desc">
            <h1>Baju Polo, Pria lengan pendek polos original Ukuran L</h1>
            <div className="info-desc">
              <div className="sold">
                <img src={iconSold} alt="" />
                <h4>Terjual : 3.457</h4>
              </div>
              <div className="line-detail"></div>
              <div className="ratings">
                <img src={iconRatings} alt="" />
                <h4>4.6 (3.450 Ulasan)</h4>
              </div>
              <div className="like">
                <img src={iconLove} alt="" />
                <h4>Suka (3.250)</h4>
              </div>
              <div className="line-detail"></div>
              <div className="toko">
                <img src={iconToko} alt="" />
                <Link to={"/toko"}>
                  <h4>Toko : Penuh Makna</h4>
                </Link>
              </div>
            </div>
            <div className="harga">
              <h2>Rp 35.000</h2>
              <h3>Dapatkan barang pesananmu atau uang kembali.</h3>
            </div>
            <div className="pilih-product">
              <h3>Pilih Produk</h3>
              <div className="pilih-product-item">
                {appState.objects.map((elements, index) => (
                  <button
                    key={index}
                    className={toggleActiveStyles(index)}
                    onClick={() => {
                      toggleActive(index);
                    }}
                  >
                    Baju Polo, Biru, L
                  </button>
                ))}
              </div>
            </div>
            <div className="kuantitas">
              <h3>Kuantitas</h3>
              <div className="kuantitas-item">
                <button>-</button>
                <input type="text" value="1" />
                <button>+</button>
              </div>
              <p>Tersisa 7 buah </p>
            </div>
            <div className="btn-cartBuy">
              <button className="btn-cart">
                <img src={cart} alt="" />
                Tambahkan ke Keranjang
              </button>
              <button className="btn-buy">Beli Sekarang</button>
            </div>
            <div className="spesifikasi">
              <h3>Spesifikasi Produk</h3>
              <div className="spesifikasi-item">
                <div className="spesifikasi-item1">
                  <h4>Produk Asal</h4>
                  <h4>Bahan Produk</h4>
                  <h4>Motif</h4>
                  <h4>Berat</h4>
                  <h4>Dikirim dari</h4>
                </div>
                <div className="titik">
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                </div>
                <div className="spesifikasi-item2">
                  <h4>Kudus</h4>
                  <h4>Cotton Combed 30s</h4>
                  <h4>Polos</h4>
                  <h4>200 kg</h4>
                  <h4>Penuh Makna</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="deskripsi-produk">
          <h3>Deskripsi Produk</h3>
          <p>
            kaosproduk lokalbahan cotton combed 30sbahan lembut tidak
            panasjahitan double stick dan rapihukuran L Lingkar dada 105
            cmpanjang kaos 70 cmbarang sesuai dengan foto tanpa editbarang
            selalu ready selama iklan masih tersedia#baju #kaos
            #kaosdistro#bajudistro #bajumurah #grosir #kaospria#bajupria
            #kaospolos # kaostrip
          </p>
        </div>
        <div className="penilaian-produk">
          <h3>Penilaian Produk</h3>
          <div className="penilaian-item">
            <div className="penilaian-item1">
              <div className="profile-nilai">
                <img src={exampProfile} alt="profile" />
              </div>
              <div className="desc-penilaian">
                <h4>Faisal Mahadi</h4>
                <div className="rating">
                  <Rating name="read-only" value={value} readOnly />
                  <div className="like">
                    <ThumbUpOffAltIcon />
                    <p>1</p>
                  </div>
                </div>
                <p>
                  Harga Murah, Ukr. L Real picture, Benar Cartoon 24S, Jahitan
                  Rapi, Bahannya Halus, lembut, dan dingin Serta enak Saat di
                  pakai untuk kegiatan sehari-hari maupun santai di rumah.
                  Recommended Seller deh !!! Buruan Order.
                </p>
                <div className="tgl-penilaian">
                  <h4>2022-05-29 16:51</h4>
                  <div className="line-penilaian"></div>
                  <div className="line-penilaian"></div>
                  <h4>Baju Polo, Biru, L</h4>
                </div>
              </div>
            </div>
            <div className="penilaian-item1">
              <div className="profile-nilai">
                <img src={exampProfile} alt="profile" />
              </div>
              <div className="desc-penilaian">
                <h4>Faisal Mahadi</h4>
                <div className="rating">
                  <Rating name="read-only" value={value} readOnly />
                  <div className="like">
                    <ThumbUpOffAltIcon />
                    <p>1</p>
                  </div>
                </div>
                <p>
                  Harga Murah, Ukr. L Real picture, Benar Cartoon 24S, Jahitan
                  Rapi, Bahannya Halus, lembut, dan dingin Serta enak Saat di
                  pakai untuk kegiatan sehari-hari maupun santai di rumah.
                  Recommended Seller deh !!! Buruan Order.
                </p>
                <div className="tgl-penilaian">
                  <h4>2022-05-29 16:51</h4>
                  <div className="line-penilaian"></div>
                  <div className="line-penilaian"></div>
                  <h4>Baju Polo, Biru, L</h4>
                </div>
              </div>
            </div>
            <div className="penilaian-item1">
              <div className="profile-nilai">
                <img src={exampProfile} alt="profile" />
              </div>
              <div className="desc-penilaian">
                <h4>Faisal Mahadi</h4>
                <div className="rating">
                  <Rating name="read-only" value={value} readOnly />
                  <div className="like">
                    <ThumbUpOffAltIcon />
                    <p>1</p>
                  </div>
                </div>
                <p>
                  Harga Murah, Ukr. L Real picture, Benar Cartoon 24S, Jahitan
                  Rapi, Bahannya Halus, lembut, dan dingin Serta enak Saat di
                  pakai untuk kegiatan sehari-hari maupun santai di rumah.
                  Recommended Seller deh !!! Buruan Order.
                </p>
                <div className="tgl-penilaian">
                  <h4>2022-05-29 16:51</h4>
                  <div className="line-penilaian"></div>
                  <div className="line-penilaian"></div>
                  <h4>Baju Polo, Biru, L</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailProduct;
