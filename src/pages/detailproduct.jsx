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
import { Rating, Snackbar } from "@mui/material";
import Footer from "../component/footer/footer";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { formatPrice } from "../utils/helpers";
import token from "../utils/token";
import MuiAlert from "@mui/material/Alert";
import { AiFillStar } from "react-icons/ai";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import ProductDetailSkeleton from "../component/loader/ProductDetailSkeleton";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

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
  const user_id = localStorage.getItem("user_id");
  const productOwnerId = detail.length > 0 ? detail[0].store.user_id : null;
  const loggedInUserId = user_id; // Ganti ini dengan cara yang benar untuk mendapatkan ID pengguna yang sedang masuk
  const isOwner = loggedInUserId === productOwnerId;
  const [appState, changeState] = useState({
    activeObject: null,
    objects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  });
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    getDetail(id);
    window.scrollTo(0, 0);
  }, [id]);

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
          getReviews(id);
        }
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  function getReviews(productId) {
    axios
      .get(apiurl() + `reviews/products?product_id=${id}`, {
        params: {
          product_id: productId,
        },
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        setReviews(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.error(error));
  }

  function addToCart(kuantitas) {
    const product = detail && detail.length > 0 ? detail[0] : null;

    const idPemilikToko = user_id; // Ganti ini dengan cara nyata untuk mendapatkan ID pengguna
    if (product && product.store.user_id === idPemilikToko) {
      alert("Anda tidak bisa membeli produk milik Anda sendiri.");
      return; // Jangan melanjutkan proses
    }

    if (product && product.quantity > 0) {
      const payload = {
        products_id: product.id,
        quantity: kuantitas,
      };

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
    } else {
      // Menangani kasus di mana stok habis dan mencegah penambahan ke keranjang
      console.log("Stok habis, tidak bisa ditambahkan ke keranjang.");
    }
  }

  function addToCartAndNavigateToCartPage(kuantitas) {
    const product = detail && detail.length > 0 ? detail[0] : null;
    const payload = {
      products_id: product.id,
      quantity: kuantitas,
    };

    const idPemilikToko = user_id; // Ganti ini dengan cara nyata untuk mendapatkan ID pengguna
    if (product && product.store.user_id === idPemilikToko) {
      alert("Anda tidak bisa membeli produk milik Anda sendiri.");
      return; // Jangan melanjutkan proses
    }
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

    const nilaiInput = e.target.value;
    const nilaiNumerik = parseInt(nilaiInput);

    if (nilaiInput.trim() === "" || isNaN(nilaiNumerik)) {
      setQuantity(1);
    } else {
      const maksKuantitas =
        detail && detail.length > 0 ? detail[0].quantity : 1;
      const kuantitasBaru = Math.min(maksKuantitas, nilaiNumerik);
      setQuantity(kuantitasBaru);
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

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  const [visibleReviews, setVisibleReviews] = useState(5);
  const incrementVisibleReviews = () => {
    setVisibleReviews(visibleReviews + 10);
  };

  function handleChatButtonClick() {
    if (detail.length > 0) {
      const to_id = detail[0].store.user_id; // Ganti ini dengan cara mendapatkan to_id dari detail produk
      navigate(`/chat/${to_id}`); // Navigasi ke halaman ChatUser dengan to_id sebagai parameter
    }
  }

  const handleFilterStarClick = (star) => {
    setActiveFilterStar(star);

    if (star === null) {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter(
        (review) => review.rate === star.toString()
      );
      setFilteredReviews(filtered);
    }
  };

  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);

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
                <div className="main-img">
                  <img
                    src={
                      mainImage ||
                      (detail.length > 0 ? detail[0].picturePath : "")
                    }
                    alt="foto produk"
                  />
                </div>
                <div className="more-img">
                  {detail.length > 0 && detail[0].picturePath && (
                    <div
                      className={`small-img-col ${
                        activeIndex === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={detail[0].picturePath}
                        alt="foto produk"
                        loading="lazy"
                        onClick={() =>
                          changeMainImage(detail[0].picturePath, 0)
                        }
                      />
                    </div>
                  )}
                  {detail.length > 0 && detail[0].photo1 && (
                    <div
                      className={`small-img-col ${
                        activeIndex === 1 ? "active" : ""
                      }`}
                    >
                      <img
                        src={detail[0].photo1}
                        alt="foto produk"
                        loading="lazy"
                        onClick={() => changeMainImage(detail[0].photo1, 1)}
                      />
                    </div>
                  )}
                  {detail.length > 0 && detail[0].photo2 && (
                    <div
                      className={`small-img-col ${
                        activeIndex === 2 ? "active" : ""
                      }`}
                    >
                      <img
                        src={detail[0].photo2}
                        alt="foto produk"
                        loading="lazy"
                        onClick={() => changeMainImage(detail[0].photo2, 2)}
                      />
                    </div>
                  )}
                  {detail.length > 0 && detail[0].photo3 && (
                    <div
                      className={`small-img-col ${
                        activeIndex === 3 ? "active" : ""
                      }`}
                    >
                      <img
                        src={detail[0].photo3}
                        alt="foto produk"
                        loading="lazy"
                        onClick={() => changeMainImage(detail[0].photo3, 3)}
                      />
                    </div>
                  )}
                  {detail.length > 0 && detail[0].photo4 && (
                    <div
                      className={`small-img-col ${
                        activeIndex === 4 ? "active" : ""
                      }`}
                    >
                      <img
                        src={detail[0].photo4}
                        alt="foto produk"
                        loading="lazy"
                        onClick={() => changeMainImage(detail[0].photo4, 4)}
                      />
                    </div>
                  )}
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
                    <h4>Suka</h4>
                  </div>
                  <div className="line-detail"></div>
                  <div className="toko-detail">
                    <img src={iconToko} alt="" />
                    <Link to={"/detailtoko/" + detail[0].store.id}>
                      <h4>
                        Toko :{" "}
                        {detail.length > 0
                          ? detail[0].store?.name
                          : "Toko tidak ada"}
                      </h4>
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
                    <button
                      onClick={incrementQuantity}
                      disabled={
                        quantity >=
                        (detail && detail.length > 0 ? detail[0].quantity : 1)
                      }
                      style={{
                        cursor:
                          quantity >=
                          (detail && detail.length > 0 ? detail[0].quantity : 1)
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor:
                          quantity >=
                          (detail && detail.length > 0 ? detail[0].quantity : 1)
                            ? "#ccc"
                            : "#fff",
                        color: "#333",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Tersisa{" "}
                    {detail && detail.length > 0 ? detail[0].quantity : 0} buah{" "}
                    {detail &&
                      detail.length > 0 &&
                      parseInt(detail[0].quantity) === 0 && (
                        <span className="stok-out" style={{ color: "red" }}>
                          Stok habis
                        </span>
                      )}
                    {detail &&
                      detail.length > 0 &&
                      parseInt(detail[0].quantity) !== 0 &&
                      parseInt(detail[0].quantity) < 3 && (
                        <span className="stok-warning" style={{ color: "red" }}>
                          Stok tinggal sedikit
                        </span>
                      )}
                  </p>
                </div>
                <div className="btn-cartBuy">
                  {detail && detail.length > 0 ? (
                    isOwner ? (
                      <button
                        className="btn-edit-detail-product"
                        onClick={() => navigate("/ubahProduk/" + detail[0].id)}
                      >
                        Edit Produk
                      </button>
                    ) : detail[0].quantity > 0 ? (
                      <>
                        <button
                          className="btn-cart"
                          onClick={() => addToCart(quantity)}
                        >
                          <img src={cart} alt="" />
                          Tambahkan ke Keranjang
                        </button>
                        <button
                          className="btn-buy"
                          onClick={() =>
                            addToCartAndNavigateToCartPage(quantity)
                          }
                        >
                          Beli
                        </button>
                        <button
                          className="btn-chat" // Tombol chat
                          onClick={handleChatButtonClick} // Panggil fungsi untuk navigasi dan mengirim to_id
                        >
                          Chat
                        </button>
                      </>
                    ) : (
                      <div className="out-of-stock">Produk tidak tersedia.</div>
                    )
                  ) : null}
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
                {filteredReviews.length > 0 ? (
                  filteredReviews.slice(0, visibleReviews).map((review) => (
                    <div className="penilaian-item1">
                      <div className="profile-nilai">
                        <div className="profile-penilaian">
                          <div className="img-profile-ulasan">
                            <img
                              src={review.user.profile_photo_path}
                              alt="profile"
                            />
                          </div>
                          <h4>{review.user.name}</h4>
                        </div>
                        <div className="tgl-penilaian">
                          <h4>
                            {" "}
                            {new Date(review.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </h4>
                        </div>
                      </div>
                      <div className="desc-penilaian">
                        <div className="rating">
                          <h4>
                            {reviews.length > 0 ? reviews[0].product.name : ""}
                          </h4>
                          <Rating
                            name="read-only"
                            value={parseInt(review.rate)}
                            readOnly
                          />
                        </div>
                        <p>{review.review}</p>
                      </div>
                      {review.gallery_reviews.map((gallery) => (
                        <div className="img-produk-penilaian" key={gallery.id}>
                          {gallery.image_path && (
                            <img
                              src={gallery.image_path}
                              alt="foto produk ulasan"
                              onClick={() => openModal(gallery.image_path)}
                            />
                          )}
                          {gallery.image_path_2 && (
                            <img
                              src={gallery.image_path_2}
                              alt="foto produk ulasan"
                              onClick={() => openModal(gallery.image_path_2)}
                            />
                          )}
                          {gallery.image_path_3 && (
                            <img
                              src={gallery.image_path_3}
                              alt="foto produk ulasan"
                              onClick={() => openModal(gallery.image_path_3)}
                            />
                          )}
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
                            <button
                              className="modal-close"
                              onClick={closeModal}
                            >
                              <MdClose />
                            </button>
                          </Modal>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="centered-red-text">Belum ada review produk.</p>
                )}
                {activeFilterStar !== null && filteredReviews.length === 0 && (
                  <p className="centered-red-text">
                    Produk tidak tersedia untuk rating ini.
                  </p>
                )}
              </div>
              {filteredReviews.length > visibleReviews && (
                <div
                  className="btn-lihat-lebih-banyak-ulasan"
                  onClick={incrementVisibleReviews}
                >
                  <h1>Tampilkan lebih banyak ulasan</h1>
                  <IoIosArrowDown />
                </div>
              )}
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
