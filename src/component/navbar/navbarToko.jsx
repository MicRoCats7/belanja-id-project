import React from "react";
import IconNotif from "../../assets/icon/notif.svg";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import { Link } from "react-router-dom";
import "../../style/navbarToko.css";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import { useEffect } from "react";
import { useState } from "react";

function NavbarToko() {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");
  async function getprofile() {
    await axios({
      method: "get",
      url: apiurl() + "user",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log(response);
        setProfile(response.data.data);
      })
      .catch((error) => {});
  }
  useEffect(() => {
    getprofile();
  }, []);
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
          {token ? (
            <div className="myshop">
              <img
                className="photo-profile"
                src={profile.profile_photo_url}
                alt=""
              />
              <h3 className="text-toko">{profile.name}</h3>
            </div>
          ) : (
            <div className="login-daftar">
              <Link to="/login">
                <button class="btn-login">Masuk</button>
              </Link>
              <Link to="/register">
                <button class="daftar">Daftar</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarToko;
