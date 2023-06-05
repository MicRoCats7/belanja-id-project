import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar/navbar";
import bgHome from "../assets/image/img-homepage.svg";
import iconKerajinanTangan from "../assets/icon/paper-crafts 1.svg";
import iconProdukPertanian from "../assets/icon/icon pertanian 1.svg";
import iconMakananMinuman from "../assets/icon/icon makanan minuman 1.svg";
import iconHerbal from "../assets/icon/herbs 1.svg";
import iconPakaian from "../assets/icon/clothes-rack 1.svg";
import iconElektronik from "../assets/icon/gadgets 1.svg";
import iconFurniture from "../assets/icon/furniture 1.svg";
import iconRumahtangga from "../assets/icon/bucket 1.svg";
import iconKaryaSeni from "../assets/icon/auction 1.svg";
import iconMainanaHobi from "../assets/icon/box 1.svg";
import iconBarangAntik from "../assets/icon/vase 1.svg";
import imgProdukPilihan from "../assets/image/img-pilihan.svg";
import imgProdukOlahan from "../assets/image/imgProdukOlahan.svg";
import imgProdukFashion from "../assets/image/fashion.svg";
import imgProdukKerajinan from "../assets/image/kerajinan tangan.svg";
import "../style/home.css";
import Product from "../component/product/product";
import SimpleAccordion from "../component/accordion/accordion";
import Footer from "../component/footer/footer";
import axios from "axios";
import apiurl from "../utils/apiurl";
import "swiper/swiper-bundle.min.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Home() {
  const [product, setProduct] = useState([]);
  const [isPrevArrowVisible, setIsPrevArrowVisible] = useState(false);
  const [isNextArrowVisible, setIsNextArrowVisible] = useState(true);

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, []);

  function getProduct() {
    axios
      .get(apiurl() + "products")
      .then((response) => {
        setProduct(response.data.data.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <div className="heroPage">
          <div className="text-ajakan">
            <h1>
              Temukan produk-produk berkualitas dari <span>UMKM</span> lokal di
              Belanja.id!
            </h1>
            <button className="btnBelanja">Belanja Sekarang</button>
          </div>
          <div className="img-homepage">
            <img src={bgHome} alt="icon keranjang" loading="lazy" />
          </div>
        </div>
        <div className="Kategori">
          <div className="title-kategori">
            <h1>Kategori Produk</h1>
          </div>
          <div className="container-kategori">
            <div className="kategori-produk">
              <img
                src={iconKerajinanTangan}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Kerajinan Tangan</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconProdukPertanian}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Produk Pertanian</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconMakananMinuman}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Makanan/Minuman</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconHerbal}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Produk Herbal</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconPakaian}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Pakaian</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconElektronik}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Elektronik</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconFurniture}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Furniture</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconRumahtangga}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Rumah Tangga</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconKaryaSeni}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Karya Seni</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconMainanaHobi}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Mainan dan Hobi</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconBarangAntik}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Barang Antik</h3>
            </div>
          </div>
        </div>
        <div className="produk-pilihan">
          <div className="title-produkPilihan">
            <h1>Produk Pilihan Belanja.id Untuk Kamu</h1>
          </div>
          <div className="slider wrapper slick-slider">
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={6}
                navigation={{
                  prevEl: ".prev-arrow-1",
                  nextEl: ".next-arrow-1",
                }}
                onSlideChange={(swiper) => {
                  // Set state variables for this specific slider
                  setIsPrevArrowVisible(!swiper.isBeginning);
                  setIsNextArrowVisible(!swiper.isEnd);
                }}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div className="img-produk-pilihan">
                    <img
                      src={imgProdukPilihan}
                      alt="Produk pilihan"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
                {product?.map((item, index) => (
                  <SwiperSlide>
                    <Product
                      key={index}
                      name={item.name}
                      url={item.picturePath}
                      location={item.product_origin}
                      price={item.price}
                      rating={item.rate}
                      ulasan={item.review}
                      stok={item.stok}
                      id={item.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="prev-arrow prev-arrow-1"
              style={{ display: isPrevArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowBack />
            </div>
            <div
              className="next-arrow next-arrow-1"
              style={{ display: isNextArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowForward />
            </div>
          </div>
          <div className="line-produk"></div>
          <div className="title-produkPilihan">
            <h1>Produk Olahan Makanan Pilihan Untuk Kamu</h1>
          </div>
          <div className="slider wrapper slick-slider">
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={6}
                navigation={{
                  prevEl: ".prev-arrow-2",
                  nextEl: ".next-arrow-2",
                }}
                onSlideChange={(swiper) => {
                  setIsPrevArrowVisible(!swiper.isBeginning);
                  setIsNextArrowVisible(!swiper.isEnd);
                }}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div className="img-produk-pilihan">
                    <img
                      src={imgProdukOlahan}
                      alt="Produk pilihan"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
                {product?.map((item, index) => (
                  <SwiperSlide>
                    <Product
                      key={index}
                      name={item.name}
                      url={item.picturePath}
                      location={item.product_origin}
                      price={item.price}
                      rating={item.rate}
                      ulasan={item.review}
                      stok={item.stok}
                      id={item.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="prev-arrow prev-arrow-2"
              style={{ display: isPrevArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowBack />
            </div>
            <div
              className="next-arrow next-arrow-2"
              style={{ display: isNextArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowForward />
            </div>
          </div>
          <div className="line-produk"></div>
          <div className="title-produkPilihan">
            <h1>Produk Fashion Terbaik Untuk Kamu</h1>
          </div>
          <div className="slider wrapper slick-slider">
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={6}
                navigation={{
                  prevEl: ".prev-arrow-3",
                  nextEl: ".next-arrow-3",
                }}
                onSlideChange={(swiper) => {
                  setIsPrevArrowVisible(!swiper.isBeginning);
                  setIsNextArrowVisible(!swiper.isEnd);
                }}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div className="img-produk-pilihan">
                    <img
                      src={imgProdukFashion}
                      alt="Produk pilihan"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
                {product?.map((item, index) => (
                  <SwiperSlide>
                    <Product
                      key={index}
                      name={item.name}
                      url={item.picturePath}
                      location={item.product_origin}
                      price={item.price}
                      rating={item.rate}
                      ulasan={item.review}
                      stok={item.stok}
                      id={item.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="prev-arrow prev-arrow-3"
              style={{ display: isPrevArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowBack />
            </div>
            <div
              className="next-arrow next-arrow-3"
              style={{ display: isNextArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowForward />
            </div>
          </div>
          <div className="line-produk"></div>
          <div className="title-produkPilihan">
            <h1>Produk Kerajinan Terbaik Untuk Kamu</h1>
          </div>
          <div className="slider wrapper slick-slider">
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={6}
                navigation={{
                  prevEl: ".prev-arrow-4",
                  nextEl: ".next-arrow-4",
                }}
                onSlideChange={(swiper) => {
                  setIsPrevArrowVisible(!swiper.isBeginning);
                  setIsNextArrowVisible(!swiper.isEnd);
                }}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div className="img-produk-pilihan">
                    <img
                      src={imgProdukKerajinan}
                      alt="Produk pilihan"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
                {product?.map((item, index) => (
                  <SwiperSlide>
                    <Product
                      key={index}
                      name={item.name}
                      url={item.picturePath}
                      location={item.product_origin}
                      price={item.price}
                      rating={item.rate}
                      ulasan={item.review}
                      stok={item.stok}
                      id={item.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="prev-arrow prev-arrow-4"
              style={{ display: isPrevArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowBack />
            </div>
            <div
              className="next-arrow next-arrow-4"
              style={{ display: isNextArrowVisible ? "flex" : "none" }}
            >
              <IoIosArrowForward />
            </div>
          </div>
          <div className="line-produk"></div>
          <div className="produk-lainnya">
            <div className="title-lainnya">
              <h1>Produk Lainnya</h1>
            </div>
            <div className="container-lainnya">
              <div className="card-produk-lainnya">
                {" "}
                {product?.map((item, index) => (
                  <Product
                    key={index}
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
                {/* {product} */}
              </div>
            </div>
            <div className="container-btnSeemore">
              <button>Muat Lebih Banyak</button>
            </div>
          </div>
          <SimpleAccordion />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
