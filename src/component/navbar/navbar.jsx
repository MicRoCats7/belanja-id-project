import React, { useEffect, useRef, useState } from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconKeranjang from "../../assets/icon/keranjang.svg";
import iconChat from "../../assets/icon/iconChat.svg";
import IconNotif from "../../assets/icon/notif.svg";
import { Link, useNavigate } from "react-router-dom";
import Icontoko from "../../assets/icon/tokoo.svg";
import apiurl from "../../utils/apiurl";
import axios from "axios";


function Navbar() {
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
      .catch((error) => {})
  }

  useEffect(() => {
    getprofile();
  }, []);

  async function logout() {
    await axios({
      method: "post",
      url: apiurl() + "logout",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log (response)
      navigate('/login')
    })
    .catch((error) => {
      })
  }


  return (
    <div className="navbar">
      <div className="container-navbar">
        <div className="navbar-logo">
          <Link to={"/"}>
            <img src={logoBelanjaID} alt="logo belanja.id" />
          </Link>
        </div>
        <div className="listNavbar">
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
          <div className="search">
            <input type="text" placeholder="Cari Produk " />
            <button type="submit">Search</button>
          </div>
          <p>Event</p>
          <div className="icon-navbar">
            <img src={iconChat} alt="icon chat" />
            <img src={iconKeranjang} alt="icon keranjang" />
            <img src={IconNotif} alt="icon notif" />
          </div>
          <div className="line"></div>
          {token ? 
      <div className="drop-profile">
      <img className="photo-profile" src={profile.profile_photo_url} alt="" /> 
     <div className="menu-dropdown">
     <div className="user-info">
     <img className="photo-profile" src={profile.profile_photo_url} alt="" /> 
     <h3 className="nama-user">{profile.name}</h3> 
     </div>
     <hr />
       <a href="/" className="sub-menu-link">Profile</a>
       <a href="Whislist">Whislist</a>
       <button className="btn-logout" onClick={logout}>Logout</button>
     </div>
     </div>

          :
              <div className="login-daftar">
            <Link to="/login">
              <button class="btn-login">Masuk</button>
            </Link>
            <Link to="/register">
              <button class="daftar">Daftar</button>
            </Link>
          </div> 
          }
         
        </div>
      </div>
    </div>
  );
}

export default Navbar;
