import React from "react";
import "../style/detailtoko.css";
import Navbar from "../component/navbar/navbar";
import imgToko from "../assets/image/imgToko.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChatLeftText, BsPeople, BsStar } from "react-icons/bs";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { IoPersonAddOutline } from "react-icons/io5";
import Product from "../component/product/product";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../component/loader/Loading";

function Detailtoko() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, []);

  function getProduct() {
    axios
      .get(apiurl() + "products")
      .then((response) => {
        setProduct(response.data.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Navbar />
      <div className="container-detail-toko">
        <div className="container-info-detail-toko">
          <div className="container-img-detail-toko">
            <img src={imgToko} alt="Foto Toko" />
          </div>
          <div className="container-btn-detail-toko">
            <button className="btn-follow-toko">
              <AiOutlinePlus />
              IKUTI
            </button>
            <button className="btn-chat-toko">
              <BsChatLeftText />
              Chat Penjual
            </button>
          </div>
          <div className="container-information-detail-toko">
            <div className="total-produk-detail-toko">
              <HiOutlineArchiveBox />
              <p>
                Produk: <span>50</span>
              </p>
            </div>
            <div className="total-follow-detail-toko">
              <IoPersonAddOutline />
              <p>
                Mengikuti: <span>100</span>
              </p>
            </div>
            <div className="total-followers-detail-toko">
              <BsPeople />
              <p>
                Pengikut: <span>50</span>
              </p>
            </div>
            <div className="total-review-detail-toko">
              <BsStar />
              <p>
                Penilaian: <span>4.5</span>
              </p>
            </div>
          </div>
          <div className="container-pesanan-jam-infolokasi">
            <div className="container-proses-pesanan">
              <h3>1 jam</h3>
              <h4>Pesanan diProses</h4>
            </div>
            <div className="container-jam">
              <h3>Buka 24jam</h3>
              <h4>Jam Operasional</h4>
            </div>
            <div className="container-info-lokasi">
              <h3>Info toko & lokasi</h3>
              <h4>Besito, Kudus</h4>
            </div>
          </div>
        </div>
        <div className="container-deskripsi-detail-toko">
          <div className="title-deskripsi-detail-toko">
            <h3>Deskripsi Toko</h3>
          </div>
          <p>
            Selamat datang di Microsport Kami Menyediakan berbagai macam produk
            berkualitas dengan harga yang terjangkau. Kami menawarkan produk -
            produk terbaru dan terbaik di kategori fashion, Kami selalu
            berkomitmen untuk memberikan pengalaman berbelanja yang menyenangkan
            dan memuaskan kepada pelanggan kami. Dalam hal demikian kami selalu
            memperhatikan kualitas dan ketersediaan produk, serta memberikan
            layanan yang ramah dan responsif kepada pelanggan
          </p>
        </div>
        <div className="container-produk-terbaru-detail-toko">
          <div className="title-produk-terbaru-detail-toko">
            <h3>Produk Terbaru Dari Kami</h3>
          </div>
          <div className="container-produk-terbaru-toko">
            {isLoading ? (
              <div
                className="pengaturan-result-search"
                style={{ marginRight: "80px" }}
              >
                <Loading cards={7} />
              </div>
            ) : (
              <div className="produk-terbaru-toko">
                {product.map((item) => (
                  <Product
                    name={item.name}
                    url={item.picturePath}
                    location={item.product_origin}
                    price={item.price}
                    rating={item.rate}
                    ulasan={item.review}
                    stok={item.stok}
                    id={item.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="container-produk-terbaru-detail-toko">
          <div className="title-produk-terbaru-detail-toko">
            <h3>Semua Produk</h3>
          </div>
          <div className="container-produk-terbaru-toko">
            {isLoading ? (
              <div
                className="pengaturan-result-search"
                style={{ marginRight: "80px" }}
              >
                <Loading cards={7} />
              </div>
            ) : (
              <div className="produk-terbaru-toko">
                {product.map((item) => (
                  <Product
                    name={item.name}
                    url={item.picturePath}
                    location={item.product_origin}
                    price={item.price}
                    rating={item.rate}
                    ulasan={item.review}
                    stok={item.stok}
                    id={item.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailtoko;
