import React, { useEffect, useState } from "react";
import "../../style/modall.css";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Modal({ onProfileUpdated }) {
  const [modal, setModal] = useState(false);
  const [nama, setNama] = useState("");
  const [profile, setProfile] = useState({});
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedNama, setUpdatedNama] = useState("");
  const navigate = useNavigate();

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const response = await axios.post(
          apiurl() + "user",
          {
            name: nama,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        handleSuccessAlertOpen();
        setProfile(response.data.data);
        setUpdatedNama(nama);
        onProfileUpdated(response.data.data); // Panggil fungsi onProfileUpdated dengan data pengguna yang diperbarui
        console.log(response.data);
      } catch (error) {
        handleErrorAlertOpen();
        console.error(error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setModal(false); // Tutup modal setelah 2 detik
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (successAlertOpen || errorAlertOpen) {
      setModal(false); // Tutup modal jika pesan sukses atau pesan error ditampilkan
    }
  }, [successAlertOpen, errorAlertOpen]);

  const handleNameChange = (event) => {
    setNama(event.target.value);
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
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h3>Ubah Nama</h3>
            <p>Silahkan ubah nama anda disini , Pastikan Nama anda Benar </p>
            <div className="nama-kamu">
              <h3>Nama Lengkap</h3>
              <div>
                <input
                  type="name"
                  value={nama}
                  onChange={handleNameChange}
                  placeholder="Nama"
                />
              </div>
              <p>Nama Anda Dapat dilihat oleh pengguna lain</p>
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

export default Modal;
