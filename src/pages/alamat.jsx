import React from "react";
import "../style/alamat.css";
import Checklist from "../assets/image/checklist.svg";
import addicon from "../assets/icon/add.svg";
function Alamat() {
  return (
    <div className="contain">
      <div className="box-alamat">
        <div className="isi-alamat">
          <div className="text-alamat">
            <h3>Rumah</h3>
            <h3>Ilyas s</h3>
            <h3>08125676233</h3>
            <h3>
              Cipedak, Kec. Jagakarsa, Kota Jakarta Selatan, Daerah Khusus
              Ibukota Jakarta (no 90 Rt 01 RW 02)
              <img src={Checklist} alt="" className="icon-checklist" />
            </h3>
          </div>
          <div className="opsi-alamat">
            <h3>Share</h3>
            <h3>Ubah Alamat</h3>
          </div>
        </div>
      </div>
      <div className="plus-alamat">
        <button className="btn-tambah">
          <span>+ Tambah Alamat</span>
        </button>
      </div>
    </div>
  );
}

export default Alamat;
