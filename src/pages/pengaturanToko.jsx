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
import { Checkbox, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ModalAddJadwal from "../component/modal/modalAddJadwal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import iconkurir from "../assets/icon/pana.svg";
import token from "../utils/token";
import { styled } from "@mui/material/styles";
import LoadingPengiriman from "../component/loader/loadigPengiriman";
import { FiTrash2 } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";

function PengaturanToko() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [toko, setToko] = useState([]);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [jadwal, setJadwal] = useState([]);
  const { id } = useParams();
  const [inputText, setInputText] = useState("");
  const [description, storeDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const mergedOpeningHours = [];
  const [editingOpeningHours, setEditingOpeningHours] = useState([...jadwal]);
  const tabRef = useRef(null);
  const [successAlertOpen1, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [successAlertOpen2, setSuccessAlertOpen2] = useState(false);
  const [errorAlertOpen2, setErrorAlertOpen2] = useState(false);
  const [cities, setCities] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImagePathToko, setSelectedImagePath] = useState("");

  useEffect(() => {
    calculateUnderlineStyle();
  }, [activeTab]);

  useEffect(() => {
    if (editMode) {
      setEditingOpeningHours([...jadwal]);
    }
  }, [editMode]);

  useEffect(() => {
    getCities();
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

  useEffect(() => {
    axios
      .get(
        apiurl() +
          "shipping/cost/1?origin_city_id=209&destination_city_id=209&weight=500",
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setCouriers(response.data.data.delivery_courier);
      })
      .catch((error) => {
        console.error("Error fetching courier data:", error);
      });
  }, []);

  const getCities = () => {
    axios
      .get(apiurl() + "cities?province_id=22") // Ganti 'cities' dengan endpoint API yang sesuai
      .then((response) => {
        setIsLoading(false);
        // Simpan data kota ke dalam state 'cities'
        setCities(response.data.data);
        console.log("Data kota:", response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cities:", error);
      });
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setSelectedImagePath(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
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
          setEditingOpeningHours(data);
        } else {
          setJadwal([]);
          setEditingOpeningHours([]);
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
        handleSuccessAlertInfo();
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
        const productData = response.data.data;
        setPreviewImg(productData.logo);
        storeDescription(productData.description);
        setInputText(productData.name);
        setToko(response.data.data);
        console.log("Data berhasil diambil", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  function AploadFoto() {
    const formData = new FormData();
    formData.append("logo", selectedImagePathToko);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    if (token) {
      axios
        .post(apiurl() + "stores/" + id, formData, config)
        .then((response) => {
          console.log("Berhasil Mengapload logo", response.data);
        })
        .catch((error) => console.error("Gagal mengapload logo", error));
    }
  }
  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  const handleSuccessAlertInfo = () => {
    setSuccessAlertOpen2(true);
  };

  const handleErrorAlertInfo = () => {
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
      setInputText(toko[0].name);
      storeDescription(toko[0].description);
    }
  }, [toko]);

  console.log(jadwal);

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 23,
    height: 23,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    ".Mui-focusVisible &": {
      outline: "2px auto #000",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      outline: "2px auto #EF233C",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#EF233C",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 23,
      height: 23,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#EF233C",
    },
  });

  function BpCheckbox(props) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  return (
    <div className="pengaturan-toko">
      <div className="nama-toko">
        <BsShop />
        <h3>{toko.name}</h3>
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
                  <div className="addImg">
                    <label
                      htmlFor="input-file"
                      className={`file-label ${
                        !selectedImagePathToko ? "no-border" : ""
                      }`}
                    >
                      {previewImg ? (
                        <img
                          src={previewImg}
                          width={150}
                          height={150}
                          alt="Uploaded"
                          className="uploaded-image-toko"
                        />
                      ) : (
                        <>
                          <BiImageAdd color="#606060" size={60} />
                          <p>Pilih Foto Anda</p>
                        </>
                      )}
                    </label>
                    <input
                      id="input-file"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="input-field"
                      onChange={handleImageChange}
                      hidden
                    />
                    {previewImg && (
                      <div className="upload-row">
                        <span className="upload-content">
                          <FiTrash2 onClick={() => setPreviewImg("")} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="info-button-gambar">
                    <p>
                      Ukuran optimal 300 x 300 piksel dengan Besar file:
                      Maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file
                      yang diperbolehkan: JPG, JPEG, PNG
                    </p>
                    <div>
                      <button onClick={AploadFoto}>Simpan</button>
                    </div>
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
              {isLoading ? (
                <LoadingPengiriman />
              ) : (
                <div className="main-pengiriman">
                  <div className="container-asal-pengiriman">
                    <h1>Asal Pengiriman</h1>
                    <div className="box-container-asal-pengiriman">
                      <div className="dropdown-container-pengiriman">
                        <p>Kota atau Kecamatan</p>
                        <select>
                          <option value="">Pilih Kota</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="dropdown-container-pengiriman">
                        <p>Kode Pos</p>
                        <select>
                          <option value="">Pilih Kode Pos</option>
                          {cities.map((postalCode) => (
                            <option key={postalCode.id} value={postalCode.id}>
                              {postalCode.postal_code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="container-pengiriman-kurir">
                    <h1>Silahkan Pilih Pengiriman</h1>
                    <div className="main-layanan-kurir">
                      <div className="layanan-pengiriman-kurir">
                        <h1>Layanan Kurir</h1>
                        <p>
                          Pilih layanan kurir yang ingin kamu sediakan di tokomu
                        </p>
                        <p>Semua kurir pada layanan ini memiliki fitur :</p>
                      </div>
                      <div className="antar-ke-kantor">
                        <img src={iconkurir} alt="" />
                        <div className="text-antar-ke-kantor">
                          <h1>Antar ke Kantor Agen</h1>
                          <p>
                            Bawa pesanan ke kantor agen terdekat dan minta resi
                            dari petugas.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="select-pengiriman-kurir">
                      {couriers.map((courier) => (
                        <div className="box-select-pengiriman-kurir">
                          <BpCheckbox />
                          <img src={courier.logo} alt={courier.name} />
                          <span>{courier.courier}</span>
                        </div>
                      ))}
                    </div>
                    <div className="btn-simpan-kurir">
                      <button>Simpan</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={successAlertOpen1}
        autoHideDuration={1500}
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
      <Snackbar
        open={successAlertOpen2}
        autoHideDuration={1500}
        onClose={() => setSuccessAlertOpen2(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen2(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Alhamdulillah Informasi Berhasil Diubah
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen2}
        autoHideDuration={3000}
        onClose={() => setErrorAlertOpen2(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen2(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Maaf, terjadi kesalahan. Gagal Mengubah Informasi.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default PengaturanToko;
