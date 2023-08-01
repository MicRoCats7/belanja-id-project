import React from "react";
import "../style/detailproduct.css";
import Navbar from "../component/navbar/navbar";
import iconHome from "../assets/icon/icon home.svg";
import { Link, Navigate, useParams } from "react-router-dom";
import iconSold from "../assets/icon/icon sold.svg";
import iconLove from "../assets/icon/icon love.svg";
import iconRatings from "../assets/icon/icon star.svg";
import iconToko from "../assets/icon/icon toko.svg";
import cart from "../assets/icon/cart.svg";
import { useState, useEffect } from "react";
import exampProfile from "../assets/image/profile.png";
import { Rating, Snackbar } from "@mui/material";
import Footer from "../component/footer/footer";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { formatPrice } from "../utils/helpers";
import token from "../utils/token";
import MuiAlert from "@mui/material/Alert";
import { AiFillStar } from "react-icons/ai";
import exampProduk from "../assets/image/fotobarang.svg";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import ProductDetailSkeleton from "../component/loader/ProductDetailSkeleton";
import { useNavigate } from "react-router-dom";

function DetailProduct() {
  const [value, setValue] = React.useState(5);
  const [detail, setDetail] = useState([]);
  const [gallery, setGalleryImg] = useState([]);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilterStar, setActiveFilterStar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        setIsLoading(false);
        let filteredData = response.data.data.filter((item) => item.id == id);
        if (filteredData.length > 0) {
          setDetail(filteredData);
        }
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  function getGallery(id) {
    axios
      .get(apiurl() + "product/img", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        let filteredData = response.data.data.data.filter(
          (item) => item.products_id == id
        );
        console.log(filteredData);
        if (filteredData.length > 0) {
          setGalleryImg(filteredData);
        }
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }
  console.log(gallery);

  useEffect(() => {
    getGallery(id);
    getDetail(id);
    window.scrollTo(0, 0);
  }, [id]);

  function addToCart(kuantitas) {
    const product = detail && detail.length > 0 ? detail[0] : null;
    const payload = {
      products_id: product.id,
      quantity: kuantitas,
    };
    // console.log(product.id);
    axios
      .post(apiurl() + "cart/add", payload, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        handleSuccessAlertOpen();
        setQuantity(1);
        setIsLoading(false);
      })
      .catch((error) => {
        handleErrorAlertOpen();
        console.error(error);
      });
  }

  function addToCartAndNavigateToCartPage(kuantitas) {
    const product = detail && detail.length > 0 ? detail[0] : null;
    const payload = {
      products_id: product.id,
      quantity: kuantitas,
    };
    // ... (fungsi lainnya tetap sama)
    axios
      .post(apiurl() + "cart/add", payload, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        handleSuccessAlertOpen();
        navigate("/cart");
      })
      .catch((error) => {
        handleErrorAlertOpen();
        console.log(error);
      });
  }

  function handleQuantityChange(e) {
    e.preventDefault();

    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue);

    if (inputValue.trim() === "" || isNaN(numericValue)) {
      setQuantity(1);
    } else {
      setQuantity(numericValue);
    }
  }

  function incrementQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decrementQuantity() {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  function changeMainImage(url, index) {
    setMainImage(url);
    setActiveIndex(index);
  }

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    let sortedData = [...filteredData];

    if (sortBy === "terbaru") {
      sortedData.sort((a, b) => b.id - a.id);
    } else if (sortBy === "harga-tinggi") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortBy === "harga-rendah") {
      sortedData.sort((a, b) => a.price - b.price);
    }

    setFilteredData(sortedData);
  };

  const handleFilterStarClick = (star) => {
    setActiveFilterStar(star);
  };

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <div className="main-detail">
      <Navbar />
      <div className="container-detail">
        <div className="navigation">
          {isLoading ? (
            <div className="loading-skeleton">
              <Skeleton width={150} height={20} />
              <Skeleton width={150} height={20} />
              <Skeleton width={150} height={20} />
            </div>
          ) : (
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
          )}
        </div>
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : (
          <>
            <div className="detail-product">
              <div className="detail-product-img">
                <div className="more-img">
                  {gallery && gallery.length > 0
                    ? gallery.map((image, index) => (
                        <div className="small-img-col">
                          <img
                            key={image.id}
                            src={image.url}
                            alt="foto produk"
                            loading="lazy"
                            className={index === activeIndex ? "active" : ""}
                            onClick={() => changeMainImage(image.url, index)}
                          />
                        </div>
                      ))
                    : null}
                </div>
                <div className="main-img">
                  <img
                    src={
                      mainImage ||
                      (detail.length > 0 ? detail[0].picturePath : "")
                    }
                    alt="foto produk"
                  />
                </div>
              </div>
              <div className="detail-product-desc">
                <h1>{detail.length > 0 ? detail[0].name : ""}</h1>
                <div className="info-desc">
                  <div className="sold">
                    <img src={iconSold} alt="" />
                    <h4>
                      Terjual :{" "}
                      {detail.length > 0 ? detail[0].sold_quantity : ""}
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
                {gallery && gallery.length > 0 && (
                  <div className="pilih-product">
                    <h3>Pilih Produk</h3>
                    <div className="pilih-product-item">
                      {gallery.map((elements, index) => (
                        <button
                          key={index}
                          className={toggleActiveStyles(index)}
                          onClick={() => {
                            toggleActive(index);
                          }}
                        >
                          {elements.selectProduct}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="kuantitas-detail">
                  <h3>Kuantitas</h3>
                  <div className="kuantitas-item">
                    <button onClick={decrementQuantity}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e)}
                    />
                    <button onClick={incrementQuantity}>+</button>
                  </div>
                  <p>
                    Tersisa {detail.length > 0 ? detail[0].quantity : ""} buah{" "}
                  </p>
                </div>
                <div className="btn-cartBuy">
                  <button
                    className="btn-cart"
                    onClick={() => addToCart(quantity)}
                  >
                    <img src={cart} alt="" />
                    Tambahkan ke Keranjang
                  </button>
                  <button
                    className="btn-buy"
                    onClick={() => addToCartAndNavigateToCartPage(quantity)}
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
            <div className="deskripsi-produk">
              <h3>Deskripsi Produk</h3>
              <div className="spesifikasi-item">
                <div className="spesifikasi-item1">
                  <h4>Kondisi</h4>
                </div>
                <div className="titik">
                  <h4>:</h4>
                </div>
                <div className="spesifikasi-item2">
                  <h4>{detail.length > 0 ? detail[0].kondisi_produk : ""}</h4>
                </div>
              </div>
              <p>{detail.length > 0 ? detail[0].description : ""}</p>
            </div>
            <div className="penilaian-produk">
              <h3>Penilaian Produk</h3>
              <div className="produk-dinilai">
                <div className="img-pro-dinilai">
                  <img
                    src={detail.length > 0 ? detail[0].picturePath : ""}
                    alt="produk review"
                  />
                  <div className="name-produk-dinilai">
                    <h1>{detail.length > 0 ? detail[0].name : ""}</h1>
                    <h2>
                      Rp {formatPrice(detail.length > 0 ? detail[0].price : "")}
                    </h2>
                  </div>
                </div>
                <div className="dropdown-urutkan">
                  <p className="urutkan-teks">Urutkan</p>
                  <div className="center">
                    <select
                      name="sortBy"
                      id="sortBy"
                      className="custom-select sources"
                      onChange={handleSortChange}
                    >
                      <option value="terbaru">Terbaru</option>
                      <option value="harga-tinggi">Harga Tertinggi</option>
                      <option value="harga-rendah">Harga Terendah</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="tab-filterStar-penilaian">
                <p>Filter</p>
                <button
                  className={activeFilterStar === null ? "active" : ""}
                  onClick={() => handleFilterStarClick(null)}
                >
                  Semua
                </button>
                <button
                  className={activeFilterStar === 1 ? "active" : ""}
                  onClick={() => handleFilterStarClick(1)}
                >
                  <AiFillStar /> 1
                </button>
                <button
                  className={activeFilterStar === 2 ? "active" : ""}
                  onClick={() => handleFilterStarClick(2)}
                >
                  <AiFillStar /> 2
                </button>
                <button
                  className={activeFilterStar === 3 ? "active" : ""}
                  onClick={() => handleFilterStarClick(3)}
                >
                  <AiFillStar /> 3
                </button>
                <button
                  className={activeFilterStar === 4 ? "active" : ""}
                  onClick={() => handleFilterStarClick(4)}
                >
                  <AiFillStar /> 4
                </button>
                <button
                  className={activeFilterStar === 5 ? "active" : ""}
                  onClick={() => handleFilterStarClick(5)}
                >
                  <AiFillStar /> 5
                </button>
              </div>
              <div className="penilaian-item">
                <div className="penilaian-item1">
                  <div className="profile-nilai">
                    <div className="profile-penilaian">
                      <img src={exampProfile} alt="profile" />
                      <h4>Faisal Mahadi</h4>
                    </div>
                    <div className="tgl-penilaian">
                      <h4>2022-05-29 16:51</h4>
                    </div>
                  </div>
                  <div className="desc-penilaian">
                    <div className="rating">
                      <h4>{detail.length > 0 ? detail[0].name : ""}</h4>

                      <Rating name="read-only" value={value} readOnly />
                    </div>
                    <p>
                      Harga Murah, Ukr. L Real picture, Benar Cartoon 24S,
                      Jahitan Rapi, Bahannya Halus, lembut, dan dingin Serta
                      enak Saat di pakai untuk kegiatan sehari-hari maupun
                      santai di rumah. Recommended Seller deh !!! Buruan Order.
                    </p>
                  </div>
                  <div className="img-produk-penilaian">
                    <img
                      src={exampProduk}
                      alt="foto produk ulasan"
                      onClick={() => openModal(exampProduk)}
                    />
                    <img
                      src={exampProduk}
                      alt="foto produk ulasan"
                      onClick={() => openModal(exampProduk)}
                    />
                    <img
                      src={exampProduk}
                      alt="foto produk ulasan"
                      onClick={() => openModal(exampProduk)}
                    />
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={closeModal}
                      contentLabel="Gambar Popup"
                      shouldCloseOnOverlayClick={true}
                      shouldCloseOnEsc={true}
                      className="modal-content-penilaian"
                      overlayClassName="modal-overlay"
                    >
                      {selectedImage && (
                        <img
                          src={selectedImage}
                          alt="foto produk popup"
                          className="modal-image"
                        />
                      )}
                      <button className="modal-close" onClick={closeModal}>
                        <MdClose />
                      </button>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        variant="filled"
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Produk ditambahkan ke keranjang
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
          Periksa Jaringan Anda
        </MuiAlert>
      </Snackbar>
      <Footer />
    </div>
  );
}

export default DetailProduct;
