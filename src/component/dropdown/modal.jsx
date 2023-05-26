import React, { useState } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";

function Modal() {
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
      <h3 onClick={toggleModal} className="ubah-email">
        Ubah
      </h3>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h3>Ubah Nama</h3>
            <p>Silahkan ubah nama anda disini , Pastikan Nama anda Benar </p>
            <div className="nama-kamu">
              <h3>Nama Lengkap</h3>
              <input type="text" placeholder="Nama" className="input-nama" />
              <p>Nama Anda Dapat dilihat oleh pengguna lain</p>
              <button className="btn-simpan">Ubah</button>
              <button className="close-modal" onClick={toggleModal}>
              <MdOutlineClose/>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
