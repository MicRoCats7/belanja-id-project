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

function Riwayat() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatusData, setSelectedStatusData] = useState(null);

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

  async function getRiwayatTransaksi() {
    setIsLoading(true);
    try {
      const response = await axios.get(apiurl() + "transactions", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
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
              <option value="SUCCESS">Success</option>
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
                  {transaksi.status === "SUCCESS" && (
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
                      <button className="btn-belilagi">Bantuan</button>
                    </>
                  )}
                  {transaksi.status === "FINISHED" && (
                    <>
                      <button
                        className="btn-belilagi"
                        onClick={() => handleDetailTransaksi(transaksi)}
                      >
                        Detail Transaksi
                      </button>
                      <button className="btn-belilagi">Review</button>
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
              <h2>Status Transaksi</h2>
              <MdOutlineClose onClick={handleCloseStatusPopup} />
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
