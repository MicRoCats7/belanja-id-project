import React, { useState, useRef, useEffect } from "react";
import "../../style/product.css";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import apiurl from "../../utils/apiurl";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import token from "../../utils/token";

function formatPrice(price) {
  const numberFormat = new Intl.NumberFormat("id-ID");
  return numberFormat.format(Number(price));
}

function Product(props) {
  const [showWishlist, setShowWishlist] = useState(false);
  const formattedPrice = formatPrice(props.price);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const handleClickWishlist = (event) => {
    event.stopPropagation();
    setShowWishlist(!showWishlist);
  };

  return (
    <div className="produk" loading="lazy">
      <div className="card-produkPilihan">
        <Link to={"/detailproduct/" + props.id}>
          <div className="card-link">
            <div className="img-pro">
              <img src={props.url} alt="produk" loading="lazy" />
            </div>
            <div className="content-porduk">
              <div className="nama-produk">
                <h3>{props.name}</h3>
              </div>
              <div className="harga-produk">
                <h3>Rp {formattedPrice}</h3>
                <div className="location">
                  <MdLocationOn color="#00A99D" />
                  <p>{props.location}</p>
                </div>
              </div>
              <div className="rating-pro">
                <BsFillStarFill color="#EDB902" />
                <h3>{props.rating}</h3>
                <h3>({props.ulasan} Terjual)</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        variant="filled"
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Produk ditambahkan ke wishlist
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        variant="filled"
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Gagal menambahkan produk ke keranjang
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Product;
