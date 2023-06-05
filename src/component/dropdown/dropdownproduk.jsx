import React from "react";
import "../../style/dropdown.css";

function DropdownProduk() {
  return (
    <div>
      <select className="input-produk">
        <option value="provinsi">Status pesanan</option>
        <option value="provinsi">Berhasil</option>
        <option value="provinsi">Dalam Pengiriman</option>
        <option value="provinsi">Gagal</option>
      </select>
    </div>
  );
}

export default DropdownProduk;
