import React from "react";
import Navbar from "../component/navbar/navbar";
import { BsGear } from "react-icons/bs";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import imgProduk from "../assets/image/imgProduk.svg";
import "../style/notifikasi.css";

function Notifikasi() {
  const [activeTab, setActiveTab] = useState("reviews");
  const tabRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    calculateUnderlineStyle();
  });

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
    <div>
      <Navbar />
      <div className="container-notifikasi" style={{ marginTop: "8%" }}>
        <div className="container-notifikasi-main">
          <div className="container-title-pengaturan">
            <h1>Notifikasi</h1>
            <BsGear fontSize={25} cursor={"pointer"} />
          </div>
          <div className="container-notifikasi-box">
            <div className="tab-navigation" ref={tabRef}>
              <button
                className={activeTab === "reviews" ? "active" : ""}
                onClick={() => handleTabClick("reviews")}
                data-tab="reviews"
              >
                Semua (2)
              </button>
              <button
                className={activeTab === "ratings" ? "active" : ""}
                onClick={() => handleTabClick("ratings")}
                data-tab="ratings"
              >
                Pesanan
              </button>
              <button
                className={activeTab === "pengiriman" ? "active" : ""}
                onClick={() => handleTabClick("pengiriman")}
                data-tab="pengiriman"
              >
                Lainnya
              </button>
              <div className="tab-indicator" style={underlineStyle}></div>
            </div>
            <div className="container-content-notifikasi">
              {activeTab === "reviews" && (
                <div className="pengaturan-tab">
                  <div className="card-notifikasi">
                    <div className="card-notifikasi-left">
                      <img src={imgProduk} alt="" />
                    </div>
                    <div className="card-notifikasi-right">
                      <h1>Produk Anda telah diulas</h1>
                      <p>
                        Baju Polo, Pria lengan pendek polos original sudah ada
                        lagi.Yuk,checkout sekarang sebelum kehabisan!
                      </p>
                      <span>1 hari yang lalu, 14.15</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "ratings" && (
                <div className="pengaturan-tab">
                  <h1>Jadwal Operasional Toko</h1>
                </div>
              )}
              {activeTab === "pengiriman" && (
                <div className="pengaturan-tab">
                  <h1>Pengiriman</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifikasi;
