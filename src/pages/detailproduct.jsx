import React from "react";
import Navbar from "../component/navbar/navbar";
import "../style/detailproduct.css";
import iconHome from "../assets/icon/icon home.svg";
import { Link, useParams } from "react-router-dom";
import iconSold from "../assets/icon/icon sold.svg";
import iconLove from "../assets/icon/icon love.svg";
import iconRatings from "../assets/icon/icon star.svg";
import iconToko from "../assets/icon/icon toko.svg";
import imgProduct from "../assets/image/imgProduk.svg";
import cart from "../assets/icon/cart.svg";
import { useState, useEffect } from "react";
import exampProfile from "../assets/image/profile.png";
import { Rating } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Footer from "../component/footer/footer";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { formatPrice } from "../utils/helpers";

function DetailProduct() {
  const [value, setValue] = React.useState(5);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();

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

  function getDetail(id) {
    axios
      .get(apiurl() + "products")
      .then((response) => {
        let filteredData = response.data.data.data.filter(
          (item) => item.id == id
        );
        if (filteredData.length > 0) {
          setDetail(filteredData);
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getDetail(id);
    window.scrollTo(0, 0);
  }, [id]);

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
                <h4>{detail.length > 0 ? detail[0].slug : ""} /</h4>
              </Link>
              <span>{detail.length > 0 ? detail[0].name : ""}</span>
            </ul>
          </div>
        </div>
        <div className="detail-product">
          <div className="detail-product-img">
            <div className="main-img">
              <img
                src={detail.length > 0 ? detail[0].picturePath : ""}
                alt=""
              />
            </div>
            <h3>Foto Produk Lainnya</h3>
            <div className="more-img">
              <img src={imgProduct} alt="" />
              <img src={imgProduct} alt="" />
              <img src={imgProduct} alt="" />
            </div>
          </div>
          <div className="detail-product-desc">
            <h1>{detail.length > 0 ? detail[0].name : ""}</h1>
            <div className="info-desc">
              <div className="sold">
                <img src={iconSold} alt="" />
                <h4>
                  Terjual : {detail.length > 0 ? detail[0].sold_quantity : ""}
                </h4>
              </div>
              <div className="line-detail"></div>
              <div className="ratings">
                <img src={iconRatings} alt="" />
                <h4>
                  {detail.length > 0 ? detail[0].rate : ""} (
                  {detail.length > 0 ? detail[0].review : ""} Ulasan)
                </h4>
              </div>
              <div className="like">
                <img src={iconLove} alt="" />
                <h4>Suka ({detail.length > 0 ? detail[0].like : ""})</h4>
              </div>
              <div className="line-detail"></div>
              <div className="toko-detail">
                <img src={iconToko} alt="" />
                <Link to={"/toko"}>
                  <h4>Toko : Penuh Makna</h4>
                </Link>
              </div>
            </div>
            <div className="harga">
              <h2>
                Rp {formatPrice(detail.length > 0 ? detail[0].price : "")}
              </h2>
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
            <div className="kuantitas-detail">
              <h3>Kuantitas</h3>
              <div className="kuantitas-item">
                <button>-</button>
                <input type="text" value="1" />
                <button>+</button>
              </div>
              <p>Tersisa {detail.length > 0 ? detail[0].quantity : ""} buah </p>
            </div>
            <div className="btn-cartBuy">
              <button className="btn-cart">
                <img src={cart} alt="" />
                Tambahkan ke Keranjang
              </button>
              <Link to={"/detailpesanan"}>
                <button className="btn-buy">Beli Sekarang</button>
              </Link>
            </div>
            {/* <div className="spesifikasi">
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
                  <h4>{detail.length > 0 ? detail[0].product_origin : ""}</h4>
                  <h4>{detail.length > 0 ? detail[0].product_material : ""}</h4>
                  <h4>Polos</h4>
                  <h4>{detail.length > 0 ? detail[0].weight : ""}</h4>
                  <h4>Penuh Makna</h4>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="deskripsi-produk">
          <h3>Deskripsi Produk</h3>
          <p>{detail.length > 0 ? detail[0].description : ""}</p>
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
                    {/* <ThumbUpOffAltIcon />
                    <p>1</p> */}
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
                    {/* <ThumbUpOffAltIcon />
                    <p>1</p> */}
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
                    {/* <ThumbUpOffAltIcon /> */}
                    {/* <p>1</p> */}
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
