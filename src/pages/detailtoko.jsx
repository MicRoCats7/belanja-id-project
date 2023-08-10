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
import { RiUserFollowLine } from "react-icons/ri";
import { MdOutlineLeaderboard } from "react-icons/md";

function Detailtoko() {
  const [product, setProduct] = useState([]);
  const [toko, setToko] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    getProductByUserId();
    getEventById(); // Move this call to the useEffect
    window.scrollTo(0, 0);
  }, []);

  function getEventById() {
    axios
      .get(apiurl() + `stores?id=${id}`)
      .then((response) => {
        setToko(response.data.data);
        setIsFollowing(response.data);
        console.log("Data Store by ID:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  function toggleFollow() {
    const token = localStorage.getItem("token");
    if (token) {
      if (isFollowing) {
        // Unfollow the store
        axios
          .delete(apiurl() + "unfollow/" + id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setToko((prevToko) => ({
              ...prevToko,
              followers: prevToko.followers ? prevToko.followers - 1 : 0,
            }));
            setIsFollowing(false); // Set isFollowing to false
            console.log("Berhasil Berhenti Mengikuti toko", response.data);
          })
          .catch((error) =>
            console.error("Gagal berhenti mengikuti toko", error)
          );
      } else {
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
            setToko((prevToko) => ({
              ...prevToko,
              followers: prevToko.followers ? prevToko.followers + 1 : 1,
            }));
            setIsFollowing(true); // Set isFollowing to true
            console.log("Berhasil mengikuti toko", response.data);
          })
          .catch((error) => console.error("Gagal mengikuti toko", error));
      }
    }
  }

  function getProductByUserId() {
    axios
      .get(apiurl() + "products", {
        params: {
          store_id: id,
          created_at: "3d",
        },
      })
      .then((response) => {
        console.log("Data produk dari server:", response.data.data);
        setProduct(response.data.data);
        setLatestProducts(response.data.data);
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
            <div className="btn-fol-unfoll">
              <button
                className={`btn-follow-toko ${isFollowing ? "diikuti" : ""}`}
                onClick={toggleFollow}
              >
                {isFollowing ? "Diikuti" : "IKUTI"}
              </button>
            </div>
            {/* <button className="btn-follow-toko" onClick={followStore}>
                IKUTI
              </button> */}
            {/* <button className="btn-chat-toko">
                <BsChatLeftText />
                Chat Penjual
              </button> */}
          </div>
          <div className="container-information-detail-toko">
            <div className="total-produk-detail-toko">
              <HiOutlineArchiveBox />
              <p>
                Produk: <span>{product.length}</span>
              </p>
            </div>
            <div className="total-followers-detail-toko">
              <BsStar />
              <p>
                Rating: <span>{toko.rate}</span>
              </p>
            </div>
            <div className="total-followers-detail-toko">
              <RiUserFollowLine />
              <p>
                Pengikut: <span>{toko.followers}</span>
              </p>
            </div>
            <div className="total-followers-detail-toko">
              <MdOutlineLeaderboard />
              <p>
                Negara: <span>{toko.country}</span>
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
                {latestProducts.length === 0 ? (
                  <p>
                    Tidak ada produk terbaru yang ditambahkan dalam 3 hari
                    terakhir.
                  </p>
                ) : (
                  latestProducts
                    .slice(0, 10)
                    .map((item) => (
                      <Product
                        name={item.name}
                        url={item.picturePath}
                        location={item.store?.provinces}
                        price={item.price}
                        rating={item.rate}
                        ulasan={item.review}
                        stok={item.stok}
                        id={item.id}
                      />
                    ))
                )}
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
                {latestProducts.map((item) => (
                  <Product
                    name={item.name}
                    url={item.picturePath}
                    location={item.store?.provinces}
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
