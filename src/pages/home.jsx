import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar/navbar";
import imgProdukPilihan from "../assets/image/img-pilihan.svg";
import imgProdukOlahan from "../assets/image/imgProdukOlahan.svg";
import imgProdukFashion from "../assets/image/fashion.svg";
import imgProdukKerajinan from "../assets/image/kerajinan tangan.svg";
import "../style/home.css";
import SimpleAccordion from "../component/accordion/accordion";
import Footer from "../component/footer/footer";
import axios from "axios";
import apiurl from "../utils/apiurl";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import imgIklan from "../assets/image/iklan-toko.svg";
import imgIklan2 from "../assets/image/iklan-toko-event.svg";
import imgIklan3 from "../assets/image/iklan-toko-add.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "../component/product/product";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../component/loader/Loading";
import LoadingCategories from "../component/loader/LoadingCategories";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const [product, setProduct] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [banner, setBanners] = useState([]);
  const [isPrevArrowVisible, setIsPrevArrowVisible] = useState(false);
  const [isNextArrowVisible, setIsNextArrowVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [productKerajinan, setProducKerajinan] = useState();
  const [productFood, setProductFood] = useState();
  const [productFashion, setProductFashion] = useState();
  const [isImgLoading, setIsImgLoading] = useState(true);
  const { id } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsToShow, setProductsToShow] = useState(12);
  const additionalProducts = 12;
  const navigate = useNavigate();

  useEffect(() => {
    getProductByCategoryId(id);
    getProduct();
    getProductByCategoryFood(id);
    getCategories();
    getProductByCategoryFashion(id);
    // getBanner();
    window.scrollTo(0, 0);
  }, [id]);

  const desiredCategoryIds = [1];

  function getProduct() {
    axios
      .get(apiurl() + "products")
      .then((response) => {
        setProduct(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  function getProductByCategoryId(categoryId) {
    setIsLoading(true);
    axios
      .get(apiurl() + "products?category_id=" + "26")
      .then((response) => {
        setProducKerajinan(response.data.data);
        setIsLoading(false);
        console.log(
          "Berhasil mengambil data produk dengan ID kategori:",
          categoryId
        );
      })
      .catch((error) => console.error(error));
  }
  function getProductByCategoryFood() {
    setIsLoading(true);
    axios
      .get(apiurl() + "products?category_id=" + "3")
      .then((response) => {
        setProductFood(response.data.data);
        setIsLoading(false);
        console.log(
          "Berhasil mengambil data produk dengan ID kategori:",
          response.data.data
        );
      })
      .catch((error) => console.error(error));
  }

  function getProductByCategoryFashion() {
    setIsLoading(true);
    axios
      .get(apiurl() + "products?category_id=" + "5")
      .then((response) => {
        setProductFashion(response.data.data);
        setIsLoading(false);
        console.log(
          "Berhasil mengambil data produk dengan ID kategori:",
          response.data.data
        );
      })
      .catch((error) => console.error(error));
  }

  // function getBanner() {
  //   axios
  //     .get(apiurl() + "banners")
  //     .then((response) => {
  //       setBanners(response.data);
  //       console.log("Berhasil mengambil data banner:", response.data);
  //     })
  //     .catch((error) => console.error(error));
  // }

  function getCategories() {
    axios
      .get(apiurl() + "categories")
      .then((response) => {
        setCategories(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  const getProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(apiurl() + `categories/${categoryId}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelection = (categoryId) => {
    setSelectedCategoryId(categoryId);
    getProductsByCategory(categoryId);

    navigate(`/categories/${categoryId}`);
  };

  const handleLoadMore = () => {
    setProductsToShow((prevCount) => prevCount + additionalProducts);
  };

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <div className="heroPage">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Mousewheel, Keyboard]}
            navigation
            autoplay={{ delay: 2500 }}
            cssMode={true}
            mousewheel={true}
            keyboard={true}
            loop={true}
            grabCursor={true}
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className}"></span>`,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={imgIklan} alt="" className="img-iklan" loading="lazy" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imgIklan2}
                alt=""
                className="img-iklan"
                loading="lazy"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imgIklan3}
                alt=""
                className="img-iklan"
                loading="lazy"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="Kategori">
          <div className="title-kategori">
            {isLoading ? (
              <div className="loading-skeleton">
                <Skeleton
                  width={250}
                  height={40}
                  style={{ marginBottom: "20px" }}
                />
              </div>
            ) : (
              <h1>Kategori Produk</h1>
            )}
          </div>
          <div className="container-kategori">
            {isLoading ? (
              <div className="loading-skeleton">
                <LoadingCategories cards={7} />
              </div>
            ) : (
              categories.map((item) => {
                return (
                  <div className="kategori-produk" key={item.id}>
                    <div
                      className="kategori-produk"
                      onClick={() =>
                        navigate(`/category/${item.id}/${item.name}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.photo}
                        alt="icon kerajinan tangan"
                        loading="lazy"
                      />
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="produk-pilihan">
          <div className="title-produkPilihan">
            {isLoading ? (
              <div className="loading-skeleton">
                <Skeleton width={250} height={40} />
              </div>
            ) : (
              <h1>Produk Pilihan Belanja.id Untuk Kamu</h1>
            )}
          </div>
          <div
            className={`slider wrapper slick-slider ${
              isHovered ? "hovered" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
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
                  {isLoading ? (
                    <div className="loading-skeleton">
                      <Loading cards={0} />
                    </div>
                  ) : (
                    <div className="img-produk-pilihan">
                      <img
                        src={imgProdukPilihan}
                        alt="Produk pilihan"
                        loading="lazy"
                        onLoad={() => setIsImgLoading(false)}
                      />
                    </div>
                  )}
                </SwiperSlide>
                {isLoading ? (
                  <div className="loading-skeleton">
                    <Loading cards={7} />
                  </div>
                ) : (
                  product?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Product
                        name={item.name}
                        url={item.picturePath}
                        location={item.store?.provinces}
                        price={item.price}
                        rating={item.rate}
                        ulasan={item.review}
                        stok={item.stok}
                        id={item.id}
                      />
                    </SwiperSlide>
                  ))
                )}
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
            {isLoading ? (
              <div className="loading-skeleton">
                <Skeleton width={250} height={40} />
              </div>
            ) : (
              <h1>Produk Olahan Makanan Pilihan Untuk Kamu</h1>
            )}
          </div>
          <div className="slider wrapper slick-slider">
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
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
                  {isLoading ? (
                    <div className="loading-skeleton">
                      <Loading cards={0} />
                    </div>
                  ) : (
                    <div className="img-produk-pilihan">
                      <img
                        src={imgProdukOlahan}
                        alt="Produk pilihan"
                        loading="lazy"
                        onLoad={() => setIsImgLoading(false)}
                      />
                    </div>
                  )}
                </SwiperSlide>
                {isLoading ? (
                  <div className="loading-skeleton">
                    <Loading cards={7} />
                  </div>
                ) : (
                  productFood?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Product
                        name={item.name}
                        url={item.picturePath}
                        location={item.store?.provinces}
                        price={item.price}
                        rating={item.rate}
                        ulasan={item.review}
                        stok={item.stok}
                        id={item.id}
                      />
                    </SwiperSlide>
                  ))
                )}
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
            {isLoading ? (
              <div className="loading-skeleton">
                <Skeleton width={250} height={40} />
              </div>
            ) : (
              <h1>Produk Fashion Terbaik Untuk Kamu</h1>
            )}
          </div>
          <div className="slider wrapper slick-slider">
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
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
                  {isLoading ? (
                    <div className="loading-skeleton">
                      <Loading cards={0} />
                    </div>
                  ) : (
                    <div className="img-produk-pilihan">
                      <img
                        src={imgProdukFashion}
                        alt="Produk pilihan"
                        loading="lazy"
                        onLoad={() => setIsImgLoading(false)}
                      />
                    </div>
                  )}
                </SwiperSlide>
                {isLoading ? (
                  <div className="loading-skeleton">
                    <Loading cards={7} />
                  </div>
                ) : (
                  productFashion?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Product
                        name={item.name}
                        url={item.picturePath}
                        location={item.store?.provinces}
                        price={item.price}
                        rating={item.rate}
                        ulasan={item.review}
                        stok={item.stok}
                        id={item.id}
                      />
                    </SwiperSlide>
                  ))
                )}
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
            {isLoading ? (
              <div className="loading-skeleton">
                <Skeleton width={250} height={40} />
              </div>
            ) : (
              <h1>Produk Kerajinan Terbaik Untuk Kamu</h1>
            )}
          </div>
          <div className="slider wrapper slick-slider">
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
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
                  {isLoading ? (
                    <div className="loading-skeleton">
                      <Loading cards={0} />
                    </div>
                  ) : (
                    <div className="img-produk-pilihan">
                      <img
                        src={imgProdukKerajinan}
                        alt="Produk pilihan"
                        loading="lazy"
                        onLoad={() => setIsImgLoading(false)}
                      />
                    </div>
                  )}
                </SwiperSlide>
                {isLoading ? (
                  <div className="loading-skeleton">
                    <Loading cards={7} />
                  </div>
                ) : (
                  productKerajinan?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Product
                        name={item.name}
                        url={item.picturePath}
                        location={item.store?.provinces}
                        price={item.price}
                        rating={item.rate}
                        ulasan={item.review}
                        stok={item.stok}
                        id={item.id}
                      />
                    </SwiperSlide>
                  ))
                )}
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
              {isLoading ? (
                <div className="loading-skeleton">
                  <Skeleton width={250} height={40} />
                </div>
              ) : (
                <h1>Produk Lainnya</h1>
              )}
            </div>
            <div className="container-lainnya">
              <div className="card-produk-lainnya">
                {isLoading ? (
                  <div className="loading-skeleton">
                    <Loading cards={7} />
                  </div>
                ) : (
                  product
                    .slice(0, productsToShow)
                    .map((item) => (
                      <Product
                        name={item.name}
                        url={item.picturePath}
                        location={item.store?.provinces}
                        price={item.price}
                        rating={item.rate}
                        ulasan={item.review}
                        stok={item.stok}
                        id={item.id}
                      />
                    ))
                )}
              </div>
            </div>
            {product.length > productsToShow && (
              <div className="container-btnSeemore">
                <button onClick={handleLoadMore}>Muat Lebih Banyak</button>
              </div>
            )}
          </div>
          <SimpleAccordion />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
