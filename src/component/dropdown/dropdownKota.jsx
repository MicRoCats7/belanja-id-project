import React from "react";
import "../../style/dropdown.css";

function DropdownKota() {
  return (
    <div>
      <select className="input-provinsi-kota">
        <option value="provinsi">-- Pilih Kota --</option>
        <option value="provinsi">Bima - (Kabupaten)</option>
        <option value="provinsi">BIma - (Kota)</option>
        <option value="provinsi">Dompu - (Kabupaten)</option>
        <option value="provinsi">Lombok Barat - (Kabupaten)</option>
        <option value="provinsi">Lombok Tengah - (Kabupaten)</option>
        <option value="provinsi">Lombok Timur - (Kabupaten)</option>
        <option value="provinsi">Lombok Utara - (Kabupaten)</option>
        <option value="provinsi">Mataram - (Kota)</option>
        <option value="provinsi">Sumbawa - (Kabupaten)</option>
        <option value="provinsi">Sumbawa Barat - (Kabupaten)</option>
      </select>
    </div>
  );
}

export default DropdownKota;
