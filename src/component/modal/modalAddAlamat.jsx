import React, { useState, useEffect } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import token from "../../utils/token";
import { useParams } from "react-router-dom";

function ModalAlamat({ addNewAlamat }) {
  const [modal, setModal] = useState(false);
  const [alamat, setAlamat] = useState("");
  const [userId, setUserId] = useState("");
  const [nama, setNama] = useState("");
  const [phone, setNomor] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(false);
  const [searchResultsVisibleCity, setSearchResultsVisibleCity] =
    useState(false);
  const [searchKeywordCity, setSearchKeywordCity] = useState("");
  const [searchResultsCity, setSearchResultsCity] = useState([]);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [label, setLabel] = useState("");
  const { id } = useParams();
  const [alamatList, setAlamatList] = useState([]);

  useEffect(() => {
    fetchProvinces();
    fetchCitiesByProvince();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(apiurl() + "provinces");
      const responseData = response.data;

      if (responseData.meta && responseData.meta.code === 200) {
        const provincesData = responseData.data;
        // Tambahkan property 'province_name' pada setiap objek provinsi
        const provincesWithNames = provincesData.map((province) => ({
          ...province,
          province_name: province.province,
        }));
        setProvinces(provincesWithNames);
      } else {
        console.log("Failed to fetch provinces:", responseData.meta.message);
      }
    } catch (error) {
      console.log("Failed to fetch provinces:", error);
    }
  };

  const fetchCitiesByProvince = async (provinceId) => {
    try {
      const response = await axios.get(
        apiurl() + `cities?province_id=${provinceId}`
      );
      const data = response.data;
      setCities(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvinceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedProvince(selectedId);

    // Cari nama provinsi berdasarkan ID provinsi yang dipilih
    const selectedProvinceData = provinces.find(
      (province) => province.province_id === selectedId
    );
    setSelectedProvinceName(selectedProvinceData.province_name);

    setSelectedCity("");
    fetchCitiesByProvince(selectedId);
    setProvinceSelected(true);
    setSearchResultsVisibleCity(false);
  };

  const handleSearchCity = (e) => {
    const keyword = e.target.value;
    setSearchKeywordCity(keyword);

    if (keyword === "") {
      setSearchResultsCity([]);
      setSearchResultsVisibleCity(false);
    } else {
      const filteredCities = cities.filter((city) =>
        city.city_name.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResultsCity(filteredCities);
      setSearchResultsVisibleCity(true);
    }

    const selectedCityExists = searchResultsCity.some(
      (city) => city.city_name === selectedCity.city_name
    );
    if (!selectedCityExists) {
      setSelectedCity("");
    }
  };

  const handleSelectCity = (city) => {
    if (city && city.city_name) {
      setSelectedCity(city);
      setSearchKeywordCity(city.city_name);
      setSearchResultsVisibleCity(false);
      setPostalCode("");
      setSelectedCityName(city.city_name);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleNameChange = (event) => {
    setNama(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNomor(event.target.value);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  function fetchAlamat() {
    axios
      .get(apiurl() + "user_addresses/" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        const responseData = response.data;
        if (responseData.data) {
          setAlamatList(responseData.data);
          console.log(responseData.data);
        } else {
          console.log(
            "Gagal mengambil data alamat:",
            responseData.meta.message
          );
        }
      })
      .catch((error) => {
        console.log("Gagal mengambil data alamat:", error);
      });
  }

  const addAlamat = async (e) => {
    e.preventDefault();
    if (
      !nama ||
      !phone ||
      !selectedProvince ||
      !selectedCity ||
      !selectedCity.city_name || // Memeriksa jika selectedCity atau city_name kosong
      !postalCode ||
      !alamat ||
      !label
    ) {
      alert("Harap isi semua field sebelum menambahkan alamat!");
      return;
    }
    const formData = new FormData();
    // formData.append("user_id", userId);
    formData.append("receiver_name", nama);
    formData.append("phone_number", phone);
    formData.append("provinces", selectedProvinceName);
    formData.append("regencies", selectedCity.city_name);
    formData.append("zip_code", postalCode);
    formData.append("address_one", alamat);
    formData.append("label_address", label);

    try {
      const token = localStorage.getItem("token");
      // Lakukan permintaan POST ke API
      const response = await axios.post(apiurl() + "user_addresses", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.data) {
        handleSuccessAlertOpen();
        const newAlamatData = {
          receiver_name: nama,
          phone_number: phone,
          provinces: selectedProvinceName,
          regencies: selectedCity.city_name,
          zip_code: postalCode,
          address_one: alamat,
          label_address: label,
        };
        fetchAlamat();
        addNewAlamat(newAlamatData);
        toggleModal();
      } else {
        handleErrorAlertOpen();
      }
    } catch (error) {
      console.log("Failed to add alamat:", error);
    }
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  return (
    <>
      <button className="btn-tambah" onClick={toggleModal}>
        <span>+ Tambah Alamat</span>
      </button>
      <>
        <form onSubmit={addAlamat}>
          {modal && (
            <div className="modal-alamat">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modals-content-add-alamat">
                <div className="text-diatas-popup">
                  <h3 className="judul-ubah-alamat">Tambah Alamat</h3>
                </div>
                <button className="close-modal" onClick={toggleModal}>
                  <MdOutlineClose style={{ cursor: "pointer" }} />
                </button>
                <div className="scrollable-content">
                  <div className="kontak-nomer-input">
                    <h3>Nama Penerima dan Nomor Telepon</h3>
                    <div>
                      <div className="jarak-input-nama">
                        <div className="nama-kamu">
                          <input
                            type="name"
                            value={nama}
                            onChange={handleNameChange}
                            placeholder="Nama"
                          />
                        </div>
                      </div>
                      <div className="jarak-input-nomer">
                        <div className="nomer-kamu">
                          <input
                            type="number"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="label-kamu">
                    <div className="step__marker-text">
                      <h2>Masukkan Alamat Tokomu</h2>
                    </div>
                    <div className="dropdown">
                      <div>
                        <p>Provinsi dan kota</p>
                        <select
                          className="input-provinsi-kota"
                          value={selectedProvince}
                          onChange={handleProvinceChange}
                        >
                          <option value="">Pilih Provinsi</option>
                          {provinces.length > 0 &&
                            provinces.map((province) => (
                              <option
                                key={province.province_id}
                                value={province.province_id}
                              >
                                {province.province}
                              </option>
                            ))}
                        </select>
                        {provinceSelected && (
                          <div
                            className={`input-cities ${
                              searchResultsVisibleCity ? "active" : ""
                            }`}
                          >
                            <input
                              type="text"
                              value={searchKeywordCity}
                              onChange={handleSearchCity}
                              placeholder={
                                selectedCityName
                                  ? selectedCityName
                                  : "Cari Kota/Kabupaten"
                              }
                            />
                            <ul
                              style={{
                                display: searchResultsVisibleCity
                                  ? "block"
                                  : "none",
                              }}
                            >
                              {searchResultsCity.map((city) => (
                                <li
                                  key={city.city_id}
                                  onClick={() => handleSelectCity(city)}
                                >
                                  {city.city_name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {selectedCity && (
                          <div className="label-kamu">
                            <p>Kode Pos</p>
                            <input
                              type="text"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              placeholder="Masukkan kode pos"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="alamat-kamu">
                    <h3>Alamat Lengkap</h3>
                    <textarea
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      placeholder="Masukkan alamat lengkap"
                    />
                    <p className="peringatan-alamat">
                      Pastikan semua informasi seperti alamat lengkap dan titik
                      lokasi sudah benar, ya.
                    </p>
                  </div>
                  <div className="label-kamu">
                    <h3>Label Alamat</h3>
                    <input
                      type="text"
                      placeholder="Label Alamat"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                    <p>Contoh: Rumah, Kantor, dan lainnya.</p>
                  </div>
                </div>
                <button className="btn-simpan-alamat">Tambah Alamat</button>
              </div>
            </div>
          )}
        </form>
      </>
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
          Alhamdulillah daftar sukses
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
          daftar gagal. Silakan periksa kembali Dan isi data secara lengkap.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ModalAlamat;
