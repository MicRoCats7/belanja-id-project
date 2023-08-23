import React, { useEffect, useState } from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconChat from "../../assets/icon/iconChat.svg";
import DeafultPhoto from "../../assets/icon/anonimprofile.jpg";
import IconNotif from "../../assets/icon/notif.svg";
import { Link, useNavigate } from "react-router-dom";
import "../../style/modall.css";
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
  const [loadingDots, setLoadingDots] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [toko, setToko] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [hasShop, setHasShop] = useState(false);
  const [produkList, setProdukList] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [shopName, setShopName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [tokoProducts, setTokoProducts] = useState([]);

  const handleLogoutModalOpen = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutModalClose = () => {
    setLogoutModalOpen(false);
  };

  useEffect(() => {
    LoadProduk();
    getProduct();
    getProfile();
    getCategories();
    getToko();
    getStoko();
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
        setIsLoading(true);
        setLoadingDots(""); // Reset the loading dots
        const interval = setInterval(() => {
          setLoadingDots((prevDots) =>
            prevDots.length < 4 ? prevDots + "." : ""
          );
        }, 500); // Add a dot every 300 milliseconds

        await axios.post(
          apiurl() + "logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        clearInterval(interval); // Stop adding dots
        handleSuccessAlertOpen();
        localStorage.removeItem("token");
        setIsLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setLoadingDots("");
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
          setHasShop(true);
          setShopName(response.data.data.name);
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

  const getStoko = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          apiurl() + "stores?store_name=" + text,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setShopList(response.data.data);
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
      setProdukList(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
      setProdukList([]);
    }
  };

  const onSuggestHandler = (selectedSuggestion) => {
    setText(selectedSuggestion);
    setSuggestions([]);
    navigate(`/search?query=${selectedSuggestion}`);
  };

  const onChangeHandler = (text) => {
    let productMatches = [];
    let shopMatches = [];

    if (produkList && produkList.length > 0) {
      const regex = new RegExp(`${text}`, "gi");
      productMatches = produkList.filter((pro) => pro.name.match(regex));
    }

    if (shopList && shopList.length > 0) {
      const shopRegex = new RegExp(`${text}`, "gi");
      shopMatches = shopList.filter((shop) => shop.name.match(shopRegex));
    }

    const combinedSuggestions = [...productMatches, ...shopMatches];

    setSuggestions(combinedSuggestions);
    setText(text);

    const tokoProductMatches = produkList.filter((pro) =>
      pro.store.name.toLowerCase().includes(text.toLowerCase())
    );

    setTokoProducts(tokoProductMatches);
  };

  const handleSearch = (query) => {
    // Redirect to search page with the search text
    navigate(`/search?query=${text}`);
    setSearchClicked(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(text);
      setSuggestions([]);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(`${apiurl()}cart/items`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      setCartItemCount(response.data.data.cartItems.length);
      // getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputBlur = () => {
    setSearchClicked(false); // Sembunyikan dropdown ketika kehilangan fokus
  };

  const handleInputClick = () => {
    setSearchClicked(true); // Menampilkan dropdown ketika tombol pencarian diklik
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
                  <div
                    className="dropdown-item-category"
                    key={category.id}
                    onClick={() =>
                      navigate(`/category/${category.id}/${category.name}`)
                    }
                  >
                    {category.name}
                  </div>
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
                onClick={handleInputClick} // Set searchClicked to true when the input is clicked
                onBlur={handleInputBlur} // Handle blur event to hide the dropdown
                onKeyPress={handleKeyPress}
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
              <Link to={"/chat"}>
                <img src={iconChat} alt="icon chat" />
              </Link>
              <Link to={"/cart"} className="cart-icon">
                <div className="icon-cart">
                  <div className="icon-cart-navbar">
                    <BsCart2 />
                  </div>
                </div>
                <div className="item-count">
                  {cartItemCount > 0 && (
                    <span className="cart-item-count">{cartItemCount}</span>
                  )}
                </div>
              </Link>
              {/* <Link to={"/notifikasi"}>
                <img src={IconNotif} alt="icon notif" />
              </Link> */}
            </div>
            <div className="line"></div>
            {localStorage.getItem("token") ? (
              <div className="myshop">
                {hasShop ? (
                  // Tampilkan nama toko jika pengguna sudah memiliki toko
                  <div className="circle">
                    <Link to={"/toko/hometoko"} target="_blank">
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
                    <Link to={"/toko/hometoko"} target="_blank">
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
                          Wishlist
                        </button>
                      </Link>
                      <button
                        className="btn-logout"
                        onClick={handleLogoutModalOpen}
                      >
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
      {logoutModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-logout">
            <h2>Logout</h2>
            <p>Yakin Dek Mau Keluar?</p>
            <div className="modal-buttons">
              <button className="btn-batal" onClick={handleLogoutModalClose}>
                Batal
              </button>
              <button
                className="btn-submit"
                onClick={logout}
                disabled={isLoading}
              >
                {isLoading ? `wait${loadingDots}` : "Yakin"}
              </button>
            </div>
          </div>
        </div>
      )}
      {searchClicked && suggestions && suggestions.length > 0 && (
        <div
          className="dropdown-result"
          onMouseDown={(e) => e.preventDefault()}
        >
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
