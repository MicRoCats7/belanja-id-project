import React, { useState } from "react";
import axios from "axios"; // Import Axios for making API requests
import defaultImage from "../../assets/icon/anonimprofile.jpg";
import apiurl from "../../utils/apiurl";
import { FiTrash2 } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";

function ImageUploader() {
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [previewImg, setPreviewImg] = useState(null);

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
          console.log("Berhasil Mengapload photo", response.data);
        })
        .catch((error) => console.error("Gagal mengapload photo", error));
    }
  }

  return (
    <div>
      <div>
        <label
          htmlFor="input-file"
          className={`file-labelprofile ${
            !selectedImagePath ? "no-border" : ""
          }`}
        >
          {previewImg ? (
            <img
              src={previewImg}
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
      </div>
      <button onClick={AploadFotoProfile} className="input-image">
        Simpan
      </button>
    </div>
  );
}

export default ImageUploader;
