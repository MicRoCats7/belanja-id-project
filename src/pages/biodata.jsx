import React, { useEffect, useState } from "react";
import axios from "axios";
import apiurl from "../utils/apiurl";
import "../style/biodata.css";
import Modal from "../component/modal/modal";
import ModalEmail from "../component/modal/modalemail";
import Modaldate from "../component/modal/modaldate";
import ModalHp from "../component/modal/modalnohp";
import ImageUploader from "../component/dropdown/testing";
import { useNavigate } from "react-router-dom";
import LoadingSkeletonBiodata from "../component/loader/LoadingSkeletonBiodata";

function Biodata() {
  const [modal, setModal] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setNomor] = useState("");
  const [profile, setProfile] = useState({});
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [isProfileUpdated]);

  const getProfile = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(apiurl() + "user", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setProfile(response.data.data);
        setIsLoading(false);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      try {
        const response = await axios.post(
          apiurl() + "user",
          {
            name: nama,
            email: email,
            phone: phone,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        handleSuccessAlertOpen();
        setProfile(response.data.data);
        setLoading(false);
        setIsProfileUpdated(!isProfileUpdated);
      } catch (error) {
        handleErrorAlertOpen();
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleNameChange = (event) => {
    setNama(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
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

  return (
    <>
      {isLoading ? (
        <LoadingSkeletonBiodata />
      ) : (
        <div className="box-biodata">
          <div className="top-text">
            <p className="text-judul">Biodata Diri</p>
          </div>
          <div className="container">
            <div className="biodata-kiri">
              <div className="box-photo">
                <div>
                  <ImageUploader />
                  <div className="isibox">
                    <h3 className="text-ukuran">
                      Ukuran gambar: maks. 1 MB Format gambar: .JPEG, .PNG , dan
                      ukuran minimum 300 x 300px.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="biodata-kanan">
              <h3 className="edit-biodata">Ubah Biodata Anda</h3>
              <div className="edit-nama">
                <span className="nama-text">Nama</span>
                <span className="nama-user-biodata">
                  {nama || (profile.user && profile.user.name)}
                </span>
                <div>
                  <Modal
                    onProfileUpdated={() =>
                      setIsProfileUpdated(!isProfileUpdated)
                    }
                  />
                </div>
              </div>
              {/* <div className="edit-tanggal">
                <span className="nama-tgl">Tanggal Lahir</span>
                <div>
                  <Modaldate />
                </div>
              </div> */}
              <h3 className="ubah-kontak">Ubah Kontak Anda</h3>
              <div className="edit-kontak">
                <span className="email-text">Email</span>
                <span className="email-user-profile">
                  {email || (profile.user && profile.user.email)}
                </span>
                <div className="data-verifikasi">Tidak Terverifikasi</div>
                <ModalEmail
                  handleProfileUpdate={() =>
                    setIsProfileUpdated(!isProfileUpdated)
                  }
                />
              </div>
              <div className="edit-nohp">
                <span className="text-nohp">No Hp</span>
                {/* <div className="data-verifikasi-nohp">Bel um Terverifikasi</div> */}
                <span className="email-user-profile">
                  {phone || (profile.user && profile.user.phone)}
                </span>
                <ModalHp
                  nomProfileUpdate={() =>
                    setIsProfileUpdated(!isProfileUpdated)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Biodata;
