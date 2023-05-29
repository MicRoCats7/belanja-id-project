import React from "react";
import "../style/profile.css";
import Navbar from "../component/navbar/navbar";
import Sidebarprofile from "../component/sidebar/sidebarprofile";
import Footer from "../component/footer/footer";
import Biodata from "./biodata";
import Alamat from "./alamat";
import Riwayat from "./riwayat";
import { Route, Routes } from "react-router-dom";
   

function Profile() {
  return (
    <div className="nav-profil">
      <Navbar />
        <div className="parent">
        <Sidebarprofile />
          <Routes>
            <Route path="/biodata" element={<Biodata />} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/alamat" element={<Alamat />} />
          </Routes>
        </div>
      <Footer />
    </div>
  );
}

export default Profile;
