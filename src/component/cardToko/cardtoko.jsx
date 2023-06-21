import React from "react";
import "./cardtoko.css";
import imgToko from "../../assets/image/imgToko.svg";
import imgpro from "../../assets/image/imgProduk.svg";
import { Link } from "react-router-dom";

function Cardtoko() {
  return (
    <div className="card-toko">
      <Link to={"/detailtoko"}>
        <div className="top-card-toko">
          <div className="img-name-toko">
            <img src={imgToko} alt="imageToko" />
            <div className="name-toko-card">
              <h1>Microsport</h1>
              <p>Kab.Kudus</p>
            </div>
          </div>
          <button>Lihat Toko</button>
        </div>
      </Link>
      <div className="bottom-card-toko">
        <h3>Produk yang di jual</h3>
        <div className="list-produk-toko">
          {[1, 2, 3, 4].map((index) => (
            <div className="produk-toko" key={index}>
              <img src={imgpro} alt="imagetoko" />
              <div className="name-price-produk">
                <p>Sepatu Li-Ning</p>
                <p>Rp 10.000.000</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cardtoko;
