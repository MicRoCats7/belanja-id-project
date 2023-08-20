import React from "react";
import "../style/riwayat.css";
import BagIcon from "../assets/icon/bag.svg";
import fotobarang from "../assets/image/fotobarangg.svg";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useState } from "react";
import token from "../utils/token";
import { useEffect } from "react";
import { formatPrice } from "../utils/helpers";
import LoadingSkeletonRiwayat from "../component/loader/LoadingSkeletonRiwayat";
import { MdOutlineClose, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { IoMdCopy } from "react-icons/io";
import { Box, Rating, Snackbar, Typography } from "@mui/material";
import { BiImageAdd } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";

function Riwayat() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatusData, setSelectedStatusData] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [value, setValue] = React.useState(2);
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [previewImg1, setPreviewImg1] = useState(null);
  const [previewImg2, setPreviewImg2] = useState(null);
  const [previewImg3, setPreviewImg3] = useState(null);
  const [previewImg4, setPreviewImg4] = useState(null);
  const [selectedReviewPhotos, setSelectedReviewPhotos] = useState({
    image_path: null,
    image_path_2: null,
    image_path_3: null,
  });
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [reviewText, setReviewText] = useState(""); // State untuk teks ulasan
  const [ratingValue, setRatingValue] = useState(0); // State untuk nilai peringkat
  const [reviewPhotos, setReviewPhotos] = useState([]); // State untuk foto ulasan
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successOpen, setSuccesOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const dummyStatusData = {
    id: 123,
    timeline: [
      {
        id: 1,
        timestamp: "2023-08-08T10:00:00Z",
        description: "Pesanan diterima dan sedang diproses.",
      },
      {
        id: 2,
        timestamp: "2023-08-08T11:30:00Z",
        description: "Pesanan sedang dalam proses pengiriman.",
      },
      {
        id: 3,
        timestamp: "2023-08-08T14:45:00Z",
        description: "Pesanan berhasil dikirimkan.",
      },
      {
        id: 4,
        timestamp: "2023-08-08T15:30:00Z",
        description:
          "Pesanan diterima dan sedang diproses kembali karena ada perubahan pesanan.",
      },
      {
        id: 5,
        timestamp: "2023-08-08T16:00:00Z",
        description: "Pesanan sedang dalam proses perubahan pesanan.",
      },
      {
        id: 6,
        timestamp: "2023-08-08T17:15:00Z",
        description: "Perubahan pesanan berhasil disetujui.",
      },
      {
        id: 7,
        timestamp: "2023-08-08T18:30:00Z",
        description:
          "Pesanan berhasil dikirimkan setelah perubahan pesanan selesai.",
      },
    ],
  };

  useEffect(() => {
    getRiwayatTransaksi();
  }, []);

  const handleDetailTransaksi = (transaction) => {
    setSelectedTransaction(transaction);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetailTransaksi = () => {
    setSelectedTransaction(null);
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
    if (reviewText && ratingValue > 0) {
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
          formData.append("image", selectedReviewPhotos.image_path);
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

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  function isProductReviewedInLatestTransaction(productID) {
    if (!selectedTransaction || !selectedTransaction.product) {
      return false;
    }

    const latestTransactionProductID = selectedTransaction.product.id;
    return (
      reviewedProducts.includes(productID) &&
      latestTransactionProductID === productID
    );
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
          {riwayatTransaksi
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
                <div className="info-detail-total" key={transaksi.product?.id}>
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
                    !isProductReviewedInLatestTransaction(
                      transaksi.product?.id
                    ) && (
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
                    <button
                      className="btn-belilagi"
                      onClick={() => handleDetailTransaksi(transaksi)}
                    >
                      Lihat Detail
                    </button>
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
                      <button className="btn-belilagi">Beli Lagi</button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
      {selectedStatusData && showStatusPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="top-popup-content">
              <h2>Status Barang</h2>
              <MdOutlineClose onClick={handleCloseStatusPopup} fontSize={30} />
            </div>
            <div className="timeline">
              {dummyStatusData.timeline.map((statusItem) => (
                <div key={statusItem.id} className="timeline-item">
                  <div className="timeline-item-content">
                    <p>
                      {new Date(statusItem.timestamp).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p>{statusItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showReviewPopup && (
        <div className="popup-container-review">
          <div className="popup-content-review">
            <div className="rating-review-user">
              <div className="text-review">
                <p>Silahkan Berikan Ulasan Untuk produk ini</p>
              </div>
              <Box
                sx={{
                  "& > legend": { mt: 4 },
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  style={{ fontSize: "70px" }}
                />
              </Box>
              <div className="add-img-review">
                <div className="addImg">
                  <label
                    htmlFor="input-file"
                    className={`file-label ${
                      selectedReviewPhotos.image_path ? "no-border" : ""
                    }`}
                  >
                    {previewImg1 ? (
                      <img
                        src={previewImg1}
                        width={150}
                        height={150}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    ) : (
                      <>
                        <BiImageAdd color="#606060" size={60} />
                        <p>Foto Ulasan</p>
                      </>
                    )}
                  </label>
                  <input
                    id="input-file"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="input-field"
                    onChange={handleImageChange1}
                    hidden
                  />
                  {previewImg1 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2
                          onClick={() => removeSelectedPhoto("image_path")}
                        />
                      </span>
                    </div>
                  )}
                </div>
                <div className="addImg">
                  <label
                    htmlFor="input-file-2"
                    className={`file-label ${
                      selectedReviewPhotos.image_path_2 ? "no-border" : ""
                    }`}
                  >
                    {previewImg2 ? (
                      <img
                        src={previewImg2}
                        width={150}
                        height={150}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    ) : (
                      <>
                        <BiImageAdd color="#606060" size={60} />
                        <p>Foto Ulasan</p>
                      </>
                    )}
                  </label>
                  <input
                    id="input-file-2"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="input-field"
                    onChange={handleImageChange2}
                    hidden
                  />
                  {previewImg2 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2
                          onClick={() => removeSelectedPhoto("image_path_2")}
                        />
                      </span>
                    </div>
                  )}
                </div>
                <div className="addImg">
                  <label
                    htmlFor="input-file-3"
                    className={`file-label ${
                      selectedReviewPhotos.image_path_3 ? "no-border" : ""
                    }`}
                  >
                    {previewImg3 ? (
                      <img
                        src={previewImg3}
                        width={150}
                        height={150}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    ) : (
                      <>
                        <BiImageAdd color="#606060" size={60} />
                        <p>Foto Ulasan</p>
                      </>
                    )}
                  </label>
                  <input
                    id="input-file-3"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="input-field"
                    onChange={handleImageChange3}
                    hidden
                  />
                  {previewImg3 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2
                          onClick={() => removeSelectedPhoto("image_path_3")}
                        />
                      </span>
                    </div>
                  )}
                </div>
                <div className="addImg">
                  <label
                    htmlFor="input-file-4"
                    className={`file-label ${
                      selectedReviewPhotos.image_path_4 ? "no-border" : ""
                    }`}
                  >
                    {previewImg4 ? (
                      <img
                        src={previewImg4}
                        width={150}
                        height={150}
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                    ) : (
                      <>
                        <BiImageAdd color="#606060" size={60} />
                        <p>Foto Ulasan</p>
                      </>
                    )}
                  </label>
                  <input
                    id="input-file-4"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="input-field"
                    onChange={handleImageChange4}
                    hidden
                  />
                  {previewImg4 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2
                          onClick={() => removeSelectedPhoto("image_path_4")}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="input-review-user">
                <textarea
                  name="review"
                  id="review"
                  cols="30"
                  rows="10"
                  placeholder="Tulis Review Anda"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>
              <div className="label-oto-review">
                <div className="label-review">
                  <h1>Luar Biasa</h1>
                </div>
                <div className="label-review">
                  <h1>Kualitas Unggul</h1>
                </div>
                <div className="label-review">
                  <h1>Worth it</h1>
                </div>
                <div className="label-review">
                  <h1>Design Elegan</h1>
                </div>
              </div>
              <div className="btn-kirim-review">
                <button
                  className="btn-batal-ulasan"
                  onClick={handleCloseReviewPopup}
                >
                  Batal
                </button>
                <button
                  className="btn-kirim-ulasan"
                  onClick={handleSubmitReview}
                  disabled={submittingReview}
                >
                  {submittingReview ? (
                    <span className="loading-spinner-review" />
                  ) : (
                    "Kirim"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTransaction && (
        <div className="modal-container-detail-transaksi">
          <div className="modal-content-detail-transaksi">
            <div className="top-modal-content">
              <h2>Detail Transaksi</h2>
              <MdOutlineClose onClick={handleCloseDetailTransaksi} />
            </div>
            <div className="line-top-modal-content"></div>
            <div className="title-status">
              <h1>Selesai</h1>
            </div>
            <div className="content-info-pesanan-invoice">
              <div className="no-invoice">
                <h2>No.Invoice</h2>
                <span>{selectedTransaction.id}</span>
              </div>
              <div className="tanggal-pembelian">
                <h2>Tanggal Pembelian</h2>
                <h2>
                  {new Date(selectedTransaction.created_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </h2>
              </div>
            </div>
            <div className="title-detail-riwayat">
              <h1>Detail Produk</h1>
              <div className="btn-riawayat-toko">
                <BsShop />
                {selectedTransaction.store && (
                  <h2>{selectedTransaction.store.name}</h2>
                )}
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <div className="content-info-pesanan-produk">
              <div className="produk-pesanan-info">
                <div className="img-produk">
                  {selectedTransaction.product && (
                    <img src={selectedTransaction.product.picturePath} alt="" />
                  )}
                </div>
                <div className="info-produk">
                  {selectedTransaction.product && (
                    <h2>{selectedTransaction.product.name}</h2>
                  )}
                  {selectedTransaction.product && (
                    <h2 style={{ color: "#727272" }}>
                      {selectedTransaction.quantity}x Rp{" "}
                      {formatPrice(selectedTransaction.product.price)}
                    </h2>
                  )}
                </div>
              </div>
              <div className="line-content-info-pesanan-produk"></div>
              <div className="produk-pesanan-info-total">
                <div className="total-produk-pesanan-info">
                  <h1>Total Harga</h1>
                  <h1 style={{ color: "#000" }}>
                    Rp. {formatPrice(selectedTransaction.total)}
                  </h1>
                </div>
                <button className="btn-beli-lagi-info">Beli Lagi</button>
              </div>
            </div>
            <div className="info-pengiriman-rincian-biaya">
              <div className="info-pengiriman-riwayat">
                <div className="title-status">
                  <h1>Info Pengiriman</h1>
                </div>
                <div className="content-info-pesanan-invoice">
                  <div className="info-pengiriman-user">
                    <h2>Kurir</h2>
                    <p style={{ marginLeft: "19px" }}>
                      : {selectedTransaction.courier?.title}
                    </p>
                  </div>
                  <div className="tanggal-pembelian-user">
                    <h2>No.Resi</h2>
                    <p>:</p>
                    <span>
                      122302439297319 <IoMdCopy style={{ cursor: "pointer" }} />
                    </span>
                  </div>
                  <div className="tanggal-pembelian-user">
                    <h2>Alamat</h2>
                    <p>:</p>
                    {selectedTransaction.user_address && (
                      <span className="alamat-user-pembelian">
                        {selectedTransaction.user_address.receiver_name} <br />{" "}
                        <p>
                          {selectedTransaction.user_address.phone_number}{" "}
                          {selectedTransaction.user_address.address_one} -{" "}
                          {selectedTransaction.user_address.regencies} -{" "}
                          {selectedTransaction.user_address.provinces} -{" "}
                          {selectedTransaction.user_address.zip_code}
                        </p>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="rincian-biaya-riwayat">
                <div className="title-status">
                  <h1>Rincian Biaya</h1>
                </div>
                <div
                  className="content-info-pesanan-invoice"
                  style={{ padding: "26px 15px" }}
                >
                  <div className="no-invoice">
                    <h2>Metode Pembayaran</h2>
                    <span>Midtrans</span>
                  </div>
                  <div className="no-invoice">
                    <h2>Jumlah barang</h2>
                    <span>({selectedTransaction.quantity} barang)</span>
                  </div>
                  <div className="no-invoice">
                    {selectedTransaction.product && <h2>Harga Barang</h2>}
                    <span>
                      Rp {formatPrice(selectedTransaction.product.price)}
                    </span>
                  </div>
                  <div className="no-invoice">
                    {selectedTransaction.product && (
                      <h2>
                        Total Ongkos Kirim ({selectedTransaction.product.weight}{" "}
                        kg)
                      </h2>
                    )}
                    <span>
                      Rp {formatPrice(selectedTransaction.shipping_cost)}
                    </span>
                  </div>
                  <div className="tanggal-pembelian">
                    <h2 style={{ fontSize: "20px", color: "#000" }}>
                      Total Belanja
                    </h2>
                    <h2 style={{ fontSize: "20px", color: "#EF233C" }}>
                      Rp {formatPrice(selectedTransaction.total)}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
    </div>
  );
}

export default Riwayat;
