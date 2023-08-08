import React from "react";
import "../style/detailtoko.css";
import Navbar from "../component/navbar/navbar";
import imgToko from "../assets/image/imgToko.svg";
import { AiOutlinePlus } from "react-icons/ai";
import { BsChatLeftText, BsPeople, BsStar } from "react-icons/bs";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { IoPersonAddOutline } from "react-icons/io5";
import Product from "../component/product/product";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiurl from "../utils/apiurl";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../component/loader/Loading";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Detailtoko() {
  const [product, setProduct] = useState([]);
  const [toko, setToko] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  useEffect(() => {
    getProductByUserId();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getEventById();
  }, []);

  function getEventById() {
    axios
      .get(apiurl() + `stores?id=${id}`)
      .then((response) => {
        setToko(response.data.data);
        console.log("Data Store by ID:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  function followStore() {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          apiurl() + "follow/" + id,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          handleSuccessAlertFollow();
          setIsFollowing(true);
          setToko((prevToko) => ({
            ...prevToko,
            followers: prevToko.followers ? prevToko.followers + 1 : 1, // Tambahkan nilai 1 jika followers sudah ada, jika belum set menjadi 1
          }));
          console.log("Berhasil mengikuti toko", response.data);
        })
        .catch((error) => console.error("Gagal mengikuti toko", error));
    }
  }

  function getProductByUserId() {
    axios
      .get(apiurl() + "products", {
        params: {
          store_id: id,
        },
      })
      .then((response) => {
        console.log("Data produk dari server:", response.data.data);
        setProduct(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  const handleSuccessAlertFollow = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertFollow = () => {
    setErrorAlertOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="container-detail-toko">
        <div className="container-info-detail-toko">
          <div className="container-img-detail-toko">
            <img src={toko.logo} alt="Logo Toko" />
          </div>
          <div className="container-btn-detail-toko">
            {isFollowing ? (
              <button className="btn-follow-toko disabled">SUDAH DIKUTI</button>
            ) : (
              <button className="btn-follow-toko" onClick={followStore}>
                <AiOutlinePlus />
                IKUTI
              </button>
            )}
            <button className="btn-chat-toko">
              <BsChatLeftText />
              Chat Penjual
            </button>
          </div>
          <div className="container-information-detail-toko">
            <div className="total-produk-detail-toko">
              <HiOutlineArchiveBox />
              <p>
                Produk: <span>{toko.products_count}</span>
              </p>
            </div>
            <div className="total-followers-detail-toko">
              <BsStar />
              <p>
                Pengikut: <span>{toko.followers}</span>
              </p>
            </div>
          </div>
          <div className="container-pesanan-jam-infolokasi">
            <div className="container-proses-pesanan">
              <h3>Nama Toko</h3>
              <p>
                <span>{toko.name}</span>
              </p>
            </div>
            <div className="container-jam">
              <h3>Buka 24jam</h3>
              <h4>Jam Operasional</h4>
            </div>
            <div className="container-info-lokasi">
              <h3>Info toko & lokasi</h3>
              <h4>
                {toko.provinces}, {toko.regencies}
              </h4>
            </div>
          </div>
        </div>
        <div className="container-deskripsi-detail-toko">
          <div className="title-deskripsi-detail-toko">
            <h3>Deskripsi Toko</h3>
          </div>
          {toko.description ? (
            <p>{toko.description}</p>
          ) : (
            <p>Toko ini belum memiliki deskripsi.</p>
          )}
        </div>
        <div className="container-produk-terbaru-detail-toko">
          <div className="title-produk-terbaru-detail-toko">
            <h3>Produk Terbaru Dari Kami</h3>
          </div>
          <div className="container-produk-terbaru-toko">
            {isLoading ? (
              <div
                className="pengaturan-result-search"
                style={{ marginRight: "80px" }}
              >
                <Loading cards={7} />
              </div>
            ) : (
              <div className="produk-terbaru-toko">
                {product?.map((item) => (
                  <Product
                    name={item.name}
                    url={item.picturePath}
                    location={item.product_origin}
                    price={item.price}
                    rating={item.rate}
                    ulasan={item.review}
                    stok={item.stok}
                    id={item.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="container-produk-terbaru-detail-toko">
          <div className="title-produk-terbaru-detail-toko">
            <h3>Semua Produk</h3>
          </div>
          <div className="container-produk-terbaru-toko">
            {isLoading ? (
              <div
                className="pengaturan-result-search"
                style={{ marginRight: "80px" }}
              >
                <Loading cards={7} />
              </div>
            ) : (
              <div className="produk-terbaru-toko">
                {product?.map((item) => (
                  <Product
                    name={item.name}
                    url={item.picturePath}
                    location={item.product_origin}
                    price={item.price}
                    rating={item.rate}
                    ulasan={item.review}
                    stok={item.stok}
                    id={item.id}
                  />
                ))}
              </div>
            )}
          </div>
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
            Berhasil Mengikuti Toko ini
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
            Gagal Mengikuti toko ini
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}

export default Detailtoko;
