import React from "react";
import "../style/riwayat.css";
import BagIcon from "../assets/icon/bag.svg";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useState } from "react";
import token from "../utils/token";
import { useEffect } from "react";
import { formatPrice } from "../utils/helpers";
import LoadingSkeletonRiwayat from "../component/loader/LoadingSkeletonRiwayat";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import ModalUlasan from "../component/modal/modalUlasan";
import ModalDetailTransaksi from "../component/modal/modalDetailTransaksi";
import ModalStatusBarang from "../component/modal/modalStatusBarang";
import SimpleAccordion from "../component/accordion/accordionCaraPembayaran";
import { CgCopy } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import { BsThreeDots, BsThreeDotsVertical, BsTrash3 } from "react-icons/bs";

function Riwayat() {
  useEffect(() => {
    getRiwayatTransaksi();
    window.scrollTo(0, 0);
  }, []);

  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [showCaraPembayaranPopup, setShowCaraPembayaranPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStatusData, setSelectedStatusData] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [previewImg1, setPreviewImg1] = useState(null);
  const [previewImg2, setPreviewImg2] = useState(null);
  const [previewImg3, setPreviewImg3] = useState(null);
  const [previewImg4, setPreviewImg4] = useState(null);
  const [selectedReviewPhotos, setSelectedReviewPhotos] = useState({
    image_path: null,
    image_path_2: null,
    image_path_3: null,
    image_path_4: null,
  });
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [reviewText, setReviewText] = useState(""); // State untuk teks ulasan
  const [ratingValue, setRatingValue] = useState(0); // State untuk nilai peringkat
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successOpen, setSuccesOpen] = useState(false);
  const [succesAddCart, setSuccesAddcart] = useState(false);
  const [succesCopy, setSuccesCopy] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorAddCart, setErrorAddCart] = useState(false);

  const renderNoTransactions = () => {
    return (
      <div className="no-transactions-message">
        No transactions found for this status.
      </div>
    );
  };

  const handleDetailTransaksi = (transaction) => {
    setSelectedTransaction(transaction);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetailTransaksi = () => {
    setSelectedTransaction(null);
    document.body.style.overflow = "auto";
  };

  const handleShowCaraPembayaranPopup = async (transactionId) => {
    try {
      setShowCaraPembayaranPopup(true);
      document.body.style.overflow = "hidden";

      // Fetch payment status here using the transaction ID
      const response = await axios.get(
        apiurl() + `midtrans/check-payment-status/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );

      // Assuming the API response structure you provided
      const paymentData = response.data.data;
      setPaymentDetails(paymentData);
    } catch (error) {
      console.error("Error fetching payment status:", error);
    }
  };
  const handleCloseCaraPembayaranPopup = () => {
    setShowCaraPembayaranPopup(false);
    document.body.style.overflow = "auto";
  };

  const user_id = localStorage.getItem("user_id");
  async function getRiwayatTransaksi() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        apiurl() + "transactions?user_id=" + user_id,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );
      const storedReviewedProducts =
        JSON.parse(localStorage.getItem("reviewedProducts")) || [];

      setReviewedProducts(storedReviewedProducts);
      setRiwayatTransaksi(response.data.data);
      setSelectedTransaction(response.data[0]);
      setIsLoading(false);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  function acceptTransaction(transactionId) {
    axios
      .get(apiurl() + `transactions/finished/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        // Manajemen status atau tampilan jika permintaan sukses
        console.log("Transaction accepted:", response.data);
        setIsLoading(false);
        handleSuccesstOpen();
      })
      .catch((error) => {
        console.error("Error accepting transaction:", error);
        setIsLoading(false);
        handleErrorAlertOpen();
      });
  }

  function filterByStatus(transaksi) {
    if (selectedFilter === "all") {
      return true;
    }
    return transaksi.status === selectedFilter;
  }

  function searchFilter(transaksi) {
    if (searchQuery === "") {
      return true;
    }

    const productName = transaksi.product?.name || ""; // Handle potential null
    const userName = transaksi.user?.name || ""; // Handle potential null

    return (
      userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleShowStatusPopup = (statusData) => {
    setSelectedStatusData(statusData);
    setShowStatusPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseStatusPopup = () => {
    setSelectedStatusData(null);
    setShowStatusPopup(false);
    document.body.style.overflow = "auto";
  };

  const handleShowReviewPopup = (productId) => {
    setSelectedProductId(productId);
    setShowReviewPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseReviewPopup = () => {
    setShowReviewPopup(false);
    document.body.style.overflow = "auto";
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedReviewPhotos((prevPhotos) => ({
        ...prevPhotos,
        image_path: file,
      }));
      setPreviewImg1(URL.createObjectURL(file));
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedReviewPhotos((prevPhotos) => {
        console.log("Foto sebelumnya:", prevPhotos);
        const updatedPhotos = {
          ...prevPhotos,
          image_path_2: file,
        };
        console.log("Foto diperbarui:", updatedPhotos);
        return updatedPhotos;
      });
      setPreviewImg2(URL.createObjectURL(file));
    }
  };

  const handleImageChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedReviewPhotos((prevPhotos) => {
        console.log("Foto sebelumnya:", prevPhotos);
        const updatedPhotos = {
          ...prevPhotos,
          image_path_3: file,
        };
        console.log("Foto diperbarui:", updatedPhotos);
        return updatedPhotos;
      });
      setPreviewImg3(URL.createObjectURL(file));
    }
  };

  const handleImageChange4 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedReviewPhotos((prevPhotos) => {
        console.log("Foto sebelumnya:", prevPhotos);
        const updatedPhotos = {
          ...prevPhotos,
          image_path_4: file,
        };
        console.log("Foto diperbarui:", updatedPhotos);
        return updatedPhotos;
      });
      setPreviewImg4(URL.createObjectURL(file));
    }
  };

  const handleSubmitReview = async () => {
    if (ratingValue > 0) {
      const reviewData = {
        users_id: localStorage.getItem("user_id"),
        product_id: selectedProductId,
        review: reviewText,
        rate: ratingValue,
      };
      setSubmittingReview(true);

      try {
        const response = await axios.post(apiurl() + "reviews", reviewData, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        });

        const reviewedProductId = selectedProductId;
        const updatedReviewedProducts = [
          ...reviewedProducts,
          reviewedProductId,
        ];

        // Update state dan penyimpanan
        setReviewedProducts(updatedReviewedProducts);
        localStorage.setItem(
          "reviewedProducts",
          JSON.stringify(updatedReviewedProducts)
        );

        // Upload selected review photos
        const formData = new FormData();
        if (selectedReviewPhotos.image_path) {
          formData.append("image_path", selectedReviewPhotos.image_path);
        }
        if (selectedReviewPhotos.image_path_2) {
          formData.append("image_path_2", selectedReviewPhotos.image_path_2);
        }
        if (selectedReviewPhotos.image_path_3) {
          formData.append("image_path_3", selectedReviewPhotos.image_path_3);
        }
        if (selectedReviewPhotos.image_path_4) {
          formData.append("image_path_4", selectedReviewPhotos.image_path_4);
        }

        await axios.post(
          apiurl() + `gallery-reviews/${response.data.data.id}/upload-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token()}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        handleSuccessAlertOpen();
        setSubmittingReview(false);
        handleCloseReviewPopup();
        getRiwayatTransaksi();
      } catch (error) {
        console.error("Error adding review:", error);
        setSubmittingReview(false);
        handleErrorAlertOpen();
      }
    } else {
      // Handle validation error
    }
  };

  const removeSelectedPhoto = (path) => {
    setSelectedReviewPhotos((prevPhotos) => ({
      ...prevPhotos,
      [path]: null,
    }));
    if (path === "image_path") {
      setPreviewImg2(null);
    } else if (path === "image_path_2") {
      setPreviewImg2(null);
    } else if (path === "image_path_3") {
      setPreviewImg3(null);
    } else if (path === "image_path_4") {
      setPreviewImg4(null);
    }
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleSuccesstOpen = () => {
    setSuccesOpen(true);
  };

  const handleSuccesstAddCart = () => {
    setSuccesAddcart(true);
  };

  const handleSuccesstCopy = () => {
    setSuccesCopy(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  const handleErrorAddCart = () => {
    setErrorAddCart(true);
  };

  const tambahkanKeKeranjang = async (productId) => {
    try {
      const response = await axios.post(
        apiurl() + "cart/add",
        {
          products_id: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );
      handleSuccesstAddCart();
      console.log(
        "Produk berhasil ditambahkan ke keranjang:",
        response.data.data
      );
      // Tampilkan notifikasi atau lakukan aksi lain yang diinginkan
    } catch (error) {
      handleErrorAddCart();
      console.error("Error menambahkan produk ke keranjang:", error);
      // Tampilkan notifikasi atau aksi lain jika terjadi kesalahan
    }
  };

  function copyToClipboard(text) {
    handleSuccesstCopy();
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
  }

  return (
    <div className="content">
      <div className="text-histori">
        <h1>Riwayat Pesanan</h1>
      </div>
      <div className="opsi">
        <div className="search-riwayat">
          <input
            type="text"
            placeholder="Cari Produk atau Nama Pelanggan"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>
        <div className="filter-section">
          <div className="dropdown-produk">
            <select
              name="kategori-produk"
              id="kategori-produk"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">Semua</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSED">Processed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="FINISHED">Finished</option>
            </select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingSkeletonRiwayat />
      ) : (
        <div className="form-riwayat">
          <h3>Daftar Transaksi</h3>
          {riwayatTransaksi.filter(filterByStatus).filter(searchFilter)
            .length === 0
            ? renderNoTransactions()
            : riwayatTransaksi
                .filter(filterByStatus)
                .filter(searchFilter)
                .map((transaksi) => (
                  <div className="box-riwayat" key={transaksi.id}>
                    <div className="info-pesanan">
                      <img src={BagIcon} alt="" />
                      <p className="text-belanja">Belanja</p>
                      <div className="data-verifikasi">{transaksi.status}</div>
                      <p>
                        {new Date(transaksi.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p style={{ color: "red" }}>ID ORDER : {transaksi.id}</p>
                    </div>
                    <div className="toko-barang">
                      {transaksi.product &&
                      transaksi.product.store &&
                      transaksi.product.store.logo ? (
                        <img src={transaksi.product.store.logo} alt="" />
                      ) : null}
                      <div className="info-detail-toko">
                        <div className="nama-toko">
                          {transaksi.product && transaksi.product.store
                            ? transaksi.product.store.name
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div
                      className="info-detail-total"
                      key={transaksi.product?.id}
                    >
                      <Link to={"/detailproduct/" + transaksi.product?.id}>
                        <div className="wrap">
                          <div className="images">
                            <img src={transaksi.product?.picturePath} alt="" />
                          </div>
                          <div className="info-detail-toko">
                            <div className="nama-barang">
                              {transaksi.product?.name}
                            </div>
                            <div className="total-barang">
                              {transaksi.quantity} barang
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="total-riwayat">
                        <div className="txt-belanja">Total Belanja</div>
                        <div className="harga-belanja">
                          Rp. {formatPrice(transaksi.total)}
                        </div>
                      </div>
                    </div>
                    <div className="opsi-belilagi-lihatdetail">
                      {transaksi.status === "FINISHED" &&
                        !reviewedProducts.includes(transaksi.product?.id) && (
                          <button
                            className="btn-belilagi"
                            onClick={() =>
                              handleShowReviewPopup(transaksi.product?.id)
                            }
                          >
                            Review
                          </button>
                        )}
                      {transaksi.status === "PENDING" && (
                        <>
                          <button
                            className="btn-belilagi"
                            onClick={() => handleDetailTransaksi(transaksi)}
                          >
                            Lihat Detail
                          </button>
                          <button
                            onClick={() =>
                              handleShowCaraPembayaranPopup(transaksi.id)
                            }
                            className="btn-belilagi"
                          >
                            Cara Pembayaran
                          </button>
                          <BsThreeDots
                            style={{ fontSize: "20px", cursor: "pointer" }}
                            onClick={() => setShowPopup(!showPopup)}
                          />
                        </>
                      )}
                      {transaksi.status === "PROCESSED" && (
                        <button
                          className="btn-belilagi"
                          onClick={() => handleShowStatusPopup(transaksi)}
                        >
                          Lihat Status
                        </button>
                      )}
                      {transaksi.status === "SHIPPED" && (
                        <>
                          <button className="btn-belilagi">Lihat Status</button>
                          <button
                            className="btn-belilagi"
                            onClick={() => acceptTransaction(transaksi.id)}
                          >
                            Selesaikan Pesanan
                          </button>
                        </>
                      )}
                      {transaksi.status === "FINISHED" && (
                        <>
                          <button
                            className="btn-detailtransaksi"
                            onClick={() => handleDetailTransaksi(transaksi)}
                          >
                            Detail Transaksi
                          </button>
                          <button
                            onClick={() => {
                              tambahkanKeKeranjang(transaksi.product.id);
                            }}
                            className="btn-belilagi"
                          >
                            Beli Lagi
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
        </div>
      )}
      {selectedStatusData && showStatusPopup && (
        <ModalStatusBarang
          selectedStatusData={selectedStatusData}
          onClose={handleCloseStatusPopup}
        />
      )}
      {showReviewPopup && (
        <ModalUlasan
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          reviewText={reviewText}
          setReviewText={setReviewText}
          previewImg1={previewImg1}
          handleImageChange1={handleImageChange1}
          previewImg2={previewImg2}
          handleImageChange2={handleImageChange2}
          previewImg3={previewImg3}
          handleImageChange3={handleImageChange3}
          previewImg4={previewImg4}
          handleImageChange4={handleImageChange4}
          removeSelectedPhoto={removeSelectedPhoto}
          handleCloseReviewPopup={handleCloseReviewPopup}
          handleSubmitReview={handleSubmitReview}
          submittingReview={submittingReview}
        />
      )}
      {selectedTransaction && (
        <ModalDetailTransaksi
          selectedTransaction={selectedTransaction}
          handleCloseDetailTransaksi={handleCloseDetailTransaksi}
        />
      )}
      {showCaraPembayaranPopup && (
        <div
          className={`popup-container ${
            showCaraPembayaranPopup ? "visible" : ""
          }`}
        >
          {paymentDetails ? (
            <div className="popup-content-cara-pembayaran">
              <div className="top-popup-content">
                <h2>Cara Pembayaran</h2>
                <MdOutlineClose
                  onClick={handleCloseCaraPembayaranPopup}
                  fontSize={30}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="timeline">
                {paymentDetails.payment_type === "qris" && (
                  <h1>QRIS Payment</h1>
                )}
                {paymentDetails.payment_type !== "qris" &&
                  paymentDetails.va_numbers &&
                  paymentDetails.va_numbers.length > 0 && (
                    <h1>{paymentDetails.va_numbers[0].bank}</h1>
                  )}
                {!paymentDetails.qris && paymentDetails.va_numbers && (
                  <div className="nomor-virtual">
                    <div className="left-virtual">
                      <p>Nomor Virtual Account</p>
                      <h2>{paymentDetails.va_numbers[0].va_number}</h2>
                    </div>
                    <div className="icon-salin">
                      <p
                        onClick={() =>
                          copyToClipboard(
                            paymentDetails.va_numbers[0].va_number
                          )
                        }
                      >
                        Salin
                      </p>
                      <CgCopy fontSize={20} />
                    </div>
                  </div>
                )}
                <div className="total-pembayaran-produk">
                  <div className="left-virtual">
                    <p>Total Pembayaran</p>
                    <h2>Rp {formatPrice(paymentDetails.gross_amount)}</h2>
                  </div>
                  <div
                    onClick={() =>
                      copyToClipboard(
                        `Rp ${formatPrice(paymentDetails.gross_amount)}`
                      )
                    }
                    className="icon-salin"
                  >
                    <p>Salin</p>
                    <CgCopy fontSize={20} />
                  </div>
                </div>
                <div
                  className="line-top-modal-content"
                  style={{ margin: "50px 0" }}
                >
                  <div className="line-cara-pembayaran"></div>
                </div>
                <SimpleAccordion />
              </div>
            </div>
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      )}
      {showPopup && (
        <div className="cancel-popup">
          <p>Batalkan Transaksi</p>
          <BsTrash3 />
        </div>
      )}
      <Snackbar
        open={succesCopy}
        autoHideDuration={3000}
        onClose={() => setSuccesCopy(false)}
        className="custom-success-alert"
      >
        <MuiAlert
          onClose={() => setSuccesCopy(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Berhasil disalin
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Terima kasih sudah memberi ulasan untuk produk ini
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccesOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccesOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Barang sudah diselesaikan
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={succesAddCart}
        autoHideDuration={3000}
        onClose={() => setSuccesAddcart(false)}
      >
        <MuiAlert
          onClose={() => setSuccesAddcart(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Barang sudah ditambahkan ke keranjang
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
          Kirim ulasan gagal, silahkan coba lagi
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAddCart}
        autoHideDuration={3000}
        onClose={() => setErrorAddCart(false)}
      >
        <MuiAlert
          onClose={() => setErrorAddCart(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Barang gagal ditambahkan ke keranjang
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Riwayat;
