// import React, { useEffect, useState } from "react";
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

//   async function getProfile() {
//     try {
//       const response = await axios.get(apiurl() + "user", {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       setProfile(response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getProfile();
//     getCategories();
//   }, []);

//   async function logout() {
//     try {
//       await axios.post(
//         apiurl() + "logout",
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//     }
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
//               {categories?.map((category) => {
//                 return <a href="#">{category.name}</a>;
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
//           {token ? (
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
//           ) : (
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
import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
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
        localStorage.removeItem("token");
        navigate("/login");
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
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
              {categories?.map((category) => {
                return <a href="#">{category.name}</a>;
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
                <img src={Icontoko} alt="icon keranjang" />
              </div>
              <div className="drop-profile">
                <img
                  className="photo-profile"
                  src={profile.user?.profile_photo_url}
                  alt=""
                />
                <div className="menu-dropdown">
                  <div className="user-info">
                    <img
                      className="photo-profile"
                      src={profile.user?.profile_photo_url}
                      alt=""
                    />
                    <h3 className="nama-user">
                      {profile.user && profile.user.name}
                    </h3>
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
  );
}

export default Navbar;
