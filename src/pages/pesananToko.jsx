import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "../style/pesananToko.css";
import PesananBaru from "../component/pesananbaru/pesananBaru";
import SudahDibayar from "../component/sudah-dibayar/sudahDibayar";
import DiProses from "../component/diproses/diProses";
import DiKirim from "../component/dikirim/diKirim";
import DiTolak from "../component/ditolak/diTolak";
import Selesai from "../component/selesai/selesai";

function PesananToko() {
  const tabRef = useRef(null);
  const [activeTab, setActiveTab] = useState("pesananbaru");
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    calculateUnderlineStyle();
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const calculateUnderlineStyle = () => {
    const activeTabElement = tabRef.current.querySelector(
      `button[data-tab="${activeTab}"]`
    );
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setUnderlineStyle({
        width: offsetWidth,
        transform: `translateX(${offsetLeft}px)`,
      });
    }
  };

  return (
    <div className="container-pesanan-toko">
      <div className="text-container-pesanan-toko">
        <h1>Pesanan</h1>
      </div>
      <div className="box-pengaturan">
        <div className="tab-navigation" ref={tabRef}>
          <button
            className={activeTab === "pesananbaru" ? "active" : ""}
            onClick={() => handleTabClick("pesananbaru")}
            data-tab="pesananbaru"
          >
            Semua Pesanan
          </button>
          <button
            className={activeTab === "dibayar" ? "active" : ""}
            onClick={() => handleTabClick("dibayar")}
            data-tab="dibayar"
          >
            Sudah Dibayar
          </button>
          <button
            className={activeTab === "diproses" ? "active" : ""}
            onClick={() => handleTabClick("diproses")}
            data-tab="diproses"
          >
            Diproses
          </button>
          <button
            className={activeTab === "dikirim" ? "active" : ""}
            onClick={() => handleTabClick("dikirim")}
            data-tab="dikirim"
          >
            Dikirim
          </button>
          <button
            className={activeTab === "selesai" ? "active" : ""}
            onClick={() => handleTabClick("selesai")}
            data-tab="selesai"
          >
            Selesai
          </button>
          <button
            className={activeTab === "ditolak" ? "active" : ""}
            onClick={() => handleTabClick("ditolak")}
            data-tab="ditolak"
          >
            Ditolak
          </button>
          <div className="tab-indicator" style={underlineStyle}></div>
        </div>
        <div className="tab-content">
          {activeTab === "pesananbaru" && (
            <div className="pengaturan-tab">
              <PesananBaru />
            </div>
          )}
          {activeTab === "dibayar" && (
            <div className="pengaturan-tab">
              <SudahDibayar />
            </div>
          )}
          {activeTab === "diproses" && (
            <div className="pengaturan-tab">
              <DiProses />
            </div>
          )}
          {activeTab === "dikirim" && (
            <div className="pengaturan-tab">
              <DiKirim />
            </div>
          )}
          {activeTab === "selesai" && (
            <div className="pengaturan-tab">
              <Selesai />
            </div>
          )}
          {activeTab === "ditolak" && (
            <div className="pengaturan-tab">
              <DiTolak />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PesananToko;
