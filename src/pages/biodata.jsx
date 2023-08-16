import React, { useEffect, useState } from "react";
import axios from "axios";
import apiurl from "../utils/apiurl";
import "../style/biodata.css";
import Modal from "../component/modal/modal";
import ModalEmail from "../component/modal/modalemail";
import ModalVerifikasi from "../component/modal/modalVerifikasiEmail";
import ModalHp from "../component/modal/modalnohp";
import ImageUploader from "../component/dropdown/testing";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import LoadingSkeletonBiodata from "../component/loader/LoadingSkeletonBiodata";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function Biodata() {
  const [modal, setModal] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setNomor] = useState("");
  const [photo, setPhoto] = useState("");
  const [profile, setProfile] = useState({});
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(""); // Define the user state
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [successAlertphoto, setSuccessAlertphoto] = useState(false);
  const [errorAlertphoto, setErrorAlertphoto] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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
        setUser(response.data.data.user.id);
        setProfile(response.data.data);
        setPhoto(response.data.data.user.profile_photo_path);
        setIsEmailVerified(response.data.data.user.email_verified_at);
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
  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setSelectedImagePath(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  function AploadFotoProfile() {
    const formData = new FormData();
    formData.append("file", selectedImagePath);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    if (token) {
      axios
        .post(apiurl() + "user/photo", formData, config)
        .then((response) => {
          handleSuccessAlertProfile();
          console.log("Berhasil Mengapload photo", response.data);
        })
        .catch((error) => {
          handleErrorAlertProfile();
          console.error("Gagal mengapload photo", error);
        });
    }
  }

  const handleSuccessAlertProfile = () => {
    setSuccessAlertphoto(true);
  };

  const handleErrorAlertProfile = () => {
    setErrorAlertOpen(true);
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

  const handleVerificationSuccess = () => {
    setIsProfileUpdated(!isProfileUpdated);
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
                  <div>
                    <label
                      htmlFor="input-file"
                      className={`file-labelprofile ${
                        !selectedImagePath && !photo ? "no-border" : ""
                      }`}
                    >
                      {previewImg || photo ? (
                        <img
                          src={previewImg || photo}
                          width={170}
                          height={160}
                          alt="Uploaded"
                          className="uploaded-image-toko"
                        />
                      ) : (
                        <>
                          <BiImageAdd color="#606060" size={60} />
                          <p>Pilih Foto Anda</p>
                        </>
                      )}
                    </label>
                    <input
                      id="input-file"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="input-field"
                      onChange={handleImageChange1}
                      hidden
                    />
                    {previewImg && (
                      <div className="upload-row">
                        <span className="upload-content">
                          <FiTrash2 onClick={() => setPreviewImg("")} />
                        </span>
                      </div>
                    )}
                    <button onClick={AploadFotoProfile} className="input-image">
                      Simpan
                    </button>
                  </div>

                  <div className="isibox">
                    <h3 className="text-ukuran">
                      Ukuran gambar: maks. 1 MB Format gambar: .JPG, .JPEG, .PNG
                      , dan ukuran minimum 300 x 300px.
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
                {isEmailVerified ? (
                  <div className="data-verifikasi">Terverifikasi</div>
                ) : (
                  <div className="data-verifikasi">Tidak Terverifikasi</div>
                )}
                {!isEmailVerified && ( // Hanya tampilkan jika email belum terverifikasi
                  <ModalVerifikasi
                    email={email || (profile.user && profile.user.email)}
                    user={user || (profile.user && profile.user.id)}
                    onClose={() => setShowVerificationModal(false)}
                  />
                )}
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
          <Snackbar
            open={successAlertphoto}
            autoHideDuration={3000}
            onClose={() => setSuccessAlertphoto(false)}
          >
            <MuiAlert
              onClose={() => setSuccessAlertphoto(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Berhasil Mengubah Profile Anda
            </MuiAlert>
          </Snackbar>
          <Snackbar
            open={errorAlertphoto}
            autoHideDuration={3000}
            onClose={() => setErrorAlertphoto(false)}
          >
            <MuiAlert
              onClose={() => setErrorAlertphoto(false)}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Gagal Mengubah Profile anda
            </MuiAlert>
          </Snackbar>
        </div>
      )}
    </>
  );
}

export default Biodata;
