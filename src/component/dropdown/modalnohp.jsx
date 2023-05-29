import React, { useState } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";

function ModalHp() {
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
        <div className="modal-nomer">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h3>Ubah Nomor</h3>
            <p>Silahkan ubah nomor anda disini , Pastikan nomor hp yang anda masukkan Benar </p>
            <div className="nomer-kamu">
              <h3>Nomor hp</h3>
              <input type="text" placeholder="Nomer" className="input-nomer" />
              <button className="btn-simpan-nomer">Ubah</button>
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

export default ModalHp;
