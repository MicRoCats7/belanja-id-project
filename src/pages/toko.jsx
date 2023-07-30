import { React, useEffect } from "react";
import NavbarToko from "../component/navbar/navbarToko";
import Sidebar from "../component/sidebar/sidebar";
import "../style/toko.css";
import { Route, Routes } from "react-router-dom";
import HomeToko from "./homeToko";
import ChatToko from "./chatToko";
import DaftarProduk from "./daftarProduk";
import PesananToko from "./pesananToko";
import UlasanPembeli from "./ulasanPembeli";
import PengaturanToko from "./pengaturanToko";

function Toko() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="toko">
      <NavbarToko />
      <div className="toko-content">
        <Sidebar />
        <Routes>
          <Route path="/hometoko" element={<HomeToko />} />
          <Route path="/chat" element={<ChatToko />} />
          <Route path="/daftarproduk/:id" element={<DaftarProduk />} />
          <Route path="/pesanantoko" element={<PesananToko />} />
          <Route path="/ulasanpembeli" element={<UlasanPembeli />} />
          <Route path="/pengaturantoko" element={<PengaturanToko />} />
        </Routes>
      </div>
    </div>
  );
}

export default Toko;
