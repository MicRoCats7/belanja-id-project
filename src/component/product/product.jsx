import React from "react";
import produkImg from "../../assets/image/imgProduk.svg";
import locatian from "../../assets/icon/location.svg";
import star from "../../assets/icon/start.svg";
import wishlist from "../../assets/icon/wishlist.svg";
import "../../style/product.css";

function Product(props) {
  return (
    <div className="card-produkPilihan">
      <img src={produkImg} alt="" />
      <div className="nama-produk">
        <h3>{props.name}</h3>
      </div>
      <div className="harga-produk">
        <div className="location">
          <img src={locatian} alt="" />
          <p>Jakarta</p>
        </div>
        <h3>{props.price}</h3>
      </div>
      <div className="rating">
        <img src={star} alt="" />
        <h3>{props.rating}</h3>
        <h3>{props.ulasan}</h3>
      </div>
      <div className="wishlist">
        <img src={wishlist} alt="" />
      </div>
    </div>
  );
}

export default Product;
