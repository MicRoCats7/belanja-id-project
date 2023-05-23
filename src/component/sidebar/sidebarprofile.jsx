import React from "react";
import "../../style/sidebarprofile.css";
import Photoprofile from "../../assets/icon/photo profile.svg";
import IconProfil from "../../assets/icon/profil saya.svg";
import IconRiwayat from "../../assets/icon/riwayat pesanan.svg";
import IconAlamat from "../../assets/icon/icon alamat.svg";
import { Link } from "react-router-dom";


function Sidebarprofile() {
    return (
      <div className="parent">
        <div className="container-profile">
          <div className="user-prof">
          <img src={Photoprofile} alt="" />
            <h3 className="namaa">ilyas</h3>
            </div>
            <hr />
          <div className="menu-profile">
          <div className="profil">
          <img src={IconProfil} alt="" />
            <Link to={"biodata"}><h3 className="text-profile">Profile saya</h3></Link>
          </div>
          <div className="riwayat">
          <img src={IconRiwayat} alt="" />
           <Link to={"riwayat"}> <h3 className="text-profile">Riwayat Pesanan</h3></Link>
          </div>
          <div className="alamat">
          <img src={IconAlamat} alt="" />
            <Link to={"alamat"}><h3 className="text-profile">Alamat</h3></Link>
          </div>
          </div>
         </div>
      </div>
    )
  }
  
  export default Sidebarprofile;