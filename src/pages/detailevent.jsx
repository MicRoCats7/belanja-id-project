import React from "react";
import "../style/detailevent.css";
import Navbar from "../component/navbar/navbar";
import imgDetailEvnt from "../assets/image/contohimgevent.svg";
import {
  MdLeaderboard,
  MdOutlineDateRange,
  MdOutlineSchedule,
} from "react-icons/md";
import Footer from "../component/footer/footer";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import token from "../utils/token";
import DetaileventSkeleton from "../component/loader/LoadingSkeletonDetailEvent";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Detailevent() {
  const { id } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  useEffect(() => {
    getEventById();
    checkUserRegistrationUser();
  }, []);

  function getEventById() {
    const config = {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    };
    axios
      .get(apiurl() + `events?id=${id}`, config)
      .then((response) => {
        setSelectedEvent(response.data.data);
        console.log("Data event by ID:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  function handleJoinEvent() {
    const config = {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    };
    setIsRegistering(true);
    axios
      .post(apiurl() + `events/${id}/register-send-invoice`, null, config)
      .then((response) => {
        handleSuccessAlertToko();
        setIsRegistered(true);
        setIsRegistering(false);
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        handleErrorAlertToko();
        setIsRegistering(false);
        console.error(error);
      });
  }

  function checkUserRegistrationUser() {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(apiurl() + `events/${id}/registration-status`, config)
      .then((response) => {
        console.log("Response data:", response.data.data);
        const status = response.data.data.status;
        setIsRegistered(status);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSuccessAlertToko = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertToko = () => {
    setErrorAlertOpen(true);
  };

  return (
    <div className="main-evnt">
      <Navbar />
      <div className="container-events">
        {selectedEvent ? (
          <div className="con-box-detail-evnt">
            <div className="image-detail-event">
              <img
                src={selectedEvent.poster}
                className="img-event-detail"
                alt=""
              />
            </div>
            <div className="box-event-detail">
              <div className="con-detail-event">
                <h2>{selectedEvent.title}</h2>
                <hr />
                <div className="waktu-tgl-event">
                  <p>{selectedEvent.date}</p>
                  <p>{selectedEvent.time}</p>
                </div>
                <div className="desk-event-umkm">
                  <h3>Deskripsi Event UMKM</h3>
                  <p className="isi-deskripsi">{selectedEvent.description}</p>
                  <h3 className="teks-ajakan">{selectedEvent.name}</h3>
                </div>
                <div className="info-waktu-tempat">
                  <div className="tgl-hari">
                    <MdOutlineDateRange />
                    <p>{selectedEvent.date}</p>
                  </div>
                  <div className="jam-event">
                    <MdOutlineSchedule />
                    <p>{selectedEvent.time}</p>
                  </div>
                  <div className="mentor-event">
                    <MdLeaderboard />
                    <p>Kota: {selectedEvent.location}</p>
                  </div>
                </div>
                <div className="ayo-join">
                  <h3>
                    Tunggu apa lagi? Segera daftar dan jadilah pelaku UMKM
                    sukses untuk mengelola aset dengan benar!
                  </h3>
                </div>
                <div className="btn-join-event">
                  {isRegistered === "pending" ? (
                    <button
                      className=""
                      onClick={handleJoinEvent}
                      disabled={isRegistering}
                    >
                      {isRegistering ? (
                        <div className="load-spiner-event"></div>
                      ) : (
                        "Daftar Event"
                      )}
                    </button>
                  ) : (
                    <p className="check-event-daftar">
                      Anda sudah terdaftar dalam event ini
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <DetaileventSkeleton />
        )}
      </div>
      <Footer />
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
          Berhasil Mendaftar Event!, silahkan cek email anda
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
          Daftar Event Gagal
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Detailevent;
