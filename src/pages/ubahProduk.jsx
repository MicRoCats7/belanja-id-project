import React, { useState } from "react";
import NavbarToko from "../component/navbar/navbarToko";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useEffect } from "react";
import "../style/tambahproduk.css";
import { BiImageAdd } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";

function UbahProduk() {
  const [productToEdit, setProductToEdit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setInputText] = useState("");
  const [storeName, setProductName] = useState("");
  const [characterLimit] = useState(70);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [kondisiProduk, setKondisiProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [skuInput, setSKU] = useState("");
  const [selectedImagePath2, setSelectedImagePath2] = useState("");
  const [selectedImagePath3, setSelectedImagePath3] = useState("");
  const [selectedImagePath4, setSelectedImagePath4] = useState("");
  const [selectedImagePath5, setSelectedImagePath5] = useState("");
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [previewImg2, setPreviewImg2] = useState(null);
  const [previewImg3, setPreviewImg3] = useState(null);
  const [previewImg4, setPreviewImg4] = useState(null);
  const [previewImg5, setPreviewImg5] = useState(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [skuErrorMessage, setSkuErrorMessage] = useState("");
  const [skuList, setSkuList] = useState([]);

  const handleSKUChange = (event) => {
    // Mengonversi nilai input menjadi huruf besar semua sebelum menyimpannya ke dalam state
    const uppercaseSKU = event.target.value.toUpperCase();
    setSKU(uppercaseSKU);
  };

  const handleKondisiChange = (event) => {
    // Mengubah nilai kondisiProduk ke huruf kecil sebelum disimpan di state
    setKondisiProduk(event.target.value.toLowerCase());
  };

  const [image1, setImage1] = useState(null);
  const [fileName1, setFileName1] = useState("No Selected file");
  const [image2, setImage2] = useState(null);
  const [fileName2, setFileName2] = useState("No Selected file");
  const [image3, setImage3] = useState(null);
  const [fileName3, setFileName3] = useState("No Selected file");
  const [image4, setImage4] = useState(null);
  const [fileName4, setFileName4] = useState("No Selected file");
  const [image5, setImage5] = useState(null);
  const [fileName5, setFileName5] = useState("No Selected file");

  const handleChangeName = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    getProductByUserId();
    getCategories();
  }, []);

  function getCategories() {
    axios
      .get(apiurl() + "categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log("Categories data:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  function getProductByUserId() {
    axios
      .get(apiurl() + "products", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        const productData = response.data.data;
        setProductToEdit(productData);
        setInputText(productData.name);
        setSelectedCategory(productData.category_id);
        setKondisiProduk(productData.kondisi_produk);
        setDeskripsiProduk(productData.description);
        setSKU(productData.sku);
        setPreviewImg(productData.picturePath);
        setValue3(productData.quantity);
        setValue2(productData.price);
        setValue4(productData.weight);
        setPreviewImg2(productData.photo1);
        setPreviewImg3(productData.photo2);
        setPreviewImg4(productData.photo3);
        setPreviewImg5(productData.photo4);
        console.log("Data produk dari server:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", value2);
      formData.append("description", deskripsiProduk);
      formData.append("weight", value4);
      formData.append("quantity", value3);
      formData.append("sku", skuInput);
      formData.append("category_id", selectedCategory);
      formData.append("kondisi_produk", kondisiProduk);
      formData.append("picturePath", selectedImagePath);
      if (selectedImagePath2) {
        formData.append("photo1", selectedImagePath2);
      }

      if (selectedImagePath3) {
        formData.append("photo2", selectedImagePath3);
      }

      if (selectedImagePath4) {
        formData.append("photo3", selectedImagePath4);
      }

      if (selectedImagePath5) {
        formData.append("photo4", selectedImagePath5);
      }
      formData.append("slug", "pakaian");

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.post(
        apiurl() + "products/edit/" + id,
        formData,
        config
      );
      handleSuccessAlertToko();
      const newProductData = response.data.data;
      console.log("Produk berhasil diedit:", newProductData);
      setTimeout(() => {
        navigate("/toko/daftarproduk/");
      }, 2000);
    } catch (error) {
      handleErrorAlertToko();
      console.error("Error saat mengedit produk:", error);
    }
  };

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleDeskripsiChange = (event) => {
    setDeskripsiProduk(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange2,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setSelectedImagePath(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setSelectedImagePath2(e.target.files[0]);
      setPreviewImg2(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageChange3 = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setSelectedImagePath3(e.target.files[0]);
      setPreviewImg3(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleImageChange4 = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setSelectedImagePath4(e.target.files[0]);
      setPreviewImg4(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageChange5 = (e) => {
    const file = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setSelectedImagePath5(e.target.files[0]);
      setPreviewImg5(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageRemove1 = () => {
    setFileName1("No Selected File");
    setImage1(null);
  };

  const handleImageRemove2 = () => {
    setFileName2("No Selected File");
    setImage2(null);
  };
  const handleImageRemove3 = () => {
    setFileName3("No Selected File");
    setImage3(null);
  };
  const handleImageRemove4 = () => {
    setFileName4("No Selected File");
    setImage4(null);
  };
  const handleImageRemove5 = () => {
    setFileName5("No Selected File");
    setImage5(null);
  };

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [value6, setValue6] = useState("");
  const [value7, setValue7] = useState("");

  const handleChangeNumber = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
  };

  const handleChangeNumber2 = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue2(result);
  };

  const handleChangeStok = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue3(result);
  };
  const handleChangeBerat = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue4(result);
  };
  const handleChangePanjang = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue5(result);
  };
  const handleChangeLebar = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue6(result);
  };
  const handleChangeTinggi = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue7(result);
  };

  const handleSuccessAlertToko = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertToko = () => {
    setErrorAlertOpen(true);
  };

  console.log(selectedImagePath);
  return (
    <div className="tmbhpro">
      <NavbarToko />
      <div className="container-tambahproduk">
        <h1>Tambah Produk</h1>
        <form onSubmit={onSubmit}>
          <div className="container-infoProduk">
            <h2>Informasi Produk</h2>
            <div className="container-inputProduk">
              <div className="container-namaProduk">
                <div className="namapro">
                  <div className="namapro-top">
                    <h1>Nama Produk</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <p>
                    Nama produk min. 40 karakter dengan memasukkan merek, jenis
                    produk, warna, bahan, atau tipe.
                  </p>
                </div>
                <div className="inputNamaProduk">
                  <input
                    type="text"
                    placeholder="Contoh : Sepatu pria (Jenis/Kategori Produk)"
                    value={name}
                    onChange={handleChangeName}
                    isInvalid={name.length > characterLimit}
                    maxLength={70}
                  />
                  <div className="bottom-input">
                    <p>Tips : Jenis Produk + Keterangan Tambahan</p>
                    <p>
                      {name.length}/{characterLimit}
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-namaProduk">
                <div className="namapro">
                  <div className="namapro-top">
                    <h1>Kategori</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <p>
                    Pilih Kategori sesuai dengan produk yang ingin kamu jual
                  </p>
                </div>
                <div className="dropdown-kategoripro">
                  <select
                    name="kategori"
                    id="kategori"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Kategori</option>
                    {categories?.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="container-infoProduk">
            <h2>Detail Produk</h2>
            <div className="container-inputProduk">
              <div className="container-namaProduk">
                <div className="fotopro">
                  <div className="namapro-top">
                    <h1>Foto Produk</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <p>
                    Format gambar .jpg .jpeg .png dan ukuran minimum 300 x 300px
                    (Untuk gambar optimal gunakan ukuran minimum 700 x 700 px).
                    <br />
                    <br />
                    Pilih foto produk atau tarik dan letakkan hingga 5 foto
                    sekaligus di sini. Upload min. 3 foto yang menarik dan
                    berbeda satu sama lain untuk menarik perhatian pembeli.
                  </p>
                </div>
                <div className="inputFotoProduk">
                  <div className="addImg">
                    <label
                      htmlFor="input-file"
                      className={`file-label ${
                        !selectedImagePath ? "no-border" : ""
                      }`}
                    >
                      {previewImg ? (
                        <img
                          src={previewImg}
                          width={150}
                          height={150}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      ) : (
                        <>
                          <BiImageAdd color="#606060" size={60} />
                          <p>Foto Utama</p>
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
                  <div className="addImg">
                    <label
                      htmlFor="input-file2"
                      className={`file-label ${
                        !selectedImagePath2 ? "no-border" : ""
                      }`}
                    >
                      {previewImg2 ? (
                        <img
                          src={previewImg2}
                          width={150}
                          height={150}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      ) : (
                        <>
                          <BiImageAdd color="#606060" size={60} />
                          <p>Foto 2</p>
                        </>
                      )}
                    </label>
                    <input
                      id="input-file2"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="input-field"
                      onChange={handleImageChange2}
                      hidden
                    />
                    {previewImg2 && (
                      <div className="upload-row">
                        <span className="upload-content">
                          <FiTrash2 onClick={() => setPreviewImg2("")} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="addImg">
                    <label
                      htmlFor="input-file3"
                      className={`file-label ${
                        !selectedImagePath3 ? "no-border" : ""
                      }`}
                    >
                      {previewImg3 ? (
                        <img
                          src={previewImg3}
                          width={150}
                          height={150}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      ) : (
                        <>
                          <BiImageAdd color="#606060" size={60} />
                          <p>Foto 3</p>
                        </>
                      )}
                    </label>
                    <input
                      id="input-file3"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="input-field"
                      onChange={handleImageChange3}
                      hidden
                    />
                    {previewImg3 && (
                      <div className="upload-row">
                        <span className="upload-content">
                          <FiTrash2 onClick={() => setPreviewImg3("")} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="addImg">
                    <label
                      htmlFor="input-file4"
                      className={`file-label ${
                        !selectedImagePath4 ? "no-border" : ""
                      }`}
                    >
                      {previewImg4 ? (
                        <img
                          src={previewImg4}
                          width={150}
                          height={150}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      ) : (
                        <>
                          <BiImageAdd color="#606060" size={60} />
                          <p>Foto 4</p>
                        </>
                      )}
                    </label>
                    <input
                      id="input-file4"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="input-field"
                      onChange={handleImageChange4}
                      hidden
                    />
                    {previewImg4 && (
                      <div className="upload-row">
                        <span className="upload-content">
                          <FiTrash2 onClick={() => setPreviewImg4("")} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="addImg">
                    <label
                      htmlFor="input-file5"
                      className={`file-label ${
                        !selectedImagePath5 ? "no-border" : ""
                      }`}
                    >
                      {previewImg5 ? (
                        <img
                          src={previewImg5}
                          width={150}
                          height={150}
                          alt="Uploaded"
                          className="uploaded-image"
                        />
                      ) : (
                        <>
                          <BiImageAdd color="#606060" size={60} />
                          <p>Foto 5</p>
                        </>
                      )}
                    </label>
                    <input
                      id="input-file5"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      className="input-field"
                      onChange={handleImageChange5}
                      hidden
                    />
                    {previewImg5 && (
                      <div className="upload-row">
                        <span className="upload-content">
                          <FiTrash2 onClick={() => setPreviewImg5("")} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="kondisi">
                <div className="kondisipro">
                  <div className="namapro-top">
                    <h1>Kondisi</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <div className="radion-button">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={kondisiProduk}
                      onChange={handleKondisiChange}
                    >
                      <FormControlLabel
                        value="baru"
                        control={<Radio />}
                        label="baru"
                      />
                      <FormControlLabel
                        value="bekas"
                        control={<Radio />}
                        label="bekas"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="container-namaProduk">
                <div className="deskripsipro">
                  <div className="namapro-top">
                    <h1>Deskripsi Produk</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <p>
                    Pastikan deskripsi produk memuat penjelasan detail terkait
                    produkmu agar pembeli mudah mengerti dan menemukan produkmu.
                    <br />
                    <br />
                    Disarankan untuk tidak memasukkan info nomor HP, e-mail,
                    dsb. ke dalam deskripsi produk untuk melindungi data
                    pribadimu.
                  </p>
                </div>
                <div className="inputNamaProduk">
                  <textarea
                    placeholder="Tulis Deskripsi yang unik untuk produk kamu untuk menarik pembeli"
                    value={deskripsiProduk}
                    onChange={handleDeskripsiChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="container-infoProduk">
            <h2>Harga</h2>
            <div className="container-inputProduk">
              {/* <div className="container-namaProduk">
                <div className="minimumPro">
                  <div className="namapro-top">
                    <h1>Minimum Pemesanan</h1>
                  </div>
                  <p>Atur jumlah minimum yang harus dibeli untuk produk ini.</p>
                </div>
                <div className="inputHargaProduk">
                  <input
                    type="text"
                    value={value}
                    onChange={handleChangeNumber}
                    maxLength={5}
                  />
                </div>
              </div> */}
              <div className="container-namaProduk">
                <div className="hargapro">
                  <div className="namapro-top">
                    <h1>Harga Satuan</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <p>Masukkan Harga untuk Produk anda.</p>
                </div>
                <div className="harga-satuan">
                  <div className="box-harga-satuan">
                    <h4>Rp</h4>
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan Harga"
                    value={value2}
                    onChange={handleChangeNumber2}
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container-infoProduk">
            <h2>Pengelolaan Produk</h2>
            <div className="container-inputProduk">
              <div className="container-namaProduk">
                <div className="minimumPro">
                  <div className="namapro-top">
                    <h1>Stok Produk</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                </div>
                <div className="inputHargaProduk">
                  <input
                    type="text"
                    value={value3}
                    onChange={handleChangeStok}
                    maxLength={100}
                    placeholder="Masukkan Jumlah Stok"
                  />
                </div>
              </div>
              <div className="container-namaProduk">
                <div className="hargapro">
                  <div className="namapro-top">
                    <h1>SKU (Stock Keeping Unit)</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <p>
                    Gunakan kode unik SKU jika kamu ingin menandai produkmu.
                  </p>
                </div>
                <div className="harga-satuan">
                  <input
                    type="text"
                    value={skuInput}
                    onChange={handleSKUChange}
                    placeholder="Masukkan SKU"
                  />
                  {skuErrorMessage && (
                    <p className="error-message">{skuErrorMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="container-infoProduk">
            <h2>Berat Produk</h2>
            <div className="container-inputProduk">
              <div className="container-namaProduk">
                <div className="beratPro">
                  <div className="namapro-top">
                    <h1>Berat Produk</h1>
                    <div className="box-wajib">
                      <p>Wajib</p>
                    </div>
                  </div>
                  <p>Masukkan berat dengan menimbang produk setelah dikemas.</p>
                </div>
                <div className="gram">
                  <input
                    type="text"
                    placeholder="Berat Produk"
                    value={value4}
                    onChange={handleChangeBerat}
                    maxLength={100}
                  />
                  <div className="box-gram">
                    <h4>gram</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-eksekusi">
            <button className="btn-btl">Batal</button>
            <button className="btn-baru">Update Produk</button>
          </div>
        </form>
      </div>
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
          Berhasil Mengubah Data Product
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
          Gagal Mengubah Data product
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default UbahProduk;
