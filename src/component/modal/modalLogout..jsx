import React from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../../style/modall.css";
import { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ModalLogout({ onClose }) {
  const [modal, setModal] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true);
        await axios.post(
          apiurl() + "logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        handleSuccessAlertOpen();
        localStorage.removeItem("token");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
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
        Logout
      </p>

      {modal && (
        <div className="modal-forgot">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-forgot">
            <h2>Logout</h2>
            <div className="conten-forgot-pw">
              <h3 className="masuk-email-pw">Yakin Dek Mau Keluar?</h3>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </div>
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
          Anda Berhasil Keluar!
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

export default ModalLogout;
