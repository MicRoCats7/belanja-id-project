import React, { useState, useEffect } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import { useParams } from "react-router-dom";
import "../../style/modall.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function ModalAddJadwal({ closeModal, tambahJadwalOperasional }) {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [day, setDay] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [closeTime, setCloseTime] = useState("");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [operatingHours, setOperatingHours] = useState([
    {
      day: "Senin",
      open_time: "09:00",
      close_time: "17:00",
    },
    {
      day: "Selasa",
      open_time: "09:00",
      close_time: "17:00",
    },
  ]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setOperatingHours((prevHours) => {
      const updatedHours = [...prevHours];
      updatedHours[index][name] = value;
      return updatedHours;
    });
  };

  function tambahJadwalOperasional() {
    setLoading(true);
    const newOperatingHours = {
      operating_hours: [
        {
          day: day,
          open_time: openTime,
          close_time: closeTime,
        },
      ],
    };

    axios
      .post(apiurl() + `store/${id}/add-operating-hours`, newOperatingHours)
      .then((response) => {
        handleSuccessAlertOpen();
        setLoading(false);
        console.log(
          "Response setelah menambahkan jadwal operasional:",
          response.data
        );
        // getJadwalOperasional();
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  useEffect(() => {
    if (successAlertOpen || errorAlertOpen) {
      setModal(false); // Tutup modal jika pesan sukses atau pesan error ditampilkan
    }
  }, [successAlertOpen, errorAlertOpen]);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-add-jadwal-toko">
        Tambah
      </button>
      {modal && (
        <div className="modal-jadwal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-jadwal">
            <h2>Tambah Jadwal Operasional</h2>
            <div className="input-container">
              <div className="input-fields">
                <select
                  className="select-day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">Pilih Hari</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                  <option value="Minggu">Minggu</option>
                </select>
                <div className="input-container">
                  <label>Buka</label>
                  <div className="input-fields">
                    <input
                      type="time"
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <label>Tutup</label>
                  <div className="input-fields">
                    <input
                      type="time"
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className={`btn-save ${loading ? "loading" : ""}`}
                onClick={loading ? null : tambahJadwalOperasional}
              >
                {loading ? <div className="spinner-jadwal"></div> : "Simpan"}
              </button>

              <button className="btn-cancel" onClick={toggleModal}>
                Batal
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
          Alhamdulillah Jadwal Berhasil Ditambahkan
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
          Maaf, terjadi kesalahan. Gagal menambahkan Jadwal.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ModalAddJadwal;
