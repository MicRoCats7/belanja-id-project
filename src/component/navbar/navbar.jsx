import React, { useEffect, useState } from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconKeranjang from "../../assets/icon/keranjang.svg";
import iconChat from "../../assets/icon/iconChat.svg";
import IconNotif from "../../assets/icon/notif.svg";
import { Link } from "react-router-dom";
import Icontoko from "../../assets/icon/tokoo.svg";
import apiurl from "../../utils/apiurl";
import axios from "axios";

function Navbar() {
  const [ profile, setProfile ] = useState({});
  const token = localStorage.getItem("token");
  async function getprofile(){
    await axios({
      method: "get",
      url: apiurl() + 'user',
      headers: { 
        "Authorization":'Bearer '+ token,
      },
    })
      .then((response) => {
        console.log (response)
        setProfile(response.data.data)
      })
      .catch((error) => {
      })
  }
  useEffect(()=>{
    getprofile()
  },[])


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
          {
            token ?
            <div className="myshop">
            <div className="circle">
            <img src={Icontoko} alt="toko-img" />
            </div>
            <h3 className="text-toko">{profile.name}</h3>
            <img className="photo-profile" src={profile.profile_photo_url} alt="" />
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
