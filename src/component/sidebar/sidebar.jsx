import "../../style/sidebar.css";
import logoTokoSeller from "../../assets/image/imgToko.svg";
import { BiHome, BiMessageDetail } from "react-icons/bi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsGear, BsArchive, BsPersonCheck } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import { formatPrice } from "../../utils/helpers";

function Sidebar() {
  const { id } = useParams();
  const [jadwal, setJadwal] = useState([]);
  const [editingOpeningHours, setEditingOpeningHours] = useState([...jadwal]);
  const [toko, setToko] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaldoHidden, setIsSaldoHidden] = useState(false);
  const [saldoStarCount, setSaldoStarCount] = useState(0);

  const menuItem = [
    {
      path: "hometoko",
      name: "Home",
      icon: <BiHome />,
    },
    {
      path: "chat",
      name: "Chat",
      icon: <BiMessageDetail />,
    },
    {
      path: "produk",
      name: "Produk",
      icon: <BsArchive />,
      iconClosed: <MdOutlineKeyboardArrowDown />,
      iconOpen: <MdOutlineKeyboardArrowUp />,
      subNav: [
        {
          path: "/tambahproduk",
          name: "Tambah Produk",
        },
        {
          path: "daftarproduk/" + toko.id,
          name: "Daftar Produk",
        },
      ],
    },
    {
      path: "pesanantoko/" + toko.id,
      name: "Pesanan",
      icon: <HiOutlineClipboardDocumentList />,
    },
    {
      path: "ulasanpembeli/" + toko.id,
      name: "Ulasan Pembeli",
      icon: <BsPersonCheck fontSize={20} />,
    },
    {
      path: "pengaturantoko/" + toko.id,
      name: "Pengaturan",
      icon: <BsGear />,
    },
  ];

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
        const saldoDigits = response.data.data.saldo.toString().length;
        setSaldoStarCount(saldoDigits);
        console.log("Data berhasil diambil", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
  };

  function getJadwalOperasional() {
    axios
      .get(apiurl() + "store/all-operating-hours", {
        params: {
          store_id: id,
        },
      })
      .then((response) => {
        console.log("Data Jadwal Sidebar dari server:", response.data.data[0]);
        const data = response.data.data[0].operating_hours;
        if (data && data.length > 0) {
          setJadwal(data);
          setEditingOpeningHours(data);
        } else {
          setJadwal([]);
          setEditingOpeningHours([]);
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getToko();
    getJadwalOperasional();
    window.scrollTo(0, 0);
  }, []);

  const handleChange = () => {
    setChecked(!checked);
    setIsSaldoHidden(!isSaldoHidden);
  };

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <div className="parent-sidebara">
      <div className="container-sidebar">
        <div className="sidebar">
          <div className="top_section">
            <div className="logo-toko">
              {toko.logo ? (
                <img src={toko.logo} alt="Logo Toko" />
              ) : (
                <img src={logoTokoSeller} alt="Logo Toko Seller" />
              )}
              <h3>{toko.name}</h3>
            </div>
            <div className="line-top_section"></div>
            <div className="saldo_info">
              <div className="saldo">
                <h3>Saldo</h3>
                <span>
                  {isSaldoHidden
                    ? `Rp ${formatPrice(toko.saldo)}`
                    : "*".repeat(saldoStarCount)}
                </span>
              </div>
              <div className="hide-saldo">
                <h3>Sembunyikan Saldo</h3>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <div className="line-top_section"></div>
            <div className="seller-info">
              <div className="jadwal-buka">
                <h3 className="jadwal">Jadwal Buka</h3>
                <span className="jam">24jam</span>
              </div>
              <div className="total-transaksi">
                <h3 className="jadwal">Total Transaksi</h3>
                <span className="jam">0/100</span>
              </div>
              <div className="followers">
                <h3 className="jadwal">Followers</h3>
                <span className="jam">{toko.followers}</span>
              </div>
            </div>
            <div className="line-top_section"></div>
          </div>
          {menuItem.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.path}
                onClick={item.subNav ? showSubnav : null}
                className="link"
                activeClassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
                {item.subNav && (
                  <div className="subMenu">
                    {subnav ? item.iconOpen : item.iconClosed}
                  </div>
                )}
              </NavLink>
              {subnav &&
                item.subNav?.map((subItem, subIndex) => {
                  return (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className="link-submenu"
                      activeClassName="active"
                    >
                      <div className="icon">{subItem.icon}</div>
                      <div className="subMenu_link">{subItem.name}</div>
                    </NavLink>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
