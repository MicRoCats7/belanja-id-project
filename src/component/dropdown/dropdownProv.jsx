import React from "react";
import "../../style/dropdown.css";

function DropdownProv() {
  return (
    <div>
      <select className="input-provinsi-kota" selected>
        <option value="provinsi">-- Pilih Provinsi --</option>
        <option value="provinsi">Nusa Tenggara Barat (NTB)</option>
        <option value="provinsi">Jawa Tengah</option>
        <option value="provinsi">DKI Jakarta</option>
      </select>
    </div>
  );
}

export default DropdownProv;
