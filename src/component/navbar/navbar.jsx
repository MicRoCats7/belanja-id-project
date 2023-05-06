import React from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconKeranjang from "../../assets/icon/keranjang.svg";
import iconChat from "../../assets/icon/iconChat.svg";
import IconNotif from "../../assets/icon/notif.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container-navbar">
        <div className="navbar-logo">
          <img src={logoBelanjaID} alt="logo belanja.id" />
        </div>
        <div className="listNavbar">
          <div className="search">
            <input type="text" placeholder="Cari Produk " />
            <button type="submit">Search</button>
          </div>
          <p>Event</p>
          <div className="kategori">
            <button class="dropbtn">Kategori</button>
            <div className="dropdown-content">
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
              <a href="#">Kategori 12</a>
            </div>
          </div>
          <div className="icon-navbar">
            <img src={iconChat} alt="icon chat" />
            <img src={iconKeranjang} alt="icon keranjang" />
            <img src={IconNotif} alt="icon notif" />
          </div>
          <div className="line"></div>
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

export default Navbar;
