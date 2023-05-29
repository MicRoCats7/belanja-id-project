import React, { useState } from "react";
import NavbarToko from "../component/navbar/navbarToko";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { useEffect } from "react";
import "../style/tambahproduk.css";
import { BiImageAdd } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

function TambahProduk() {
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState("");
  const [characterLimit] = useState(70);

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
  // event handler
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    getCategories();
  }, []);
  
  function getCategories() {
    axios
      .get(apiurl() + "categories")
      .then((response) => {
        setCategories(response.data.data.data);
      })
      .catch((error) => console.error(error));
  }

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange2,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleImageChange1 = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName1(files[0].name);
      setImage1(URL.createObjectURL(files[0]));
    }
  };

  const handleImageChange2 = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName2(files[0].name);
      setImage2(URL.createObjectURL(files[0]));
    }
  };
  const handleImageChange3 = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName3(files[0].name);
      setImage3(URL.createObjectURL(files[0]));
    }
  };
  const handleImageChange4 = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName4(files[0].name);
      setImage4(URL.createObjectURL(files[0]));
    }
  };
  const handleImageChange5 = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName5(files[0].name);
      setImage5(URL.createObjectURL(files[0]));
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
  return (
    <div className="tmbhpro">
      <NavbarToko />
      <div className="container-tambahproduk">
        <h1>Tambah Produk</h1>
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
                  value={inputText}
                  onChange={handleChange}
                  isInvalid={inputText.length > characterLimit}
                  maxLength={70}
                />
                <div className="bottom-input">
                  <p>Tips : Jenis Produk + Keterangan Tambahan</p>
                  <p>
                    {inputText.length}/{characterLimit}
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
                <p>Pilih Kategori sesuai dengan produk yang ingin kamu jual</p>
              </div>
              <div className="dropdown-kategoripro">
                <select name="kategori" id="kategori">
                  <option value="kategori">Kategori</option>
                  {categories?.map((categories) => {
                    return <option href="#">{categories.name}</option>;
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
                  sekaligus di sini. Upload min. 3 foto yang menarik dan berbeda
                  satu sama lain untuk menarik perhatian pembeli.
                </p>
              </div>
              <div className="inputFotoProduk">
                <div className="addImg">
                  <label
                    htmlFor="input-file"
                    className={`file-label ${!image1 ? "no-border" : ""}`}
                  >
                    {image1 ? (
                      <img
                        src={image1}
                        width={150}
                        height={150}
                        alt={fileName1}
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
                  {image1 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2 onClick={handleImageRemove1} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="addImg">
                  <label
                    htmlFor="input-file2"
                    className={`file-label ${!image2 ? "no-border" : ""}`}
                  >
                    {image2 ? (
                      <img
                        src={image2}
                        width={150}
                        height={150}
                        alt={fileName2}
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
                  {image2 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2 onClick={handleImageRemove2} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="addImg">
                  <label
                    htmlFor="input-file3"
                    className={`file-label ${!image3 ? "no-border" : ""}`}
                  >
                    {image3 ? (
                      <img
                        src={image3}
                        width={150}
                        height={150}
                        alt={fileName3}
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
                  {image3 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2 onClick={handleImageRemove3} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="addImg">
                  <label
                    htmlFor="input-file4"
                    className={`file-label ${!image4 ? "no-border" : ""}`}
                  >
                    {image4 ? (
                      <img
                        src={image4}
                        width={150}
                        height={150}
                        alt={fileName4}
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
                  {image4 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2 onClick={handleImageRemove4} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="addImg">
                  <label
                    htmlFor="input-file5"
                    className={`file-label ${!image5 ? "no-border" : ""}`}
                  >
                    {image5 ? (
                      <img
                        src={image5}
                        width={150}
                        height={150}
                        alt={fileName5}
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
                  {image5 && (
                    <div className="upload-row">
                      <span className="upload-content">
                        <FiTrash2 onClick={handleImageRemove5} />
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
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          {...controlProps("a")}
                          sx={{
                            color: red[800],
                            "&.Mui-checked": {
                              color: red[600],
                            },
                          }}
                        />
                      }
                      label="Baru"
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          {...controlProps("b")}
                          sx={{
                            color: red[800],
                            "&.Mui-checked": {
                              color: red[600],
                            },
                          }}
                        />
                      }
                      label="Bekas"
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
                  Disarankan untuk tidak memasukkan info nomor HP, e-mail, dsb.
                  ke dalam deskripsi produk untuk melindungi data pribadimu.
                </p>
              </div>
              <div className="inputNamaProduk">
                <textarea
                  name=""
                  id=""
                  placeholder="Tulis Deskripsi yang unik untuk produk kamu untuk menarik pembeli"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="container-infoProduk">
          <h2>Harga</h2>
          <div className="container-inputProduk">
            <div className="container-namaProduk">
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
            </div>
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
                <p>Gunakan kode unik SKU jika kamu ingin menandai produkmu.</p>
              </div>
              <div className="harga-satuan">
                <input type="text" placeholder="Masukkan SKU" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-infoProduk">
          <h2>Berat dan Pengiriman</h2>
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
            <div className="container-namaProduk">
              <div className="ukuranpro">
                <div className="namapro-top">
                  <h1>Ukuran Produk</h1>
                </div>
                <p>
                  Masukkan ukuran produk setelah dikemas untuk menghitung berat
                  volume
                </p>
              </div>
              <div className="input-ukuranpro">
                <div className="gram">
                  <input
                    type="text"
                    placeholder="Panjang"
                    value={value5}
                    onChange={handleChangePanjang}
                    maxLength={100}
                  />
                  <div className="box-gram">
                    <h4>cm</h4>
                  </div>
                </div>
                <div className="gram">
                  <input
                    type="text"
                    placeholder="Lebar"
                    value={value6}
                    onChange={handleChangeLebar}
                    maxLength={100}
                  />
                  <div className="box-gram">
                    <h4>cm</h4>
                  </div>
                </div>
                <div className="gram">
                  <input
                    type="text"
                    placeholder="Tinggi"
                    value={value7}
                    onChange={handleChangeTinggi}
                    maxLength={100}
                  />
                  <div className="box-gram">
                    <h4>cm</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-namaProduk">
              <div className="pengiriman">
                <div className="namapro-top">
                  <h1>Layanan Pengiriman</h1>
                </div>
                <p>Atur layanan pengiriman sesuai jenis produkmu.</p>
              </div>
              <div className="input-pengiriman">
                <div className="radion-button">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          {...controlProps("a")}
                          sx={{
                            color: red[800],
                            "&.Mui-checked": {
                              color: red[600],
                            },
                          }}
                        />
                      }
                      label="Standar"
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          {...controlProps("b")}
                          sx={{
                            color: red[800],
                            "&.Mui-checked": {
                              color: red[600],
                            },
                          }}
                        />
                      }
                      label="Custom"
                    />
                  </RadioGroup>
                </div>
                <div className="info-pengiriman">
                  <p>
                    Layanan pengiriman untuk produk ini akan sama dengan yang
                    ada di
                    <Link to={"/pengaturantoko"}> Pengaturan Pengiriman.</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-eksekusi">
          <button className="btn-btl">Batal</button>
          <button className="btn-baru">Tambah Baru</button>
        </div>
      </div>
    </div>
  );
}

export default TambahProduk;
