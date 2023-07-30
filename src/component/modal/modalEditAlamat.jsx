import React, { useState, useEffect } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function ModalAlamat() {
  const [modal, setModal] = useState(false);
  const [alamat, setAlamat] = useState("");
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

  useEffect(() => {
    fetchProvinces();
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

  const handleProvinceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedProvince(selectedId);

    // Cari nama provinsi berdasarkan ID provinsi yang dipilih
    const selectedProvinceData = provinces.find(
      (province) => province.province_id === selectedId
    );
    setSelectedProvinceName(selectedProvinceData.province_name);

    setSelectedCity(""); // Reset kota saat mengganti provinsi
    fetchCitiesByProvince(selectedId);
    setProvinceSelected(true);
    setSearchResultsVisibleCity(false);
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
    setSelectedCity(city);
    setSearchKeywordCity(city.city_name);
    setSearchResultsVisibleCity(false);
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

  return (
    <>
      <h3 onClick={toggleModal} className="edit-alamat">
        Ubah alamat
      </h3>

      {modal && (
        <div className="modal-emails">
          <div onClick={toggleModal} className="overlays"></div>
          <div className="modals-contents">
            <div className="text-diatas-popup">
              <h3 className="judul-ubah-alamat">Ubah Alamatmu</h3>
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
                <input type="text" placeholder="Label Alamat" />
                <p>Contoh: Rumah, Kantor, dan lainnya.</p>
              </div>
            </div>
            <button className="btn-simpan-alamat">Ubah Alamat</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalAlamat;
