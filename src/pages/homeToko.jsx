import React, { useEffect, useState } from "react";
import BannerToko from "../assets/image/banner-toko.svg";
import "../style/hometoko.css";
import { BsArchive, BsChatSquareText, BsClipboard2Check } from "react-icons/bs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip } from "@mui/material";
import { TbTruckDelivery } from "react-icons/tb";
import axios from "axios";
import apiurl from "../utils/apiurl";
import { AiFillStar } from "react-icons/ai";
import token from "../utils/token";

function HomeToko() {
  const [toko, setToko] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getToko();
    window.scrollTo(0, 0);
  }, []);

  const getToko = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(apiurl() + "user/store", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setToko(response.data.data);
        console.log("Data successfully fetched:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container-hometoko">
      <div className="banner-hero">
        <div className="text-banner">
        {toko && (
            <h2>
              Selamat datang seller <span>{toko.name}</span>
            </h2>
          )}
          <p>
            Anda dapat dengan mudah mengatur dan mengelola Toko Anda melalui
            dashboard seller Belanja.id. Fitur yang tersedia memungkinkan Anda
            untuk menambahkan produk, dan mengedit deskripsi produk dll.
          </p>
        </div>
        <div className="img-banner">
          <img src={BannerToko} alt="image banner" />
        </div>
      </div>
      <div className="penting-hari">
        <div className="text-penting-hari">
          <h2>Penting Hari ini</h2>
          <p>Aktivitas yang perlu kamu pantau untuk jaga kepuasan pembeli </p>
        </div>
        <div className="column-penting-hari">
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <BsArchive />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Pesanan Baru</h3>
                <Tooltip title="Pesanan Baru Kamu" placement="right">
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>0</h3>
              </div>
            </div>
          </div>
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <BsClipboard2Check />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Siap Dikirim</h3>
                <Tooltip title="Pesanan Siap Kirim" placement="right">
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>0</h3>
              </div>
            </div>
          </div>
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <TbTruckDelivery />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Dalam Pengiriman</h3>
                <Tooltip title="Pesanan Dalam Pengiriman" placement="right">
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>0</h3>
              </div>
            </div>
          </div>
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <AiFillStar />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Ulasan Baru</h3>
                <Tooltip title="Ulasan Produk Kamu" placement="right">
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>0</h3>
              </div>
            </div>
          </div>
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <BsChatSquareText />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Chat Baru</h3>
                <Tooltip title="Chat Baru" placement="right">
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>5</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-toko">
        <h2>Detail Tokomu</h2>
        <p>Periksa Stok Produk dan perhatikan ratingmu untuk menarik pembeli</p>
        <div className="column-detail-toko">
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <BsArchive />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Total Produk</h3>
                <Tooltip title="Total Produk yang kamu punya" placement="right">
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>100</h3>
              </div>
            </div>
          </div>
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <BsClipboard2Check />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Total Penjualan</h3>
                <Tooltip
                  title="Total Penjualan yang sudah kamu jual"
                  placement="right"
                >
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>4.000</h3>
              </div>
            </div>
          </div>
          <div className="column-penting-hari-ini">
            <div className="icon-penting-hari">
              <AiFillStar />
            </div>
            <div className="column-content-hari">
              <div className="text-hari-ini">
                <h3>Rating Toko</h3>
                <Tooltip title="Rating Toko Kamu" placement="right">
                  <InfoOutlinedIcon fontSize="10px" />
                </Tooltip>
              </div>
              <div className="jumlah-hari-ini">
                <h3>{toko.rate}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeToko;
