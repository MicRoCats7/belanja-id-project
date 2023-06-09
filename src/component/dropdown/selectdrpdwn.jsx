import React, { useState } from "react";
import "../../style/selectdropdwn.css";

function Selectmoon() { 
  return (
    <div className="tgl-bln-tahun">
      <div>
      <select className="input-tanggal" selected>
        <option value="tanggal">Tanggal</option>
        <option value="tanggal">01</option>
        <option value="tanggal">02</option>
        <option value="tanggal">03</option>
        <option value="tanggal">04</option>
        <option value="tanggal">05</option>
      </select>
      </div>
      <div>
        <select className="input-bulan" selected>
          <option value="bulan">Bulan</option>
          <option value="bulan">Januari</option>
          <option value="bulan">Februari</option>
          <option value="bulan">Maret</option>
          <option value="bulan">April</option>
          <option value="bulan">Mei</option>
          <option value="bulan">Juni</option>
          <option value="bulan">Juli</option>
        </select>
        </div>
        <div>
          <select className="input-tahun" selected>
            <option value="tahun">Tahun</option>
            <option value="tahun">2000</option>
            <option value="tahun">2001</option>
            <option value="tahun">2002</option>
            <option value="tahun">2003</option>
            <option value="tahun">2004</option>
            <option value="tahun">2005</option>
            <option value="tahun">2006</option>
          </select>
        </div>
    </div>
  );
}

export default Selectmoon;
