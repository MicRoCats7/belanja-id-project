import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar/navbar";
import imgToko from "../assets/image/imgToko.svg";
import "../style/daftartoko.css";
import Footer from "../component/footer/footer";
import { Link, useNavigate } from "react-router-dom";
import apiurl from "../utils/apiurl";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function DaftarToko() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [profile, setProfile] = useState({});
  const [phone, setNomor] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [selectedRegency, setSelectedRegency] = useState("");
  const [regencies, setRegencies] = useState([]);
  const [cities, setCities] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchKeywordCity, setSearchKeywordCity] = useState("");
  const [searchResultsCity, setSearchResultsCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchResultsVisibleCity, setSearchResultsVisibleCity] =
    useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProvinces();
    // fetchDistricts();
    fetchCitiesByProvince();
    checkPhoneNumber();
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", storeName);
    formData.append("phone", phone);
    formData.append("provinces", selectedProvinceName);
    formData.append("regencies", selectedCity.city_name);
    formData.append("country", "Indonesia");
    // formData.append("zip_code", zipcode);

    try {
      setSubmitting(true);
      setSubmissionError(null);
      setSubmissionMessage("");

      const token = localStorage.getItem("token");
      const response = await axios.post(apiurl() + "stores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      handleSuccessAlertToko();
      const responseData = response.data;
      const user = responseData.data?.user;
      const store = responseData.data;

      if (store) {
        console.log("Toko berhasil dibuat:", responseData);
        setSubmissionMessage("Toko berhasil dibuat");
        updateProfile();
        setTimeout(() => {
          navigate("/toko/hometoko");
        }, 2000);
      } else {
        console.log("Gagal membuat toko: Data pengguna tidak tersedia");
        setSubmissionError("Gagal membuat toko");
      }
    } catch (error) {
      console.log("Gagal membuat toko:", error);
      handleErrorAlertToko();
      setSubmissionError("Gagal membuat toko");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const handleSuccessAlertToko = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertToko = () => {
    setErrorAlertOpen(true);
  };

  const checkPhoneNumber = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(apiurl() + "user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      setProfile(response.data.data);
      console.log("Nomor telepon pengguna:", data);
      setPhoneVisible(Boolean(data.phone)); // Perbarui state phoneVisible berdasarkan nomor telepon yang ada
    } catch (error) {
      console.log("Gagal mendapatkan nomor telepon pengguna:", error);
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const response = await axios.post(
          apiurl() + "user",
          {
            phone: phone,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setProfile(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderPhoneNumberInput = () => {
    if (profile.user?.phone !== "belum terdaftar") {
      return <h3 className="no-usser">{profile.user?.phone}</h3>;
    } else {
      return (
        <>
          <div className="inputNoHp">
            <input
              type="number"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="phone"
            />
          </div>
        </>
      );
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

  const handlePhoneChange = (event) => {
    setNomor(event.target.value);
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

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSearchKeywordCity(city.city_name);
    setSearchResultsVisibleCity(false);
  };

  const handleChangeCity = (e) => {
    const selectedCityId = e.target.value;
    setSelectedCity(selectedCityId);

    const selectedCityData = cities.find(
      (city) => city.city_id === selectedCityId
    );
    setSelectedCityName(selectedCityData.city_name); // Simpan nama kota yang dipilih ke state
  };

  return (
    <div className="daftar-main">
      <Navbar />
      <div className="container-toko">
        <div className="con-img">
          <h1>Buat Toko Kamu!</h1>
          <p>
            Jadikan tokomu yang terbaik dan memiliki produk UMKM yang
            berkualitas
          </p>
          <img src={imgToko} alt="" />
        </div>
        <div className="con-daftarToko">
          <h1>
            Halo,
            <span className="nama-user-daftartoko">
              {profile.user && profile.user.name.split(" ")[0]}
            </span>
            ayo isi detail tokomu!
          </h1>
          <div className="con-input">
            <div className="timeline">
              <div className="step">
                <form onSubmit={onSubmit}>
                  <div className="step__marker">
                    <div className="step__number">
                      <div className="number-timeline">
                        <div className="circle-number">
                          <span>1</span>
                        </div>
                        <div className="timeline-toko"></div>
                      </div>
                      <div className="main-input">
                        <div className="step__marker-text">
                          <h2>Masukkan NO.HP-mu</h2>
                        </div>
                        {renderPhoneNumberInput()}
                      </div>
                    </div>
                  </div>
                  <div className="step__marker">
                    <div className="step__number">
                      <div className="number-timeline">
                        <div className="circle-number">
                          <span>2</span>
                        </div>
                        <div className="timeline-toko-domain"></div>
                      </div>
                      <div className="main-input">
                        <div className="step__marker-text">
                          <h2>Masukkan Nama Toko </h2>
                        </div>
                        <p>Nama Toko</p>
                        <div className="namatoko">
                          <input
                            type="text"
                            name="storeName"
                            id="storeName"
                            placeholder="Masukkan Nama Toko"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="step__marker">
                      <div className="step__number">
                        <div className="number-timeline">
                          <div className="circle-number">
                            <span>3</span>
                          </div>
                        </div>
                        <div className="main-input">
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
                      </div>
                    </div>
                    <div className="btn-buatToko">
                      <Link to={"/"}>
                        <button className="btn-kembali">Kembali</button>
                      </Link>
                      <button className="btn-create-shop">Buat Toko</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
    </div>
  );
}

export default DaftarToko;
