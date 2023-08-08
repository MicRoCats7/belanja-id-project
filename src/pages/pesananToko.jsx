import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "../style/pesananToko.css";
import PesananBaru from "../component/pesananbaru/pesananBaru";

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
            Pesanan Baru
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
            className={activeTab === "ditolak" ? "active" : ""}
            onClick={() => handleTabClick("ditolak")}
            data-tab="ditolak"
          >
            Ditolak
          </button>
          <button
            className={activeTab === "menunggu-diambil" ? "active" : ""}
            onClick={() => handleTabClick("menunggu-diambil")}
            data-tab="menunggu-diambil"
          >
            Menunggu Diambil
          </button>
          <div className="tab-indicator" style={underlineStyle}></div>
        </div>
        <div className="tab-content">
          {activeTab === "pesananbaru" && (
            <div className="pengaturan-tab">
              <PesananBaru />
            </div>
          )}
          {activeTab === "diproses" && (
            <div className="pengaturan-tab">
              <h1>Pesanan Diproses</h1>
            </div>
          )}
          {activeTab === "dikirim" && (
            <div className="pengaturan-tab">
              <h1>Pesanan Dikirim</h1>
            </div>
          )}
          {activeTab === "ditolak" && (
            <div className="pengaturan-tab">
              <h1>Pesanan dibatalkan</h1>
            </div>
          )}
          {activeTab === "menunggu-diambil" && (
            <div className="pengaturan-tab">
              <h1>Pesanan Menunggu Diambil</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PesananToko;
