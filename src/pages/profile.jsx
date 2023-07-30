import React, { useEffect } from "react";
import "../style/profile.css";
import Navbar from "../component/navbar/navbar";
import Sidebarprofile from "../component/sidebar/sidebarprofile";
import Footer from "../component/footer/footer";
import Biodata from "./biodata";
import Alamat from "./alamat";
import Riwayat from "./riwayat";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="main-profile-info">
      <div className="nav-profil">
        <Navbar />
        <div className="parent">
          <Sidebarprofile />
          <Routes>
            <Route path="/biodata" element={<Biodata />} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/alamat/:id" element={<Alamat />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
