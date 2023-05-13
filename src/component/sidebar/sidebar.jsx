import React from "react";
import "../../style/sidebar.css";
import logoTokoSeller from "../../assets/image/imgToko.svg";
import { BiHome, BiMessageDetail } from "react-icons/bi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsPersonHeart, BsGear, BsArchive } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Switch } from "@mui/material";
import { useState } from "react";

function Sidebar() {
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
          path: "tambahproduk",
          name: "Tambah Produk",
        },
        {
          path: "daftarproduk",
          name: "Daftar Produk",
        },
      ],
    },
    {
      path: "pesanantoko",
      name: "Pesanan",
      icon: <HiOutlineClipboardDocumentList />,
    },
    {
      path: "ulasanpembeli",
      name: "Ulasan Pembeli",
      icon: <BsPersonHeart />,
    },
    {
      path: "pengaturantoko",
      name: "Pengaturan",
      icon: <BsGear />,
    },
  ];

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <div className="container-sidebar">
      <div className="sidebar">
        <div className="top_section">
          <div className="logo-toko">
            <img src={logoTokoSeller} alt="logo" />
            <h3>MicroSport</h3>
          </div>
          <div className="line-top_section"></div>
          <div className="saldo_info">
            <div className="saldo">
              <h3>Saldo</h3>
              <span>Rp. 100.000</span>
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
              <span className="jam">100k</span>
            </div>
          </div>
          <div className="line-top_section"></div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            onClick={item.subNav && showSubnav}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
            <div className="subMenu">
              {item.subNav && subnav
                ? item.iconClosed
                : item.subNav
                ? item.iconClosed
                : null}
            </div>
            {subnav &&
              item.subNav?.map((item, index) => {
                return (
                  <NavLink
                    to={item.path}
                    key={index}
                    className="link-submenu"
                    activeclassName="active"
                  >
                    <div className="icon">{item.icon}</div>
                    <div className="subMenu_link">{item.name}</div>
                  </NavLink>
                );
              })}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
