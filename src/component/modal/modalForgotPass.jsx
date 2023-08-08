import React from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../../style/modall.css";
import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

function ModalForgotPass({ onClose }) {
  const [modal, setModal] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResendVerificationEmail = async () => {
    try {
      const response = await axios.get(apiurl() + "forgot-password", {
        params: {
          email: email,
        },
      });
      handleSuccessAlertOpen();
      console.log("Reset password email sent:", response.data);
    } catch (error) {
      console.error("Failed to resend verification email:", error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    if (successAlertOpen || errorAlertOpen) {
      setModal(false); // Tutup modal jika pesan sukses atau pesan error ditampilkan
    }
  }, [successAlertOpen, errorAlertOpen]);
  return (
    <>
      <p onClick={toggleModal} className="forgot-email">
        Lupa password?
      </p>

      {modal && (
        <div className="modal-forgot">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-forgot">
            <h2>Reset Password</h2>
            {!resetSuccess ? (
              <>
                <div className="conten-forgot-pw">
                  <h3 className="masuk-email-pw">
                    Masukkan Email Anda Untuk Mereset Password.
                  </h3>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    onClick={handleResendVerificationEmail}
                    className="btn-kirim-pw"
                  >
                    Kirim
                  </button>
                </div>
              </>
            ) : (
              <p>Reset password email sent to {email}</p>
            )}
            <button className="close-modal" onClick={toggleModal}>
              <MdOutlineClose />
            </button>
          </div>
        </div>
      )}
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Link untuk merubah password sudah terkirim di emailmu!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Maaf, terjadi kesalahan
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ModalForgotPass;
