import React, { useState, useEffect } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function ModalAlamat() {
  const [modal, setModal] = useState(false);
  const [alamat, setAlamat] = useState("");
  const [nama, setNama] = useState("");
  const [phone, setNomor] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleNameChange = (event) => {
    setNama(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNomor(event.target.value);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <h3 onClick={toggleModal} className="ubah-alamat">
        ubah alamat
      </h3>

      {modal && (
        <div className="modal-email">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="text-diatas-popup">
              <h3>Ubah Alamat</h3>
              <p>Silahkan ubah alamat anda disini, Pastikan alamat anda Benar </p>
            </div>
            <button className="close-modal" onClick={toggleModal}>
              <MdOutlineClose />
            </button>
            <div className="scrollable-content">
              <div className="alamat-kamu">
                <h3>Alamat Lengkap</h3>
                <textarea
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Masukkan alamat lengkap"
                />
                 <p>Pastikan semua informasi seperti alamat lengkap dan titik lokasi sudah benar, ya.</p> 
              </div>
            
              <div className="label-kamu">
                <h3>Label Alamat</h3>
                <input type="text" placeholder="Label Alamat" />
              </div>
              <div className="kontak-nomer-input">
                <h3>Kontak</h3>
                <div>
                  <div className="jarak-input-nama">
                    <div className="nama-kamu">
                      <input
                        type="name"
                        value={nama}
                        onChange={handleNameChange}
                        placeholder="Nama"
                      />
                    </div>
                  </div>
                  <div className="jarak-input-nomer">
                    <div className="nomer-kamu">
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
              {/* Tambahkan elemen di atas untuk menambah konten yang dapat di-scroll */}
            </div>
            <button className="btn-simpan-alamat">Ubah</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalAlamat;
