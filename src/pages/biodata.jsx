import React from "react";
import "../style/biodata.css";
import ImagePhoto from "../assets/image/photo.svg"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function Biodata() {
  return (
    <div className="box-biodata">
      <div className="top-text">
        <h3 className="text-judul">Biodata Diri</h3>
      </div>
      <div className="container">
        <div className="biodata-kiri">
          <div className="box-photo">
            <div className="isibox">
              <img src={ImagePhoto} alt="" className="img-foto" />
              <button className="btn-editfoto">Ubah Foto</button>
              <h3 className="text-ukuran">
                Ukuran gambar: maks. 1 MB Format gambar: .JPEG, .PNG
              </h3>
            </div>
          </div>
        </div>
        <div className="biodata-kanan">
          <h3 className="edit-biodata">Ubah Biodata Anda</h3>
          <div className="edit-nama">
            <div className="txt-nama">
            <h3 className="text-nama">Nama</h3>
            </div>
            <div className="inputnama">
              <input type="name" name="" id="" placeholder="Nama" />
            </div>
            <h3 className="ubah-nama">Ubah</h3>
          </div>
          <div className="edit-tanggal">
            <div className="text-tgl">
              <h3>Tanggal Lahir</h3>
            </div>
            <div className="inputtgl">
              <input type="name" name="" id="" placeholder="Tanggal lahir" />
            </div>
            <h3 className="ubah-nama">Ubah</h3>
          </div>
          <div className="jenis-kelamin">
              <FormControl>
                <p>Jenis Kelamin</p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Laki-laki"
                    control={<Radio />}
                    label="Laki-Laki"
                  />
                  <FormControlLabel
                    value="Perempuan"
                    control={<Radio />}
                    label="Perempuan"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <h3 className="edit-kontak">Ubah Kontak Anda</h3>
          <div className="edit-kontak">
            <div className="txt-email">
            <h3 className="text-email">Email</h3>
            </div>
            <div className="inputemail">
              <input type="name" name="" id="" placeholder="Email" />
            </div>
            <h3 className="ubah-nama">Ubah</h3>
          </div>
          <div className="edit-tanggal">
            <div className="text-tgl">
              <h3>Nomer Hp</h3>
            </div>
            <div className="inputtgl">
              <input type="name" name="" id="" placeholder="Nomer hp" />
            </div>
            <h3 className="ubah-nama">Ubah</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biodata;
