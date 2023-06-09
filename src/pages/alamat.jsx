import React from "react";
import "../style/alamat.css";
import Checklist from "../assets/image/checklist.svg";
import ModalAlamat from "../component/modal/modalalamat";

function Alamat() {
  return (
    <div className="contain">
      <div className="plus-alamat">
        <button className="btn-tambah">
          <span>+ Tambah Alamat</span>
        </button>
      </div>
      <div className="box-alamat">
        <div className="isi-alamat">
          <div className="item-alamat">
            <div className="text-alamat">
              <h3>Rumah</h3>
            </div>
            <div className="line-atas"></div>
            <div className="nama-nomer-alamat">
              <h3 className="nama-user-alamat">Ilyas s</h3>
              <hr />
              <h3>08125676233</h3>
            </div>
            <div className="deskripsi-alamat">
              <h3 className="detail-alamat">
              Gg. 7 No.3, Besito Kulon, Besito, Kec. Gebog, Kabupaten Kudus, Jawa Tengah 59333, Indonesia
              </h3>
              <h3 className="desa-kecamatan">
                Besito - Gebog - Kab. Kudus - Jawa Tengah - 59333
              </h3>
            </div>
            <div className="line-bawah"></div>
            <div className="opsi-alamat">
              <h3>Hapus</h3>
              <div>
                <ModalAlamat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alamat;
