import React from "react";
import "../style/riwayat.css";
import DropdownProduk from "../component/dropdown/dropdownproduk";
import BagIcon from "../assets/icon/bag.svg";
import icontoko from "../assets/icon/ilusToko.svg";
import fotobarang from "../assets/image/fotobarangg.svg";
import ImageUploader from "../component/dropdown/testing";

function Riwayat() {
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
      <div className="form-riwayat">
        <h3>Daftar Transaksi</h3>
        <div className="box-riwayat">
          <div className="info-pesanan">
            <img src={BagIcon} alt="" />
            <p className="text-belanja">Belanja</p>
            <div className="data-verifikasi">Berhasil</div>
            <p>4 April 2023</p>
            <p>11219NPM6712</p>
          </div>
          <div className="toko-barang">
            <img src={icontoko} alt="" />
            <div className="info-detail-toko">
              <div className="nama-toko">Sumbawa Official</div>
            </div>
          </div>
          <div className="info-detail-total">
            <div className="wrap">
              <div className="images">
                <img src={fotobarang} alt="" />
              </div>
              <div className="info-detail-toko">
                <div className="nama-barang">
                  Jual Madu Asli Sumbawa Per Botol
                </div>
                <div className="total-barang">1 barang</div>
              </div>
            </div>
            <div className="total-riwayat">
              <div className="txt-belanja">Total Belanja</div>
              <div className="harga-belanja">Rp. 10.000</div>
            </div>
          </div>
          <div className="opsi-belilagi-lihatdetail">
            <button class="btn-detail-transaksi">Detail Transaksi</button>
            <button class="btn-belilagi">Beli Lagi</button>
          </div>
        </div>
        <div className="box-riwayat">
          <div className="info-pesanan">
            <img src={BagIcon} alt="" />
            <p className="text-belanja">Belanja</p>
            <div className="data-verifikasi">Berhasil</div>
            <p>4 April 2023</p>
            <p>11219NPM6712</p>
          </div>
          <div className="toko-barang">
            <img src={icontoko} alt="" />
            <div className="info-detail-toko">
              <div className="nama-toko">Sumbawa Official</div>
            </div>
          </div>
          <div className="info-detail-total">
            <div className="wrap">
              <div className="images">
                <img src={fotobarang} alt="" />
              </div>
              <div className="info-detail-toko">
                <div className="nama-barang">
                  Jual Madu Asli Sumbawa Per Botol
                </div>
                <div className="total-barang">1 barang</div>
              </div>
            </div>
            <div className="total-riwayat">
              <div className="txt-belanja">Total Belanja</div>
              <div className="harga-belanja">Rp. 10.000</div>
            </div>
          </div>
          <div className="opsi-belilagi-lihatdetail">
            <button class="btn-detail-transaksi">Detail Transaksi</button>
            <button class="btn-belilagi">Beli Lagi</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Riwayat;
