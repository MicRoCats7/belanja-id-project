import React, { useEffect, useState } from "react";
import "../../style/sidebarprofile.css";
import Photoprofile from "../../assets/icon/photo profile.svg";
import { Link, NavLink } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { TfiLocationPin } from "react-icons/tfi";
import axios from "axios";
import apiurl from "../../utils/apiurl";

function Sidebarprofile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(apiurl() + "user", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setProfile(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="parent">
      <div className="container-profile">
        <div className="user-prof">
          <img
            className="photo-profile"
            src={profile.user?.profile_photo_path}
            alt=""
          />
          <h3 className="nama-user-profile">
            {profile.user && profile.user.name.split(" ")[0]}
          </h3>
        </div>
        <hr />
        <div className="menu-profile">
          <NavLink to={"biodata"} activeclassName="active" className="linkk">
            <div className="profil">
              <BsPerson />
              <h3 className="text-profile">Profile saya</h3>
            </div>
          </NavLink>
          <NavLink to={"riwayat"} activeclassName="active" className="linkk">
            <div className="riwayat" activeclassName="active">
              <BiTask />
              <h3 className="text-profile">Riwayat Pesanan</h3>
            </div>
          </NavLink>
          <NavLink to={"alamat"} activeclassName="active" className="linkk">
            <div className="alamat" activeclassName="active">
              <TfiLocationPin />
              <h3 className="text-profile">Alamat</h3>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebarprofile;
