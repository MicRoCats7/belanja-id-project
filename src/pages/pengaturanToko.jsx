import React from "react";
import "../style/pengaturantoko.css";
import { BsShop } from "react-icons/bs";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import gambartoko from "../assets/image/imgToko.svg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "axios";
import apiurl from "../utils/apiurl";

function PengaturanToko() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [editMode, setEditMode] = useState(false);
  const mergedOpeningHours = [];
  const [openingHours, setOpeningHours] = useState([
    { days: [1], openingHour: "08:00", closingHour: "17:00" },
    { days: [2], openingHour: "09:00", closingHour: "18:00" },
    { days: [3], openingHour: "10:00", closingHour: "15:00" },
    { days: [4], openingHour: "10:00", closingHour: "15:00" },
    { days: [5], openingHour: "10:00", closingHour: "15:00" },
    { days: [6], openingHour: "10:00", closingHour: "15:00" },
    { days: [7], openingHour: "10:00", closingHour: "15:00" },
  ]);
  const [editingOpeningHours, setEditingOpeningHours] = useState([]);
  const tabRef = useRef(null);
  const [cities, setCities] = useState([]);

  useEffect(
    () => {
      fetchCitiesByProvince(22);
      calculateUnderlineStyle();
      if (editMode) {
        setEditingOpeningHours([...openingHours]);
      }
    },
    [activeTab],
    [editMode]
  );

  const fetchCitiesByProvince = async (provinceId) => {
    try {
      const response = await axios.get(
        apiurl() + `cities?province_id=${provinceId}`
      );
      const data = response.data;
      setCities(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEditModeToggle = () => {
    setEditingOpeningHours([...openingHours]);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  // Mencetak hasil gabungan jam operasional
  mergedOpeningHours.forEach((entry) => {
    const days = entry.days.join("-");
    console.log(`${days}: ${entry.openingHour} - ${entry.closingHour}`);
  });

  const handleOpeningHourChange = (event, entryIndex) => {
    const value = event.target.value;
    setEditingOpeningHours((prevHours) => {
      const updatedHours = [...prevHours];
      updatedHours[entryIndex].openingHour = value;
      return updatedHours;
    });
  };
  const handleSaveHours = () => {
    setOpeningHours([...editingOpeningHours]);
    setEditMode(false);
  };

  const formatDays = (days) => {
    const dayNames = [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
      "Minggu",
    ];
    const formattedDays = days.map((day) => dayNames[day - 1]);
    return formattedDays.join("-");
  };

  const handleClosingHourChange = (event, entryIndex) => {
    const value = event.target.value;
    setEditingOpeningHours((prevHours) => {
      const updatedHours = [...prevHours];
      updatedHours[entryIndex].closingHour = value;
      return updatedHours;
    });
  };

  return (
    <div className="pengaturan-toko">
      <div className="nama-toko">
        <BsShop />
        <h3>Microsport</h3>
      </div>
      <div className="box-pengaturan">
        <div className="tab-navigation" ref={tabRef}>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => handleTabClick("reviews")}
            data-tab="reviews"
          >
            Informasi
          </button>
          <button
            className={activeTab === "ratings" ? "active" : ""}
            onClick={() => handleTabClick("ratings")}
            data-tab="ratings"
          >
            Jadwal Operasional Toko
          </button>
          <button
            className={activeTab === "pengiriman" ? "active" : ""}
            onClick={() => handleTabClick("pengiriman")}
            data-tab="pengiriman"
          >
            Pengiriman
          </button>
          <div className="tab-indicator" style={underlineStyle}></div>
        </div>
        <div className="tab-content">
          {activeTab === "reviews" && (
            <div className="pengaturan-tab">
              <div className="info-tokomu">
                <div className="tokomu">
                  <h1>Informasi Toko</h1>
                  <div className="info-nama-toko">
                    <h2>Nama Toko</h2>
                    <p>MicroSport</p>
                    <h2>Domain Toko</h2>
                    <p>www.belanja.id/microsport</p>
                    <div className="btn-ubah-info">
                      <button>Ubah</button>
                    </div>
                  </div>
                </div>
                <div className="deskripsi-tokomu">
                  <h2>Deskripsi Toko</h2>
                  <div className="text-deskripsi-toko">
                    <textarea
                      name=""
                      id=""
                      placeholder="Deskripsikan tokomu..."
                    ></textarea>
                    <div className="btn-simpan-toko">
                      <button>Simpan</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="underline-info-toko"></div>
              <div className="gambar-toko">
                <h2>Gambar Toko</h2>
                <div className="ubah-gambar-toko">
                  <div className="image-toko">
                    <img src={gambartoko} alt="" />
                  </div>
                  <div className="info-button-gambar">
                    <p>
                      Ukuran optimal 300 x 300 piksel dengan Besar file:
                      Maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file
                      yang diperbolehkan: JPG, JPEG, PNG
                    </p>
                    <button>Pilih Foto</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "ratings" && (
            <div className="pengaturan-tab">
              <div className="jadwal-operasional">
                <h1>Jadwal Operasional Toko</h1>
                <p>
                  Atur jadwal operasional toko agar kamu bisa lebih efisien
                  memproses pesanan dan memberikan layanan terbaik ke pembeli.
                </p>
                <div className="jadwal-hari">
                  <div className="title-jadwal">
                    <div className="icon-jam">
                      <AiOutlineClockCircle />
                    </div>
                    <div className="text-jam">
                      <h3>Atur Jam Operasional Toko</h3>
                      <p>
                        Di sini kamu bisa mengatur jadwal tokomu beroperasi
                        secara rutin setiap minggunya.
                      </p>
                    </div>
                  </div>
                  <div className="underline-jadwal"></div>
                  {editMode ? null : (
                    <div className="btn-ubah">
                      <button
                        className="btn-ubah-toko"
                        onClick={handleEditModeToggle}
                      >
                        Ubah
                        <HiOutlinePencil />
                      </button>
                    </div>
                  )}
                  {editMode ? (
                    <div className="container-hari">
                      {openingHours.map((entry, entryIndex) => (
                        <div key={entryIndex} className="hari-operasional">
                          <div className="hari">
                            <span>{formatDays(entry.days)}</span>
                            <Tooltip
                              title="Saat ingin mengganti jam operasional tolong klik icon jam"
                              placement="right"
                              color="warning"
                            >
                              <InfoOutlinedIcon fontSize="13px" />
                            </Tooltip>
                          </div>
                          <div className="jam-operasional-edit">
                            <label>
                              Buka:
                              <input
                                type="time"
                                value={
                                  editingOpeningHours[entryIndex].openingHour
                                }
                                onChange={(event) =>
                                  handleOpeningHourChange(event, entryIndex)
                                }
                                name="time"
                              />
                            </label>
                            <label>
                              Tutup:
                              <input
                                type="time"
                                value={
                                  editingOpeningHours[entryIndex].closingHour
                                }
                                onChange={(event) =>
                                  handleClosingHourChange(event, entryIndex)
                                }
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="container-hari">
                      {openingHours.map((entry, entryIndex) => (
                        <div key={entryIndex} className="hari-operasional">
                          <div className="hari">
                            <span>{formatDays(entry.days)}</span>
                          </div>
                          <div className="jam-operasional">
                            <span>
                              {entry.openingHour} - {entry.closingHour}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {editMode ? (
                    <div className="edit-mode-actions">
                      <button
                        className="btn-simpan-toko"
                        onClick={handleSaveHours}
                      >
                        Simpan
                      </button>
                      <button
                        className="btn-batal-toko"
                        onClick={handleCancelEdit}
                      >
                        Batal
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          {activeTab === "pengiriman" && (
            <div className="pengaturan-tab">
              <div className="main-pengiriman">
                <div className="container-asal-pengiriman">
                  <h1>Asal Pengiriman</h1>
                  <div className="box-pilih-kota">
                    <p>Kota atau Kecamatan</p>
                    <div className="pilih-kota">
                      <select name="" id="">
                        <option value="">Pilih Kota</option>
                        {/* Map the 'cities' state to generate options in the dropdown */}
                        {cities.map((city) => (
                          <option key={city.city_id}>{city.city_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="container-pilih-pengiriman"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PengaturanToko;
