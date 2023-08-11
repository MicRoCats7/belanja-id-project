import React, { useState } from "react";
import "../../style/pesananToko.css";
import { CiClock2, CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import token from "../../utils/token";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import LoadingPesananToko from "../loader/LoadingPesananToko";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function DiProses() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        console.log("Data transaksi dari server:", response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
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
      })
      .catch((error) => {
        console.error("Error accepting transaction:", error);
        handleErrorAlertOpen();
      });
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Return the formatted date string
    return `${day} - ${month} - ${year} ${hours}:${minutes}`;
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
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
      </div>
      <div className="item-pesanan-baru">
        {isLoading ? (
          <LoadingPesananToko />
        ) : riwayatTransaksi.length === 0 ? (
          <h1 className="no-pesanan-text">Tidak ada pesanan.</h1>
        ) : (
          riwayatTransaksi
            .filter(searchFilter)
            .filter((transaksi) => transaksi.status === "PROCESSED")
            .map(
              (transaksi) =>
                !itemsToRemove.includes(transaksi.id) && (
                  <div className="box-item-pesanan-baru" key={transaksi.id}>
                    <div className="top-item-box-pesanan-baru">
                      <div className="text-top-item-box-pesanan-baru">
                        <div className="point-left"></div>
                        <span style={{ color: "#EF233C" }}>{transaksi.id}</span>
                        <h1>/{transaksi.user?.name}/</h1>
                        <CiClock2 />
                        <h1>{formatDate(transaksi.created_at)}</h1>
                      </div>
                      <div className="label-top-item-box-pesanan-baru">
                        <h1>{transaksi.status}</h1>
                      </div>
                    </div>
                    <div className="product-item-pesanan-baru">
                      <div className="detail-product-pesanan-baru">
                        <div className="img-pesanan-baru">
                          <img src={transaksi.product.picturePath} alt="" />
                        </div>
                        <div className="text-detail-pesanan-baru">
                          <h2>{transaksi.product.name}</h2>
                          <p>Rp {formatPrice(transaksi.product.price)}</p>
                        </div>
                      </div>
                      <div className="detail-alamat-pesanan-baru">
                        <h2>Alamat</h2>
                        {transaksi.user?.user_addresses?.map(
                          (address, index) => (
                            <p key={index}>
                              {address.receiver_name} - ({address.phone_number}){" "}
                              <br />
                              {address.address_one} - {address.regencies} -{" "}
                              {address.provinces} - {address.zip_code}
                            </p>
                          )
                        )}
                      </div>
                      <div className="detail-kurir-pesanan-baru">
                        <h2>Kurir</h2>
                        <p>{transaksi.courier?.title}</p>
                      </div>
                    </div>
                    <div className="btn-total-pesanan-baru">
                      <h2>{formatPrice(transaksi.total)}</h2>
                      <div className="con-btn-pesanan-baru">
                        <button
                          className="btn-terima-pesanan-baru"
                          onClick={() => {
                            acceptTransaction(transaksi.id);
                            // Tambahkan id item ke daftar itemsToRemove
                            setItemsToRemove((prevItems) => [
                              ...prevItems,
                              transaksi.id,
                            ]);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Kirim Pesanan
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )
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

export default DiProses;
