import React, { useState } from "react";
import defaultImage from  "../../assets/icon/anonimprofile.jpg"; // Ganti dengan path yang benar ke file gambar default

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Kirim formData ke backend server menggunakan API atau fungsi yang sesuai
      // Misalnya, menggunakan Axios:
      // await axios.post('/upload', formData);

      // Tindakan setelah berhasil mengupload gambar
    } catch (error) {
      // Tindakan jika terjadi kesalahan
    }
  };

  return (
    <div>
      <div
        className="image-bapak"
        style={{
          backgroundImage: `url(${selectedImage ? selectedImage : defaultImage})`,
        }}
      >
        {!selectedImage && <img src={defaultImage} className="img-profile" alt="Default" />}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileInput" className="input-image">
          Pilih Foto
        </label>
        <input
          type="file"
          id="fileInput"
          accept=".jpeg, .png"
          onChange={handleImageUpload}
          className="add-foto"
        />
      </form>
    </div>
  );
}

export default ImageUploader;
