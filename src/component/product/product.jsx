import React from "react";
import star from "../../assets/icon/start.svg";
import wishlist from "../../assets/icon/wishlist.svg";
import "../../style/product.css";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";

function Product(props) {
  return (
    <div className="produk">
      <Link to={"/detailproduct/" + props.id}>
        <div className="card-produkPilihan">
          <img src={props.url} alt="" />
          <div className="content-porduk">
            <div className="nama-produk">
              <h3>{props.name}</h3>
            </div>
            <div className="harga-produk">
              <h3>Rp {props.price}</h3>
              <div className="location">
                <MdLocationOn color="#00A99D" />
                <p>{props.location}</p>
              </div>
            </div>
            <div className="rating-pro">
              <BsFillStarFill color="#EDB902" />
              <h3>{props.rating}</h3>
              <h3>({props.ulasan} Ulasan)</h3>
            </div>
            <div className="wishlist">
              <FiMoreHorizontal color="#EF233C" fontSize="23px" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
