import React, { useState } from "react";
import "../../style/pesananToko.css";
import { CiClock2, CiSearch } from "react-icons/ci";
import { Checkbox, styled } from "@mui/material";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import imgproduk from "../../assets/image/imgProduk.svg";

function PesananBaru() {
  const [selectAll, setSelectAll] = useState(false);

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 23,
    height: 23,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    ".Mui-focusVisible &": {
      outline: "2px auto #000",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      outline: "2px auto #EF233C",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#EF233C",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 23,
      height: 23,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#EF233C",
    },
  });

  function BpCheckbox(props) {
    const handleCheckboxChange = (event) => {
      setSelectAll(event.target.checked);
    };

    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checked={props.checked || selectAll}
        onChange={handleCheckboxChange}
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }
  return (
    <div className="container-pesanan-baru">
      <div className="filter-pesanan-baru">
        <div className="search-pesanan-baru">
          <CiSearch />
          <input type="text" placeholder="Cari Produk" />
        </div>
        <div className="filter-section">
          <div className="dropdown-produk">
            <select name="kategori-produk" id="kategori-produk">
              <option value="all">Semua</option>
              <option>
                <h1>APA APA AJA</h1>
              </option>
            </select>
          </div>
          <div className="dropdown-produk">
            <select name="kategori-produk" id="kategori-produk">
              <option value="all">filter</option>
              <option value="baru">Baru</option>
              <option value="bekas">Bekas</option>
            </select>
          </div>
        </div>
      </div>
      <div className="item-pesanan-baru">
        <div className="checkbox-all">
          <BpCheckbox />
          <h1>Pilih Semua</h1>
        </div>
        <div className="box-item-pesanan-baru">
          <div className="top-item-box-pesanan-baru">
            <div className="point-left"></div>
            <BpCheckbox />
            <h1>Pesanan Baru/</h1>
            <span style={{ color: "#EF233C" }}>No.Invoice</span>
            <h1>/Muh Wahyu Ageng Pambudi/</h1>
            <CiClock2 />
            <h1>20 juli 2023, 08:20 WIB</h1>
          </div>
          <div className="product-item-pesanan-baru">
            <div className="detail-product-pesanan-baru">
              <div className="img-pesanan-baru">
                <img src={imgproduk} alt="" />
              </div>
              <div className="text-detail-pesanan-baru">
                <h2>Baju Polo, Pria lengan pendek polos original Ukuran L</h2>
                <p>2x Rp 35.000</p>
              </div>
            </div>
            <div className="detail-alamat-pesanan-baru">
              <h2>Alamat</h2>
              <p>
                Muh Wahyu Ageng Pambudi (6282128066795) bae, karang dowo, Rt 5
                Rw 5,Kudus,Jawa Tengah Bae, Kab. Kudus, Jawa Tengah 59352
              </p>
            </div>
            <div className="detail-kurir-pesanan-baru">
              <h2>Kurir</h2>
              <p>SiCepat HALU - HALU</p>
            </div>
          </div>
          <div className="btn-total-pesanan-baru">
            <h2>Rp35.000</h2>
            <div className="con-btn-pesanan-baru">
              <div className="point-three">
                <BiDotsHorizontalRounded />
              </div>
              <button className="btn-terima-pesanan-baru">
                Terima Pesanan
              </button>
            </div>
          </div>
        </div>
        <div className="box-item-pesanan-baru">
          <div className="top-item-box-pesanan-baru">
            <div className="point-left"></div>
            <BpCheckbox />
            <h1>Pesanan Baru/</h1>
            <span style={{ color: "#EF233C" }}>No.Invoice</span>
            <h1>/Muh Wahyu Ageng Pambudi/</h1>
            <CiClock2 />
            <h1>20 juli 2023, 08:20 WIB</h1>
          </div>
          <div className="product-item-pesanan-baru">
            <div className="detail-product-pesanan-baru">
              <div className="img-pesanan-baru">
                <img src={imgproduk} alt="" />
              </div>
              <div className="text-detail-pesanan-baru">
                <h2>Baju Polo, Pria lengan pendek polos original Ukuran L</h2>
                <p>2x Rp 35.000</p>
              </div>
            </div>
            <div className="detail-alamat-pesanan-baru">
              <h2>Alamat</h2>
              <p>
                Muh Wahyu Ageng Pambudi (6282128066795) bae, karang dowo, Rt 5
                Rw 5,Kudus,Jawa Tengah Bae, Kab. Kudus, Jawa Tengah 59352
              </p>
            </div>
            <div className="detail-kurir-pesanan-baru">
              <h2>Kurir</h2>
              <p>SiCepat HALU - HALU</p>
            </div>
          </div>
          <div className="btn-total-pesanan-baru">
            <h2>Rp35.000</h2>
            <div className="con-btn-pesanan-baru">
              <div className="point-three">
                <BiDotsHorizontalRounded />
              </div>
              <button className="btn-terima-pesanan-baru">
                Terima Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PesananBaru;
