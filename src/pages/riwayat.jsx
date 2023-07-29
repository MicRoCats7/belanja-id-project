import React from "react";
import "../style/riwayat.css";
import DropdownProduk from "../component/dropdown/dropdownproduk";
import BagIcon from "../assets/icon/bag.svg";
import icontoko from "../assets/icon/ilusToko.svg";
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
import { IconName, IoMdCopy } from "react-icons/io";

function Riwayat() {
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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
                <p>{transaksi.id}</p>
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
                <button
                  className="btn-detail-transaksi"
                  onClick={() => handleDetailTransaksi(transaksi)}
                >
                  Detail Transaksi
                </button>
                <button className="btn-belilagi">Beli Lagi</button>
              </div>
            </div>
          ))}
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
