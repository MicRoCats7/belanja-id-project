import React, { useState } from "react";
import "../../style/pesananToko.css";
import { CiClock2, CiSearch } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useEffect } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import token from "../../utils/token";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";

function PesananBaru() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

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
              <option value="SUCCESS">Success</option>
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
                    <div className="point-three">
                      <BiDotsHorizontalRounded />
                    </div>
                    <button
                      className="btn-terima-pesanan-baru"
                      style={{ cursor: "pointer" }}
                    >
                      Terima Pesanan
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default PesananBaru;
