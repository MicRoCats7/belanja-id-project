import React, { useEffect, useState } from "react";
import "../style/alamat.css";
import ModalEditAlamat from "../component/modal/modalEditAlamat";
import ModalAddAlamat from "../component/modal/modalAddAlamat";
import axios from "axios";
import apiurl from "../utils/apiurl";
import token from "../utils/token";
import { useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import imgAlamatKosong from "../assets/image/postman.png";

function Alamat() {
  const [alamatList, setAlamatList] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  useEffect(() => {
    fetchAlamat();
    getProfile();
  }, []);

  function fetchAlamat() {
    axios
      .get(apiurl() + "user_addresses/" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        const responseData = response.data;
        if (responseData.data) {
          setAlamatList(responseData.data);
          console.log(responseData.data);
        } else {
          console.log(
            "Gagal mengambil data alamat:",
            responseData.meta.message
          );
        }
      })
      .catch((error) => {
        console.log("Gagal mengambil data alamat:", error);
      });
  }

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
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  function deleteAlamat(id) {
    axios
      .delete(apiurl() + "user_addresses/" + id, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      })
      .then((response) => {
        handleSuccessAlertOpen();
        // Berhasil dihapus dari server, sekarang hapus juga dari state alamatList
        setAlamatList((prevAlamatList) =>
          prevAlamatList.filter((alamat) => alamat.id !== id)
        );
        console.log("Alamat berhasil dihapus:", response.data);
      })
      .catch((error) => {
        console.log("Gagal menghapus alamat:", error);
        handleErrorAlertOpen();
      });
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  const addNewAlamat = (newAlamat) => {
    setAlamatList([...alamatList, newAlamat]);
  };

  return (
    <>
      {alamatList.length === 0 ? (
        <div className="item-alamat-kosong">
          <div className="text-alamat-kosong">
            <img src={imgAlamatKosong} alt="alamat kosong" />
            <h1>Alamat Kamu Kosong Isi Dulu Yuk!!</h1>
            <ModalAddAlamat addNewAlamat={addNewAlamat} />
          </div>
        </div>
      ) : (
        <div className="contain">
          <div className="plus-alamat">
            <ModalAddAlamat />
          </div>
          {alamatList.map((alamat) => (
            <div className="box-alamat">
              <div className="isi-alamat">
                <div className="item-alamat" key={alamat.id}>
                  <div className="text-alamat">
                    <h3>{alamat.label_address}</h3>
                  </div>
                  <div className="line-atas"></div>
                  <div className="nama-nomer-alamat">
                    <h3 className="nama-user-alamat">{alamat.receiver_name}</h3>
                    <hr />
                    <h3>{alamat.phone_number}</h3>
                  </div>
                  <div className="deskripsi-alamat">
                    <h3 className="detail-alamat">{alamat.address_one}</h3>
                    <h3 className="desa-kecamatan">{`${alamat.regencies} - ${alamat.provinces} - ${alamat.zip_code}`}</h3>
                  </div>
                  <div className="line-bawah"></div>
                  <div className="opsi-alamat">
                    <h3
                      onClick={() => deleteAlamat(alamat.id)}
                      style={{ cursor: "pointer" }}
                    >
                      Hapus
                    </h3>
                    <div>
                      <ModalEditAlamat addNewAlamat={addNewAlamat} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
          Hapus alamat berhasil
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
          daftar gagal. Silakan periksa kembali Dan isi data secara lengkap.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Alamat;
