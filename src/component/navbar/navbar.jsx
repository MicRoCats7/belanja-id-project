import React, { useEffect, useState } from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconKeranjang from "../../assets/icon/keranjang.svg";
import iconChat from "../../assets/icon/iconChat.svg";
import IconNotif from "../../assets/icon/notif.svg";
import { Link, useNavigate } from "react-router-dom";
import Icontoko from "../../assets/icon/tokoo.svg";
import apiurl from "../../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

function Navbar() {
  const [profile, setProfile] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [produkList, setProdukList] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  useEffect(() => {
    LoadProduk();
    getProfile();
    getCategories();
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
        setCategories(response.data.data.data);
      })
      .catch((error) => console.error(error));
  }

  const LoadProduk = async () => {
    try {
      const response = await axios.get(apiurl() + "products");
      setProdukList(response.data.data.data);
      console.log(response.data.data.data);
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
              <img src={iconKeranjang} alt="icon keranjang" />
              <img src={IconNotif} alt="icon notif" />
            </div>
            <div className="line"></div>
            {localStorage.getItem("token") ? (
              <div className="myshop">
                <div className="circle">
                  <Link to={"/daftartoko"}>
                    <img src={Icontoko} alt="icon keranjang" />
                  </Link>
                </div>
                <div className="drop-profile">
                  <img
                    className="photo-profile"
                    src={profile.user?.profile_photo_path}
                    alt=""
                  />
                  <div className="menu-dropdown">
                    <div className="user-info">
                      <img
                        className="photo-profile"
                        src={profile.user?.profile_photo_path}
                        alt=""
                      />
                      <h3 className="nama-user-profile">
                        {profile.user && profile.user.name}
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
          severity="success"
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
