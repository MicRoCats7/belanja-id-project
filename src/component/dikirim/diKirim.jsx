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
import fotoPengiriman from "../../assets/image/courier.png";
import ModalStatusBarang from "../modal/modalStatusBarang";

function DiKirim() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatusData, setSelectedStatusData] = useState(null);
  const [showStatusPopup, setShowStatusPopup] = useState(false);

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
      .catch((error) => console.error(error) && setIsLoading(false));
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

  function searchFilter(transaksi) {
    if (searchQuery === "") {
      return true;
    }
    return (
      transaksi.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaksi.product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="no-pesanan-text">
            <img src={fotoPengiriman} alt="" />
            <h3>Belum ada pesanan yang dikirim</h3>
          </div>
        ) : (
          <>
            {riwayatTransaksi
              .filter(searchFilter)
              .filter((transaksi) => transaksi.status === "SHIPPED")
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
                    <div className="con-btn-pesanan-baru">
                      <button
                        className="btn-terima-pesanan-baru"
                        onClick={() => handleShowStatusPopup(transaksi)}
                        style={{ cursor: "pointer" }}
                      >
                        Lihat Status Pesanan
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {riwayatTransaksi
              .filter(searchFilter)
              .filter((transaksi) => transaksi.status === "SHIPPED").length ===
              0 && (
              <div className="no-pesanan-text">
                <img src={fotoPengiriman} alt="" />
                <h3>Tidak ada pesanan yang cocok dengan pencarian</h3>
              </div>
            )}
          </>
        )}
      </div>
      {selectedStatusData && showStatusPopup && (
        <ModalStatusBarang
          selectedStatusData={selectedStatusData}
          onClose={handleCloseStatusPopup}
        />
      )}
    </div>
  );
}

export default DiKirim;
