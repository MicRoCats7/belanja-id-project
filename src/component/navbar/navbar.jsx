// import React, { useEffect, useRef, useState } from "react";
// import "../../style/navbar.css";
// import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
// import iconKeranjang from "../../assets/icon/keranjang.svg";
// import iconChat from "../../assets/icon/iconChat.svg";
// import IconNotif from "../../assets/icon/notif.svg";
// import { Link, useNavigate } from "react-router-dom";
// import Icontoko from "../../assets/icon/tokoo.svg";
// import apiurl from "../../utils/apiurl";
// import axios from "axios";

// function Navbar() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState({});
//   const token = localStorage.getItem("token");

//   async function getprofile() {
//     await axios({
//       method: "get",
//       url: apiurl() + "user",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         setProfile(response.data.data);
//       })
//       .catch((error) => {});
//   }

//   useEffect(() => {
//     getprofile();
//     getCategories();
//   }, []);

//   async function logout() {
//     await axios({
//       method: "post",
//       url: apiurl() + "logout",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         navigate("/login");
//       })
//       .catch((error) => {});
//   }

//   function getCategories() {
//     axios
//       .get(apiurl() + "categories")
//       .then((response) => {
//         setCategories(response.data.data.data);
//       })
//       .catch((error) => console.error(error));
//   }

//   return (
//     <div className="navbar">
//       <div className="container-navbar">
//         <div className="navbar-logo">
//           <Link to={"/"}>
//             <img src={logoBelanjaID} alt="logo belanja.id" />
//           </Link>
//         </div>
//         <div className="listNavbar">
//           <div className="kategori">
//             <button class="dropbtn">Kategori</button>
//             <div className="dropdown-content">
//               {categories?.map((categories) => {
//                 return <a href="#">{categories.name}</a>;
//               })}
//             </div>
//           </div>
//           <div className="search">
//             <input type="text" placeholder="Cari Produk " />
//             <button type="submit">Search</button>
//           </div>
//           <p>Event</p>
//           <div className="icon-navbar">
//             <img src={iconChat} alt="icon chat" />
//             <img src={iconKeranjang} alt="icon keranjang" />
//             <img src={IconNotif} alt="icon notif" />
//           </div>
//           <div className="line"></div>
//           { token ? (
//             <div className="myshop">
//               <div className="circle">
//                 <img src={Icontoko} alt="icon keranjang" />
//               </div>
//               <div className="drop-profile">
//                 <img
//                   className="photo-profile"
//                   src={profile.profile_photo_url}
//                   alt=""
//                 />
//                 <div className="menu-dropdown">
//                   <div className="user-info">
//                     <img
//                       className="photo-profile"
//                       src={profile.profile_photo_url}
//                       alt=""
//                     />
//                     <h3 className="nama-user">{profile.name}</h3>
//                   </div>
//                   <hr />
//                   <a href="/" className="sub-menu-link">
//                     Profile
//                   </a>
//                   <a href="/Whislist">Whislist</a>
//                   <button className="btn-logout" onClick={logout}>
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )
//           : (
//             <div className="login-daftar">
//               <Link to="/login">
//                 <button class="btn-login">Masuk</button>
//               </Link>
//               <Link to="/register">
//                 <button class="daftar">Daftar</button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

// export default Navbar;
import React, { useEffect, useRef, useState } from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconKeranjang from "../../assets/icon/keranjang.svg";
import iconChat from "../../assets/icon/iconChat.svg";
import IconNotif from "../../assets/icon/notif.svg";
import { Link, useNavigate } from "react-router-dom";
import Icontoko from "../../assets/icon/tokoo.svg";
import apiurl from "../../utils/apiurl";
import axios from "axios";

function Navbar() {
  const [profile, setProfile] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        await axios.post(
          apiurl() + "logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };
  function getCategories() {
    axios
      .get(apiurl() + "categories")
      .then((response) => {
        setCategories(response.data.data.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="navbar">
      <div className="container-navbar">
        <div className="navbar-logo">
          <Link to={"/"}>
            <img src={logoBelanjaID} alt="logo belanja.id" />
          </Link>
        </div>
        <div className="listNavbar">
          <div className="kategori">
            <button class="dropbtn">Kategori</button>
            <div className="dropdown-content">
              {categories?.map((categories) => {
                return <a href="#">{categories.name}</a>;
              })}
            </div>
          </div>
          <div className="search">
            <input type="text" placeholder="Cari Produk " />
            <button type="submit">Search</button>
          </div>
          <p>Event</p>
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
                  src={profile.profile_photo_url}
                  alt=""
                />
                <div className="menu-dropdown">
                  <div className="user-info">
                    <img
                      className="photo-profile"
                      src={profile.profile_photo_url}
                      alt=""
                    />
                    <h3 className="nama-user">{profile.name}</h3>
                  </div>
                  <hr />
                  <Link to={"/profile"}>
                    <button className="btn-menuju-profile">Profile</button>
                  </Link>
                  <Link to={"/Whislist"}>
                    <button className="btn-menuju-whislist">Whislist</button>
                  </Link>
                  <button className="btn-logout" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="login-daftar">
              <Link to="/login">
                <button class="btn-login">Masuk</button>
              </Link>
              <Link to="/register">
                <button class="daftar">Daftar</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
