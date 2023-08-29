import React, { useState } from "react";
import axios from "axios"; // Import Axios for making API requests
import defaultImage from "../../assets/icon/anonimprofile.jpg";
import apiurl from "../../utils/apiurl";
import { FiTrash2 } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function ImageUploader() {
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [photo, setPhoto] = useState("");

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
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertProfile = () => {
    setErrorAlertOpen(true);
  };

  return (
    <div>
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
          Berhasil Mengubah Profile Anda
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
          Gagal Mengubah Profile anda
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ImageUploader;
