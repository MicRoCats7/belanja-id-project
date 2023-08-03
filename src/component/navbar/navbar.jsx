import React, { useEffect, useState } from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconChat from "../../assets/icon/iconChat.svg";
import DeafultPhoto from "../../assets/icon/anonimprofile.jpg";
import IconNotif from "../../assets/icon/notif.svg";
import { Link, useNavigate } from "react-router-dom";
import Icontoko from "../../assets/icon/tokoo.svg";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import token from "../../utils/token";

function Navbar() {
  const [profile, setProfile] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [toko, setToko] = useState([]); 
  const [hasShop, setHasShop] = useState(false);
  const [produkList, setProdukList] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState([]);
  const [shopName, setShopName] = useState(""); 

  useEffect(() => {
    getProfile();
    getProduct();
    LoadProduk();
    getCategories();
    getToko();
  }, []);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(apiurl() + "user", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setProfile(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true);
        await axios.post(
          apiurl() + "logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        handleSuccessAlertOpen();
        localStorage.removeItem("token");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

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
        if (response.data.data) {
          // Jika data toko ada (pengguna sudah memiliki toko), set nama toko di state shopName
          setHasShop(true);
          setShopName(response.data.data.name); // Simpan nama toko
        } else {
          setHasShop(false);
        }
        console.log("Data successfully fetched:", response.data.data);
      } catch (error) {
        setHasShop(false);
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  function getCategories() {
    axios
      .get(apiurl() + "categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.error(error));
  }

  const LoadProduk = async () => {
    try {
      const response = await axios.get(apiurl() + "products");
      setProdukList(response.data.data.data);
      // console.log(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSuggestHandler = (selectedSuggestion) => {
    setText(selectedSuggestion);
    setSuggestions([]);
    navigate(`/search?query=${selectedSuggestion}`);
    handleSearch(selectedSuggestion);
  };

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = produkList.filter((pro) => {
        const regex = new RegExp(`${text}`, "gi");
        return pro.name.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  const handleSearch = () => {
    // Redirect to search page with the search text
    navigate(`/search?query=${text}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(`${apiurl()}cart/items`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      setCartItemCount(response.data.data.cartItems.length); // Menyimpan jumlah produk di keranjang
      // getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="container-navbar">
          <div className="navbar-logo">
            <Link to={"/"}>
              <img src={logoBelanjaID} alt="logo belanja.id" />
            </Link>
          </div>
          <div className="kategori">
            <button className="dropbtn">Kategori</button>
            <div className="dropdown-content">
              {categories?.map((category) => {
                return (
                  <a href="#" key={category.id}>
                    {category.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="container-search">
            <div className="search">
              <input
                type="text"
                placeholder="Cari Produk"
                onChange={(e) => onChangeHandler(e.target.value)}
                value={text}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 100);
                }}
                onKeyPress={handleKeyPress} // Handle key press event
              />
              <button type="submit" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="listNavbar">
            <Link to={"/event"}>
              <p>Event</p>
            </Link>
            <div className="icon-navbar">
              <img src={iconChat} alt="icon chat" />
              <Link to={"/cart"}>
                <BsCart2 />
                {cartItemCount > 0 && (
                  <span className="cart-item-count">{cartItemCount}</span>
                )}
              </Link>
              <img src={IconNotif} alt="icon notif" />
            </div>
            <div className="line"></div>
            {localStorage.getItem("token") ? (
              <div className="myshop">
                  {hasShop ? (
                  // Tampilkan nama toko jika pengguna sudah memiliki toko
                  <div className="circle">
                    <Link to={"toko/hometoko"}>
                      <img src={Icontoko} alt="icon keranjang" />
                    </Link>
                  </div>
                ) : (
                  // Tampilkan tombol daftar toko jika pengguna belum memiliki toko
                  <div className="circle">
                    <Link to={"/daftartoko"}>
                      <img src={Icontoko} alt="icon keranjang" />
                    </Link>
                  </div>
                )}
                 {hasShop && (
                  // Tampilkan nama toko di samping ikon toko jika pengguna sudah memiliki toko
                  <div className="shop-name">
                    <Link to={"toko/hometoko"}>
                      <span>{shopName}</span>
                    </Link>
                  </div>
                )}
                <div className="drop-profile">
                  <div className="circle-photo">
                    <img
                      className="photo-profiles"
                      src={profile.user?.profile_photo_path || DeafultPhoto}
                      alt=""
                    />
                  </div>

                  <div className="menu-dropdown">
                    <div className="user-info">
                      <img
                        className="photo-profiles"
                        src={profile.user?.profile_photo_path || DeafultPhoto}
                        alt=""
                      />
                      <h3 className="nama-user-profile">
                        {profile.user && profile.user.name.split(" ")[0]}
                      </h3>
                    </div>
                    <hr />
                    <div className="opsi-menu-dropdwn">
                      <Link to={"/profile/biodata"}>
                        <button className="btn-menuju-profile">Profile</button>
                      </Link>
                      <Link to={"/Whislist"}>
                        <button className="btn-menuju-whislist">
                          Whislist
                        </button>
                      </Link>
                      <button className="btn-logout" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="login-daftar">
                <Link to="/login">
                  <button className="btn-login">Masuk</button>
                </Link>
                <Link to="/register">
                  <button className="daftar">Daftar</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {suggestions && suggestions.length > 0 && (
        <div className="dropdown-result">
          {suggestions.slice(0, 5).map((suggestion, i) => (
            <div
              key={i}
              className="suggestion"
              onClick={() => onSuggestHandler(suggestion.name)}
            >
              <CiSearch fontSize={"20px"} />
              <h3>{suggestion.name}</h3>
            </div>
          ))}
        </div>
      )}
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Anda berhasil logout!
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
          Logout gagal!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Navbar;
