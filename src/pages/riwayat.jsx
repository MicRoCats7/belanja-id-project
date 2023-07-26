import React from "react";
import "../style/riwayat.css";
import DropdownProduk from "../component/dropdown/dropdownproduk";
import BagIcon from "../assets/icon/bag.svg";
import icontoko from "../assets/icon/ilusToko.svg";
import fotobarang from "../assets/image/fotobarangg.svg";
import ImageUploader from "../component/dropdown/testing";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useState } from "react";
import token from "../utils/token";
import { useEffect } from "react";
import { formatPrice } from "../utils/helpers";
import LoadingSkeletonRiwayat from "../component/loader/LoadingSkeletonRiwayat";

function Riwayat() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRiwayatTransaksi();
  }, []);

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
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
  return (
    <div className="content">
      <div className="text-histori">
        <h1>Riwayat Pesanan</h1>
      </div>
      <div className="opsi">
        <div className="search-riwayat">
          <input type="text" placeholder="Kamu Lagi nyari Pesanan yg mana? " />
          <button type="submit">Search</button>
        </div>
        <DropdownProduk />
      </div>
      {isLoading ? (
        <LoadingSkeletonRiwayat />
      ) : (
        <div className="form-riwayat">
          <h3>Daftar Transaksi</h3>
          {riwayatTransaksi?.map((transaksi) => (
            <div className="box-riwayat" key={transaksi.id}>
              <div className="info-pesanan">
                <img src={BagIcon} alt="" />
                <p className="text-belanja">Belanja</p>
                <div className="data-verifikasi">{transaksi.status}</div>
                <p>{transaksi.created_at}</p>
                <p>11219NPM6712</p>
              </div>
              <div className="toko-barang">
                <img src={icontoko} alt="" />
                <div className="info-detail-toko">
                  <div className="nama-toko">Sumbawa Official</div>
                </div>
              </div>
              <div className="info-detail-total" key={transaksi.product.id}>
                <div className="wrap">
                  <div className="images">
                    <img src={transaksi.product.picturePath} alt="" />
                  </div>
                  <div className="info-detail-toko">
                    <div className="nama-barang">{transaksi.product.name}</div>
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
                <button className="btn-detail-transaksi">
                  Detail Transaksi
                </button>
                <button className="btn-belilagi">Beli Lagi</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Riwayat;
