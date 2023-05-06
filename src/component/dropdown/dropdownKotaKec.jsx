import React from "react";
import "../../style/dropdown.css";

function DropdownKotaKec() {
  return (
    <div>
      <p>Kota Atau Kecamatan</p>
      <select className="input-provinsi-kota" selected>
        <option value="provinsi">Pilih Kota atau Kecamatan</option>
        <option value="provinsi">Kab.Sumbawa Barat, Taliwang</option>
        <option value="provinsi">Maluk</option>
        <option value="provinsi">Jereweh</option>
      </select>
      <p className="text-kode">Kode Pos</p>
      <select className="input-kode" selected>
        <option value="provinsi">Kode Pos</option>
        <option value="provinsi">84455</option>
        <option value="provinsi">55667</option>
        <option value="provinsi">59990</option>
      </select>
    </div>
  );
}

export default DropdownKotaKec;
