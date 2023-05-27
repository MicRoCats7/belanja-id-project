import React, { useState } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";

function ModalEmail() {
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
        <div className="modal-email">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h3>Ubah Email</h3>
            <p>Silahkan ubah email anda disini , Pastikan email anda Benar </p>
            <div className="email-kamu">
              <h3>Email</h3>
              <input type="text" placeholder="Email" className="input-email" />
              <button className="btn-simpan-email">Ubah</button>
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

export default ModalEmail;
