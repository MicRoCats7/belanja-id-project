import React from "react";
import "../style/detailpesanan.css";
import Navbar from "../component/navbar/navbar";
import { UilTrashAlt } from "@iconscout/react-unicons";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import imgProduct from "../assets/image/imgProduk.svg";

function Detailpesanan() {
  return (
    <div>
      <Navbar />
      <div className="container-detailpesanan">
        <div className="detailpesanan">
          <div className="detailpesanan-title">
            <h1>Detail Pesanan</h1>
          </div>
          <div className="detailpesanan-content">
            <div className="produkpesanan">
              <div className="produkpesananimage">
                <img src={imgProduct} alt="produk1" border="0" />
              </div>
              <div className="detailproduk">
                <h4>Baju Polo, Pria lengan pendek polos original Ukuran L</h4>
                <h3>Rp 35.000</h3>
                <div className="detailproduk-bottom">
                  <h4>
                    Kuantitas : <span>1</span>
                  </h4>
                  <div className="btn-delete">
                    <button>
                      <UilTrashAlt color="#fff" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-detailpesanan"></div>
            <div className="total">
              <div className="hargatotal">
                <h4>Harga</h4>
                <h4>Ongkos Kirim</h4>
                <h4>Total Harga</h4>
              </div>
              <div className="totalharga">
                <h4>:Rp. 35.000</h4>
                <h4>:Rp. 0</h4>
                <h4>:Rp. 0</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-pelanggan">
          <div className="detail-pelanggan-title">
            <h1>Detail Pelanggan</h1>
          </div>
          <div className="detail-pelanggan-content">
            <div className="form-pelanggan">
              <div className="form-top">
                <div className="nama-lengkap">
                  <h4>Nama Lengkap</h4>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="input-nama"
                  />
                </div>
                <div className="nomor-handphone">
                  <h4>No. HP / WhatsApp</h4>
                  <input
                    type="text"
                    placeholder="No. HP / WhatsApp"
                    className="input-nomorHp"
                  />
                </div>
              </div>
              <h4>Provinsi</h4>
              <select className="input-provinsi-kota" selected>
                <option value="provinsi">-- Pilih Provinsi --</option>
                <option value="provinsi">Nusa Tenggara Barat (NTB)</option>
                <option value="provinsi">Jawa Tengah</option>
                <option value="provinsi">DKI Jakarta</option>
              </select>
              <h4>Kota/Kabupaten</h4>
              <select className="input-provinsi-kota">
                <option value="provinsi">-- Pilih Kota --</option>
                <option value="provinsi">Bima - (Kabupaten)</option>
                <option value="provinsi">BIma - (Kota)</option>
                <option value="provinsi">Dompu - (Kabupaten)</option>
                <option value="provinsi">Lombok Barat - (Kabupaten)</option>
                <option value="provinsi">Lombok Tengah - (Kabupaten)</option>
                <option value="provinsi">Lombok Timur - (Kabupaten)</option>
                <option value="provinsi">Lombok Utara - (Kabupaten)</option>
                <option value="provinsi">Mataram - (Kota)</option>
                <option value="provinsi">Sumbawa - (Kabupaten)</option>
                <option value="provinsi">Sumbawa Barat - (Kabupaten)</option>
              </select>
            </div>
            <div className="kurir-pengiriman">
              <FormControl>
                <p>Kurir Pengiriman</p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="jne"
                    control={<Radio />}
                    label="JNE"
                  />
                  <FormControlLabel
                    value="tiki"
                    control={<Radio />}
                    label="TIKI"
                  />
                  <FormControlLabel
                    value="pos"
                    control={<Radio />}
                    label="POS"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="line-detail-pelanggan"></div>
            <div className="layanan-kurir">
              <FormControl>
                <p>Layanan Kurir</p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="oke"
                    control={<Radio />}
                    label="OKE - RP 48.000"
                  />
                  <FormControlLabel
                    value="regular"
                    control={<Radio />}
                    label="REGULAR - RP 56.000"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="alamat-pengiriman">
              <h4>Alamat Pengiriman</h4>
              <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
                placeholder="Tulis Alamat Lengkap kamu.."
              ></textarea>
            </div>
            <div className="btn-belanja">
              <button>Belanja Sekarang</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailpesanan;
