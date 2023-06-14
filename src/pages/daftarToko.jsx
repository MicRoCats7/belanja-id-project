import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar/navbar";
import imgToko from "../assets/image/imgToko.svg";
import DropdownKotaKec from "../component/dropdown/dropdownKotaKec";
import "../style/daftartoko.css";
import Footer from "../component/footer/footer";
import { Link, useNavigate } from "react-router-dom";
import apiurl from "../utils/apiurl";
import axios from "axios";

function DaftarToko() {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [profile, setProfile] = useState({});
  const [phone, setNomor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [selectedRegency, setSelectedRegency] = useState("");
  const [regencies, setRegencies] = useState([]);
  const [provinceName, setProvinceName] = useState("");
  const [regencyName, setRegencyName] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProvinces();
    fetchRegencies();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(apiurl() + "provinces");
      const data = response.data;
      const filteredProvinces = data.filter(
        (province) => province.id === "52" || province.id === 52
      );
      setProvinces(filteredProvinces);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegencies = async () => {
    try {
      const response = await axios.get(apiurl() + "regencies/52");
      const data = response.data;
      const filteredRegencies = data.filter(
        (regency) => regency.id === "5207" || regency.id === 5207
      );
      setRegencies(filteredRegencies);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvinceChange = (e) => {
    const selectedId = e.target.value;
    setSelectedProvince(selectedId);
    getProvinceName(selectedId);
  };

  const handleChangeRegency = (e) => {
    const selectedId = e.target.value;
    setSelectedRegency(selectedId);
    getRegencyName(selectedId);
  };

  const getProvinceName = (id) => {
    const selectedProvince = provinces.find((province) => province.id === id);
    if (selectedProvince) {
      setProvinceName(selectedProvince.name);
    }
  };

  const getRegencyName = (id) => {
    const selectedRegency = regencies.find((regency) => regency.id === id);
    if (selectedRegency) {
      setRegencyName(selectedRegency.name);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", storeName);
    formData.append("phone", phone);
    formData.append("provinces", selectedProvince);
    formData.append("regencies", selectedRegency);
    formData.append("country", "Indonesia");

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

      const responseData = response.data;
      const user = responseData.data?.user;
      const store = responseData.data;

      getProvinceName(store.provinces);
      getRegencyName(store.regencies);

      console.log("Nama Provinsi:", provinceName);
      console.log("Nama Kabupaten:", regencyName);

      if (user) {
        console.log("Toko berhasil dibuat:", responseData);
        setSubmissionMessage("Toko berhasil dibuat");
        	
        setTimeout(() => {
          navigate("/toko/hometoko");
        }, 2000);
      } else {
        console.log("Gagal membuat toko: Data pengguna tidak tersedia");
        setSubmissionError("Gagal membuat toko");
      }
    } catch (error) {
      console.log("Gagal membuat toko:", error);
      setSubmissionError("Gagal membuat toko");
    } finally {
      setSubmitting(false);
    }
  };

  const updatedNomor = async () => {
    const token = localStorage.getItem("token");
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
      const data = response.data;
      setProfile(response.data.data);
    } catch (error) {
      console.log("Gagal mendapatkan nomor telepon pengguna:", error);
    }
  };

  const handlePhoneChange = (event) => {
    setNomor(event.target.value);
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
            <span>{profile.user && profile.user.name.split(" ")[0]}</span>
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
                          <h2>Masukkan Nomor HP-mu</h2>
                        </div>
                        <div className="inputNoHp">
                          <span>
                            {/* {phone || (profile.user && profile.user.phone)} */}
                          </span>
                          <input
                            type="number"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="phone"
                          />
                        </div>
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
                          <h2>Masukkan Nama Toko dan Domain</h2>
                        </div>
                        <p>Nama Toko</p>
                        <input
                          className="namatoko"
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
                            <p>Kota Atau Kecamatan</p>
                            <select
                              className="input-provinsi-kota"
                              value={selectedProvince}
                              onChange={handleProvinceChange}
                            >
                              <option value="">Pilih Provinsi</option>
                              {provinces.length > 0 &&
                                provinces.map((province) => (
                                  <option key={province.id} value={province.id}>
                                    {province.name}
                                  </option>
                                ))}
                            </select>
                            <select
                              className="input-provinsi-kota"
                              value={selectedRegency}
                              onChange={handleChangeRegency}
                            >
                              <option value="">Pilih Kabupaten</option>
                              {regencies.length > 0 &&
                                regencies.map((regency) => (
                                  <option key={regency.id} value={regency.id}>
                                    {regency.name}
                                  </option>
                                ))}
                            </select>
                            <p className="text-kode">Kode Pos</p>
                            <select className="input-kode" selected>
                              <option value="provinsi">Kode Pos</option>
                              <option value="provinsi">84455</option>
                              <option value="provinsi">55667</option>
                              <option value="provinsi">59990</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-buatToko">
                    <Link to={"/"}>
                      <button className="btn-kembali">Kembali</button>
                    </Link>
                    <button type="submit" disabled={submitting} target="_blank">
                      {submitting ? "Memuat..." : "BUAT TOKO"}BUAT TOKO
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DaftarToko;
