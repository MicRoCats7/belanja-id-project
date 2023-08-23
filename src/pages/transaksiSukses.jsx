import React from "react";
import Footer from "../component/footer/footer";
import "../style/transaksiSucces.css";
import iconSukses from "../assets/image/done.png";
import { Link } from "react-router-dom";

function TransaksiSukses() {
  return (
    <>
      <div className="container-transaksi-succes">
        <div className="transaksi-success">
          <img src={iconSukses} alt="" />
          <h1>Pembayaran Kamu Berhasil</h1>
          <div className="btn-transaksi-succes">
            <Link to={"/"}>
              <button className="btn-backshop">Kembali Belanja</button>
            </Link>
            <Link to={"/profile/riwayat"}>
              <button className="btn-keriwayat">Lihat Pesanan</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TransaksiSukses;
