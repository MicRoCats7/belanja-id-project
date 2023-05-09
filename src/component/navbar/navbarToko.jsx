import React from "react";
import IconNotif from "../../assets/icon/notif.svg";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import { Link } from "react-router-dom";
import "../../style/navbarToko.css";

function NavbarToko() {
  return (
    <div className="navbarToko">
      <div className="container-navbarToko">
        <div className="navbar-logo">
          <img src={logoBelanjaID} alt="logo belanja.id" />
        </div>
        <div className="listNavbarToko">
          <div className="search-toko">
            <input type="text" placeholder="Cari Produk " />
            <button type="submit">Search</button>
          </div>
          <div className="icon-navbarToko">
            <img src={IconNotif} alt="icon notif" />
          </div>
          <div className="line-toko"></div>
          <div className="login-daftar">
            <Link to="/login">
              <button class="btn-login">Masuk</button>
            </Link>
            <Link to="/register">
              <button class="daftar">Daftar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarToko;
