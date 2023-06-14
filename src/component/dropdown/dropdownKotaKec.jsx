import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../../style/dropdown.css";
import axios from "axios";
import apiurl from "../../utils/apiurl";

function DropdownKotaKec() {
   const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [provinceSearchInput, setProvinceSearchInput] = useState("");
  const [regencySearchInput, setRegencySearchInput] = useState("");
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showRegencyDropdown, setShowRegencyDropdown] = useState(false);

  const fetchProvinces = useCallback(async () => {
    try {
      const response = await axios.get(apiurl() + "provinces", {
        params: {
          id: "52",
        },
      });
      setProvinces(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const fetchRegencies = useCallback(async () => {
    try {
      const response = await axios.get(apiurl() + "regencies/52", {
        params: {
          id: "5207",
        },
      });
      setRegencies(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchProvinces();
    fetchRegencies();
  }, [fetchProvinces, fetchRegencies]);

  const filteredProvinces = useMemo(() => {
    if (Array.isArray(provinces)) {
      return provinces.filter((province) =>
        province.name.toLowerCase().includes(provinceSearchInput.toLowerCase())
      );
    }
    return [];
  }, [provinces, provinceSearchInput]);

  const filteredRegencies = useMemo(() => {
    if (Array.isArray(regencies)) {
      return regencies.filter((regency) =>
        regency.name.toLowerCase().includes(regencySearchInput.toLowerCase())
      );
    }
    return [];
  }, [regencies, regencySearchInput]);

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setProvinceSearchInput(province.name);
    setShowProvinceDropdown(false);
  };

  const handleRegencySelect = (regency) => {
    setSelectedRegency(regency);
    setRegencySearchInput(regency.name);
    setShowRegencyDropdown(false);
  };

  return (
    <div>
      <p>Pilih Provinsi</p>
      <div className="search-dropdown-kecamatan-kota">
        <div>
          <input
            type="text"
            className="search-input-kecamatan-kota"
            placeholder="Cari Provinsi"
            value={provinceSearchInput}
            onChange={(e) => setProvinceSearchInput(e.target.value)}
            onFocus={() => setShowProvinceDropdown(true)}
          />
          {showProvinceDropdown && (
            <div className="dropdown-province">
              {filteredProvinces.map((province) => (
                <div
                  key={province.id}
                  className="dropdown-item-provinsi"
                  onClick={() => handleProvinceSelect(province)}
                >
                  {province.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <p>Pilih Kabupaten</p>
        <div className="search-dropdown-kecamatan-kota">
          <input
            type="text"
            className="search-input-regensi"
            placeholder="Search Regensi"
            value={regencySearchInput}
            onChange={(e) => setRegencySearchInput(e.target.value)}
            onFocus={() => setShowRegencyDropdown(true)}
          />
          {showRegencyDropdown && (
            <div className="dropdown-regensi">
              {filteredRegencies.map((regency) => (
                <div
                  key={regency.id}
                  className="dropdown-item"
                  onClick={() => handleRegencySelect(regency)}
                >
                  {regency.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-kode">Kode Pos</p>
      <select className="input-kode" value={selectedRegency?.postcode || ""} onChange={(e) => setSelectedRegency({ ...selectedRegency, postcode: e.target.value })}>
        <option value="">Kode Pos</option>
        {selectedProvince?.postcode &&
          <option value={selectedProvince.postcode}>{selectedProvince.postcode}</option>
        }
      </select>
    </div>
  );
}

export default DropdownKotaKec;
