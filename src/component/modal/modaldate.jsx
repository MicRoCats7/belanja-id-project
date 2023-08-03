import React, { useState } from "react";
import "../../style/modall.css";
import Selectmoon from "../dropdown/selectdrpdwn";
import { MdOutlineClose } from "react-icons/md";

function Modaldate() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <h4 onClick={toggleModal} className="ubah-tanggal-user">
        Daftar
      </h4>

      {modal && (
        <div className="modal-date">
          <div onClick={toggleModal} className="overlay-date"></div>
          <div className="modal-content-date">
            <h3>Ubah Alamat</h3>
            <p>
              Anda hanya dapat mengatur tanggal lahirmu sekali. Pastikan Tanggal
              lahir anda sudah benar
            </p>
            <div className="nama-kamu">
              <h3>Tanggal</h3>
              <Selectmoon />
              <button className="btn-simpan">Daftar</button>
              <button className="close-modal" onClick={toggleModal}>
                <MdOutlineClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modaldate;
