import React from "react";
import "../style/pengaturantoko.css";
import { BsShop } from "react-icons/bs";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import gambartoko from "../assets/image/imgToko.svg";
import { AiOutlineClockCircle } from "react-icons/ai";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { HiOutlinePencil } from "react-icons/hi";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ModalAddJadwal from "../component/modal/modalAddJadwal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function PengaturanToko() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [toko, setToko] = useState([]);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [jadwal, setJadwal] = useState([]); // Ensure the initial state is an empty array
  const { id } = useParams();
  const [inputText, setInputText] = useState("");
  const [description, storeDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const mergedOpeningHours = [];
  const [editingOpeningHours, setEditingOpeningHours] = useState([...jadwal]);
  const tabRef = useRef(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  useEffect(() => {
    calculateUnderlineStyle();
  }, [activeTab]); // Hanya gunakan activeTab sebagai dependency

  useEffect(() => {
    if (editMode) {
      setEditingOpeningHours([...jadwal]); // Gunakan data jadwal saat editMode aktif
    }
  }, [editMode]);

  useEffect(() => {
    // When the jadwal state changes, update the editingOpeningHours state
    setEditingOpeningHours([...jadwal]);
  }, [jadwal]);

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
    setEditingOpeningHours([...jadwal]);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  // Mencetak hasil gabungan jam operasional
  mergedOpeningHours.forEach((entry) => {
    const day = entry.day.join("-");
    console.log(`${day}: ${entry.open_time} - ${entry.close_time}`);
  });

  const dayIdMap = {
    Senin: 1,
    Selasa: 2,
    Rabu: 3,
    Kamis: 4,
    Jumat: 5,
    Sabtu: 6,
    Minggu: 7,
  };

  // const handleOpeningHourChange = (event, entryIndex) => {
  //   const value = event.target.value;
  //   setEditingOpeningHours((prevHours) => {
  //     const updatedHours = [...prevHours];
  //     updatedHours[entryIndex].openingHour = value;
  //     return updatedHours;
  //   });
  // };

  const handleOpeningHourChange = (event, entryIndex) => {
    const { name, value } = event.target;
    setEditingOpeningHours((prevHours) => {
      const updatedHours = [...prevHours];
      updatedHours[entryIndex][name] = value;
      return updatedHours;
    });
  };

  const handleClosingHourChange = (event, entryIndex) => {
    const { name, value } = event.target;
    setEditingOpeningHours((prevHours) => {
      const updatedHours = [...prevHours];
      updatedHours[entryIndex][name] = value;
      return updatedHours;
    });
  };

  const handleSaveHours = () => {
    setEditMode(false);
    setJadwal([...editingOpeningHours]);
    updateJadwalOperasional();
  };

  function getJadwalOperasional() {
    axios
      .get(apiurl() + "store/all-operating-hours", {
        params: {
          store_id: id,
        },
      })
      .then((response) => {
        console.log("Data Jadwal dari server:", response.data.data[0]);
        const data = response.data.data[0].operating_hours;
        if (data && data.length > 0) {
          setJadwal(data);
          setEditingOpeningHours(data); // Perbarui juga editingOpeningHours
        } else {
          setJadwal([]); // Set to empty array if there's no data
          setEditingOpeningHours([]); // Perbarui juga editingOpeningHours jika tidak ada data
        }
      })
      .catch((error) => console.error(error));
  }

  function updateJadwalOperasional() {
    editingOpeningHours.forEach((entry) => {
      const dayName = entry.day;
      const dayId = dayIdMap[dayName];

      if (!dayId) {
        console.error(`Invalid day name: ${dayName}`);
        return; // Skip the current entry if the day name is invalid
      }

      const dataToUpdate = {
        store_id: id,
        day_id: dayId,
        open_time: entry.open_time,
        close_time: entry.close_time,
      };

      axios
        .put(
          apiurl() + `store/${id}/update-operating-hours/${dayId}`,
          dataToUpdate,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          handleSuccessAlertOpen();
          console.log("Update response:", response.data);
          getJadwalOperasional();
        })
        .catch((error) => console.error(error));
    });
  }

  function EditInformasiToko() {
    const formData = new FormData();
    formData.append("name", inputText);
    formData.append("description", description);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    axios
      .post(apiurl() + `stores/${id}`, formData, config)
      .then((response) => {
        handleSuccessAlertOpen();
        console.log("Informasi toko berhasil di ubah:", response.data);
        // getJadwalOperasional();
      })
      .catch((error) => console.error(error));
  }

  const getToko = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(apiurl() + "user/store", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setToko(response.data.data);
        console.log("Data berhasil diambil", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };
  useEffect(() => {
    getJadwalOperasional();
  }, [isProfileUpdated]);

  useEffect(() => {
    getToko();
  }, []);

  useEffect(() => {
    if (toko && toko.length > 0) {
      setInputText(toko[0].name); // Set the Nama Toko input value
      storeDescription(toko[0].description); // Set the Deskripsi Toko input value
    }
  }, [toko]);

  console.log(jadwal);

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
                    <div>
                      <input
                        type="text"
                        placeholder="Ubah Nama Toko Anda"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                    </div>
                    {/* <h2>Domain Toko</h2>
                    <p>www.belanja.id/microsport</p> */}
                    <div className="btn-ubah-info">
                      <button onClick={EditInformasiToko}>Simpan</button>
                    </div>
                  </div>
                </div>
                <div className="deskripsi-tokomu">
                  <h2>Deskripsi Toko</h2>
                  <div className="text-deskripsi-toko">
                    <textarea
                      name=""
                      id=""
                      value={description}
                      onChange={(e) => storeDescription(e.target.value)}
                      placeholder=" Masukkan Deskripsikan tokomu..."
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
                  {jadwal.length === 0 ? (
                    <div>
                      <p>Jadwal Anda Kosong</p>
                      <ModalAddJadwal
                        tambahJadwalOperasional={() =>
                          setIsProfileUpdated(!isProfileUpdated)
                        }
                      />
                    </div>
                  ) : (
                    <>
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
                          <ModalAddJadwal />
                        </div>
                      )}
                      {editMode ? (
                        <div className="container-hari">
                          {editingOpeningHours.map((entry, entryIndex) => (
                            <div key={entryIndex} className="hari-operasional">
                              <div className="hari">
                                <span>{entry.day}</span>
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
                                    value={entry.open_time}
                                    onChange={(event) =>
                                      handleOpeningHourChange(event, entryIndex)
                                    }
                                    name="open_time"
                                  />
                                </label>
                                <label>
                                  Tutup:
                                  <input
                                    type="time"
                                    value={entry.close_time}
                                    onChange={(event) =>
                                      handleClosingHourChange(event, entryIndex)
                                    }
                                    name="close_time"
                                  />
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="container-hari">
                          {jadwal.map((entry, entryIndex) => (
                            <div key={entryIndex} className="hari-operasional">
                              <div className="hari">
                                <span>{entry.day}</span>
                                <Tooltip
                                  title="Saat ingin mengganti jam operasional tolong klik icon jam"
                                  placement="right"
                                  color="warning"
                                >
                                  <InfoOutlinedIcon fontSize="13px" />
                                </Tooltip>
                              </div>
                              <div className="jam-operasional">
                                <span>
                                  {entry.open_time.substring(0, 5)} -{" "}
                                  {entry.close_time.substring(0, 5)}
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
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "pengiriman" && (
            <div className="pengaturan-tab">
              <h1>Pengiriman</h1>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Alhamdulillah Jadwal Berhasil Diubah
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Maaf, terjadi kesalahan. Gagal Mengubah Jadwal.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default PengaturanToko;
