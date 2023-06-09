import React, { useState, useEffect } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function ModalEmail({ handleProfileUpdate }) {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState({});
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const navigate = useNavigate();

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        // Validasi alamat email
        if (!email.includes("@gmail.com")) {
          throw new Error("Alamat email tidak valid");
        }
        const response = await axios.post(
          apiurl() + "user",
          {
            email: email,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        handleSuccessAlertOpen();
        setProfile(response.data.data);
        setUpdatedEmail(email);
        handleProfileUpdate(response.data.data); // Panggil fungsi handleProfileUpdate dengan data pengguna yang diperbarui
      } catch (error) {
        handleErrorAlertOpen();
        console.error(error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setModal(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (successAlertOpen || errorAlertOpen) {
      setModal(false); // Tutup modal jika pesan sukses atau pesan error ditampilkan
    }
  }, [successAlertOpen, errorAlertOpen]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="email"
              />
              <button className="btn-simpan-email" onClick={updateProfile}>
                Ubah
              </button>
              <button className="close-modal" onClick={toggleModal}>
                <MdOutlineClose />
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
          Alhamdulillah Email Berhasil Diubah
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
          Maaf, terjadi kesalahan. Gagal mengubah email.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ModalEmail;
