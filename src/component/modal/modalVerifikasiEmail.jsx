import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../style/modall.css";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

function ModalVerifikasiEmail({ onClose, email, user }) {
  const [modal, setModal] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const navigate = useNavigate();
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const handleResendVerificationEmail = async () => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("user_id", user);
      formData.append("email_pengguna", email);

      const response = await axios.post(
        apiurl() + "resend-verification-email",
        formData
      );
      console.log("Email berhasil dikirim ulang:", response.data.message);
      console.log("Email verification sent:", response.data);
      console.log("User ID:", response.data.user_id);
      console.log("Verification URL:", response.data.verification_url);
      console.log("Email Pengguna:", response.data.email_pengguna);
      setVerificationData(response.data.data);
      onClose();
    } catch (error) {
      console.error("Failed to resend verification email:", error);
    }
  };

  useEffect(() => {
    if (successAlertOpen || errorAlertOpen) {
      setModal(false);
    }
  }, [successAlertOpen, errorAlertOpen]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  const handleKembaliClick = () => {
    onClose(); // Close the verification modal
    navigate("/profile/biodata"); // Navigate to the home page
  };

  return (
    <>
      <h3 onClick={toggleModal} className="ubah-nama-user">
        verikasi
      </h3>

      {modal && (
        <div className="modal-verif">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="verification-content-modal">
            <h3>Verifikasi Email</h3>
            <p>Verfikasi Email Telah Dikirim , Silahkan Cek Email Anda!</p>
            <div className="modal-buttons">
              <button
                className="btn-lanjutkan"
                onClick={handleResendVerificationEmail}
              >
                Lanjutkan
              </button>
              <button className="tutup-email" onClick={toggleModal}>
                Kembali
              </button>
            </div>
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
          Alhamdulillah Nama Berhasil Diubah
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
          Nama gagal diubah.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ModalVerifikasiEmail;
