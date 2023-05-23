import React from "react";
import Navbar from "../component/navbar/navbar";
import Sidebarprofile from "../component/sidebar/sidebarprofile";
import Footer from "../component/footer/footer";
import Biodata from "./biodata";
import Alamat from "./alamat";
import Riwayat from "./riwayat";
import { Route, Routes } from "react-router-dom";
   

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="parent">
        <Sidebarprofile />
        <div className="route">
          <Routes>
            <Route path="/biodata" element={<Biodata />} />
            <Route path="/riwayat" element={<Riwayat />} />
            <Route path="/alamat" element={<Alamat />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
