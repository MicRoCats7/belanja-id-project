import React, { useState } from "react";
import "../style/biodata.css";
import Modal from "../component/dropdown/modal";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ModalEmail from "../component/dropdown/modalemail";
import Modaldate from "../component/dropdown/modaldate";
import ModalHp from "../component/dropdown/modalnohp";
import ImageUploader from "../component/dropdown/testing";

function Biodata() {
  return (
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
                  Ukuran gambar: maks. 1 MB Format gambar: .JPEG, .PNG
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="biodata-kanan">
          <h3 className="edit-biodata">Ubah Biodata Anda</h3>
          <div className="edit-nama">
            {/* <div className="txt-nama">
            <h3 className="text-nama">Nama</h3>
            </div>
            <div className="inputnama">
              <input type="name" name="" id="" placeholder="Nama" />
            </div> */}
            <span className="nama-text">Nama</span>
            <span className="nama-user">Ilyas</span>
            <div>
              <Modal />
            </div>
          </div>
          <div className="edit-tanggal">
            <span className="nama-tgl">Tanggal Lahir</span>
            <span className="tgl-lahir-user">15 Januari 2021</span>
            <div>
              <Modaldate />
            </div>
          </div>
          {/* <div className="jenis-kelamin">
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
            </div> */}
          <h3 className="ubah-kontak">Ubah Kontak Anda</h3>
          <div className="edit-kontak">
            <span className="email-text">Email</span>
            <span className="email-user">ilyas@gmail.com</span>
            <div className="data-verifikasi">Terverifikasi</div>
            <ModalEmail />
          </div>
          <div className="edit-nohp">
            {/* <div className="text-tgl">
              <h3>Nomer Hp</h3>
            </div>
            <div className="inputtgl">
              <input type="name" name="" id="" placeholder="Nomer hp" />
            </div>
            <h3 className="ubah-nama">Ubah</h3> */}
            <span className="text-nohp">No Hp</span>
            <span className="nohp-user">082436236</span>
            <div className="data-verifikasi">Terverifikasi</div>
            <ModalHp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biodata;
