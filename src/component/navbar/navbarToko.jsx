import React from "react";
import IconNotif from "../../assets/icon/notif.svg";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import { Link, useNavigate } from "react-router-dom";
import "../../style/navbarToko.css";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import { useEffect } from "react";
import { useState } from "react";

function NavbarToko() {
  const navigate = useNavigate();
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

  async function logout() {
    await axios({
      method: "post",
      url: apiurl() + "logout",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        console.log(response);
        navigate("/login");
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
          {/* <div className="search-toko">
            <input type="text" placeholder="Cari Produk " />
            <button type="submit">Search</button>
          </div> */}
          {/* <div className="icon-navbarToko">
            <img src={IconNotif} alt="icon notif" />
          </div> */}
          {/* <div className="line-toko"></div> */}
        </div>
      </div>
    </div>
  );
}

export default NavbarToko;
