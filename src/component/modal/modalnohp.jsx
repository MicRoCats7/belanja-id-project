import React, { useState } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";

function ModalHp({ nomProfileUpdate }) {
  const [modal, setModal] = useState(false);
  const [phone, setNomor] = useState("");
  const [profile, setProfile] = useState({});
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedNomor, setUpdatedNomor] = useState("");

  const navigate = useNavigate();

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const response = await axios.post(
          apiurl() + "user",
          {
            phone: phone,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        handleSuccessAlertOpen();
        setProfile(response.data.data);
        setUpdatedNomor(phone);
        nomProfileUpdate(response.data.data);
        console.log(response.data); // Panggil fungsi handleProfileUpdate dengan data pengguna yang diperbarui
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

  const handlePhoneChange = (event) => {
    setNomor(event.target.value);
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

  return (
    <>
      <h3 onClick={toggleModal} className="ubah-nohp">
        Daftar
      </h3>

      {modal && (
        <div className="modal-nomer">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-nomerhp">
            <h3>Daftar Nomor</h3>
            <p>
              Silahkan Daftar nomor anda disini , Pastikan nomor hp yang anda
              masukkan Benar{" "}
            </p>
            <div className="nomer-kamu">
              <h3>Nomor hp</h3>
              <input
                type="number"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Masukkan Nomor Telepon"
              />
              <button className="btn-simpan-email" onClick={updateProfile}>
                Daftar
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
          Alhamdulillah NomerHp Berhasil Ditambahkan
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
          Maaf, terjadi kesalahan. Gagal menambahkan NomerHp.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ModalHp;
