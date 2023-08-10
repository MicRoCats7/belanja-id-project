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
import { Box, Rating, Typography } from "@mui/material";
import { BiImageAdd } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";

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
      })
      .catch((error) => {
        console.error("Error accepting transaction:", error);
      });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Return the formatted date string
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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

  const handleSubmitReview = async () => {
    if (reviewText && ratingValue > 0) {
      const reviewData = {
        users_id: localStorage.getItem("user_id"),
        product_id: selectedProductId,
        review: reviewText,
        rate: ratingValue,
      };

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

        handleCloseReviewPopup();
        getRiwayatTransaksi();
      } catch (error) {
        console.error("Error adding review:", error);
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
    }
  };
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
                  <p>{formatDate(transaksi.created_at)}</p>
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
                    <p>{formatDate(statusItem.timestamp)}</p>
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
                  "& > legend": { mt: 2 },
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  style={{ fontSize: "50px" }}
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
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTransaction && (
        <div className="modal-container">
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
                <span>368</span>
              </div>
              <div className="tanggal-pembelian">
                <h2>Tanggal Pembelian</h2>
                <h2>15 Mei 2023, 09:25 WIB</h2>
              </div>
            </div>
            <div className="title-detail-riwayat">
              <h1>Detail Produk</h1>
              <div className="btn-riawayat-toko">
                <BsShop />
                <h2>Sumbawa Official</h2>
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <div className="content-info-pesanan-produk">
              <div className="produk-pesanan-info">
                <div className="img-produk">
                  <img src={fotobarang} alt="" />
                </div>
                <div className="info-produk">
                  <h2>Baju Polo, Pria lengan pendek polos original Ukuran L</h2>
                  <h2 style={{ color: "#727272" }}>2x Rp 35.000</h2>
                </div>
              </div>
              <div className="line-content-info-pesanan-produk"></div>
              <div className="produk-pesanan-info-total">
                <div className="total-produk-pesanan-info">
                  <h1>Total Harga</h1>
                  <h1 style={{ color: "#000" }}>Rp. 35.000</h1>
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
                    <p style={{ marginLeft: "19px" }}>:</p>
                    <span>Anteraja-Reguler</span>
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
                    <span className="alamat-user-pembelian">
                      Amri Iqro <br />{" "}
                      <p>
                        6282128066795 Besito, Kec. Gebog, Kabupaten Kudus, Jawa
                        Tengah [Belanja.id Note: Gang 11 gang buntu] Gebog, Kab.
                        Kudus Jawa Tengah 5933
                      </p>
                    </span>
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
                    <span>BNI Virtual Account</span>
                  </div>
                  <div className="no-invoice">
                    <h2>Total Harga (2 barang)</h2>
                    <span>Rp35.000</span>
                  </div>
                  <div className="no-invoice">
                    <h2>Total Ongkos Kirim (600 gr)</h2>
                    <span>Rp25.000</span>
                  </div>
                  <div className="tanggal-pembelian">
                    <h2 style={{ fontSize: "20px", color: "#000" }}>
                      Total Belanja
                    </h2>
                    <h2 style={{ fontSize: "20px", color: "#EF233C" }}>
                      Rp60.000
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Riwayat;
