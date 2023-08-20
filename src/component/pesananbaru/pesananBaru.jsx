import React, { useState } from "react";
import "../../style/pesananToko.css";
import { CiClock2, CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import token from "../../utils/token";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import LoadingPesananToko from "../loader/LoadingPesananToko";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { MdOutlineClose, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { IoMdCopy } from "react-icons/io";
import fotobarang from "../../assets/image/fotobarangg.svg";

function PesananBaru() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [riwayatTransaksiPerId, setRiwayatPerId] = useState([]);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [Transaction, setSelectedTransaction] = useState(null);

  const handleOpenDetailTransaksi = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDetailTransaksi = () => {
    setSelectedTransaction(null);
  };

  useEffect(() => {
    getRiwayatTransaksi();
  }, []);

  function getRiwayatTransaksi() {
    axios
      .get(apiurl() + "transactions?store_id=" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        setRiwayatTransaksi(response.data.data);
        setSelectedTransaction(response.data[0]);
        console.log("Data transaksi dari server:", response.data.data);
      })
      .catch((error) => console.error(error));
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
    return (
      transaksi.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaksi.product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function acceptTransaction(transactionId) {
    axios
      .get(apiurl() + `transactions/shipped/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        // Manajemen status atau tampilan jika permintaan sukses
        console.log("Transaction accepted:", response.data);
        handleSuccessAlertOpen();
        setRiwayatTransaksi((prevTransaksi) =>
          prevTransaksi.filter((transaksi) => transaksi.id !== transactionId)
        );
      })
      .catch((error) => {
        console.error("Error accepting transaction:", error);
        handleErrorAlertOpen();
      });
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  const calculateTotalBelanja = (transaction) => {
    const totalHargaBarang = transaction.total;
    const biayaOngkir = transaction.shipping_cost;

    const totalBelanja = totalHargaBarang + biayaOngkir;
    return totalBelanja;
  };

  return (
    <div className="container-pesanan-baru">
      <div className="filter-pesanan-baru">
        <div className="search-pesanan-baru">
          <CiSearch />
          <input
            type="text"
            placeholder="Cari Produk atau Nama Pelanggan"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
      <div className="item-pesanan-baru">
        {riwayatTransaksi.length > 0 ? (
          riwayatTransaksi
            .filter(filterByStatus)
            .filter(searchFilter)
            .map((transaksi) => (
              <div className="box-item-pesanan-baru" key={transaksi.id}>
                <div className="top-item-box-pesanan-baru">
                  <div className="text-top-item-box-pesanan-baru">
                    <div className="point-left"></div>
                    <span style={{ color: "#EF233C" }}>{transaksi.id}</span>
                    <h1>/{transaksi.user?.name}/</h1>
                    <CiClock2 />
                    <h1>
                      {new Date(transaksi.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </h1>
                  </div>
                  <div className="label-top-item-box-pesanan-baru">
                    <h1>{transaksi.status}</h1>
                  </div>
                </div>
                <div className="product-item-pesanan-baru">
                  <div className="detail-product-pesanan-baru">
                    <Link
                      to={"/detailproduct/" + transaksi.product.id}
                      className="detail-product-pesanan-baru"
                    >
                      <div className="img-pesanan-baru">
                        <img src={transaksi.product.picturePath} alt="" />
                      </div>
                      <div className="text-detail-pesanan-baru">
                        <h2>{transaksi.product.name}</h2>
                        <p>Rp {formatPrice(transaksi.product.price)}</p>
                      </div>
                    </Link>
                  </div>
                  <div className="detail-alamat-pesanan-baru">
                    <h2>Alamat</h2>
                    {transaksi.user?.user_addresses?.map((address, index) => (
                      <p key={index}>
                        {address.receiver_name} - ({address.phone_number}){" "}
                        <br />
                        {address.address_one} - {address.regencies} -{" "}
                        {address.provinces} - {address.zip_code}
                      </p>
                    ))}
                  </div>
                  <div className="detail-kurir-pesanan-baru">
                    <h2>Kurir</h2>
                    <p>{transaksi.courier?.title}</p>
                  </div>
                </div>
                <div className="btn-total-pesanan-baru">
                  <h2>{formatPrice(transaksi.total)}</h2>
                  <div className="opsi-belilagi-lihatdetail">
                    {transaksi.status === "PROCESSED" && (
                      <button
                        className="btn-terima-pesanan-baru"
                        onClick={() => acceptTransaction(transaksi.id)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Kirim Pesanan
                      </button>
                    )}
                    {transaksi.status === "SHIPPED" && (
                      <>
                        <button className="btn-terima-pesanan-baru">
                          Lihat Status
                        </button>
                      </>
                    )}
                    {transaksi.status === "FINISHED" && (
                      <>
                        <button
                          className="btn-terima-pesanan-baru"
                          onClick={() => handleOpenDetailTransaksi(transaksi)}
                        >
                          Detail Transaksi
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <LoadingPesananToko />
        )}
        {Transaction && (
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
                  <span>{Transaction.id}</span>
                </div>
                <div className="tanggal-pembelian">
                  <h2>Tanggal Pembelian</h2>
                  <h2>
                    {new Date(Transaction.created_at).toLocaleDateString(
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
                  <h2>Sumbawa Official</h2>
                  <MdOutlineKeyboardArrowRight />
                </div>
              </div>
              <div className="content-info-pesanan-produk">
                <div className="produk-pesanan-info">
                  <div className="img-produk">
                    {Transaction.product && (
                      <img src={Transaction.product.picturePath} alt="" />
                    )}
                  </div>
                  <div className="info-produk">
                    {Transaction.product && <h2>{Transaction.product.name}</h2>}
                    {Transaction.product && (
                      <h2 style={{ color: "#727272" }}>
                        {Transaction.quantity}x Rp{" "}
                        {formatPrice(Transaction.product.price)}
                      </h2>
                    )}
                  </div>
                </div>
                <div className="line-content-info-pesanan-produk"></div>
                <div className="produk-pesanan-info-total">
                  <div className="total-produk-pesanan-info">
                    <h1>Total Harga</h1>
                    <h1 style={{ color: "#000" }}>
                      Rp. {formatPrice(Transaction.total)}
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
                        : {Transaction.courier?.title}
                      </p>
                    </div>
                    <div className="tanggal-pembelian-user">
                      <h2>No.Resi</h2>
                      <p>:</p>
                      <span>
                        122302439297319{" "}
                        <IoMdCopy style={{ cursor: "pointer" }} />
                      </span>
                    </div>
                    <div className="tanggal-pembelian-user">
                      <h2>Alamat</h2>
                      <p>:</p>
                      {Transaction.user_address && (
                        <span className="alamat-user-pembelian">
                          {Transaction.user_address.receiver_name} <br />{" "}
                          <p>
                            {Transaction.user_address.phone_number}{" "}
                            {Transaction.user_address.address_one} -{" "}
                            {Transaction.user_address.regencies} -{" "}
                            {Transaction.user_address.provinces} -{" "}
                            {Transaction.user_address.zip_code}
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
                      <h2>Total Harga ({Transaction.quantity} barang)</h2>
                      <span>Rp {formatPrice(Transaction.total)}</span>
                    </div>
                    <div className="no-invoice">
                      {Transaction.product && (
                        <h2>
                          Total Ongkos Kirim ({Transaction.product.weight} kg)
                        </h2>
                      )}
                      <span>Rp {formatPrice(Transaction.shipping_cost)}</span>
                    </div>
                    <div className="tanggal-pembelian">
                      <h2 style={{ fontSize: "20px", color: "#000" }}>
                        Total Belanja
                      </h2>
                      <h2 style={{ fontSize: "20px", color: "#EF233C" }}>
                        Rp {formatPrice(calculateTotalBelanja(Transaction))}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
          Kirim Pesanan Berhasil
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
          Gagal Mengirim Pesanan
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default PesananBaru;
