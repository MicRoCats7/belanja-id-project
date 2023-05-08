import React from "react";
import "../../style/sidebar.css";
import logoTokoSeller from "../../assets/image/imgToko.svg";
import { BiHome, BiMessageDetail } from "react-icons/bi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsPersonHeart, BsGear, BsArchive } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Sidebar({ children }) {
  const menuItem = [
    {
      path: "/hometoko",
      name: "Home",
      icon: <BiHome />,
    },
    {
      path: "/chat",
      name: "Chat",
      icon: <BiMessageDetail />,
    },
    {
      name: "Produk",
      icon: <BsArchive />,
    },
    {
      path: "/tambahproduk",
      name: "Tambah Produk",
    },
    {
      path: "/daftarproduk",
      name: "Dafta Produk",
    },
    {
      path: "/pesanantoko",
      name: "Pesanan",
      icon: <HiOutlineClipboardDocumentList />,
    },
    {
      path: "/ulasanpembeli",
      name: "Ulasan Pembeli",
      icon: <BsPersonHeart />,
    },
    {
      path: "/pengaturantoko",
      name: "Pengaturan",
      icon: <BsGear />,
    },
  ];
  return (
    <div className="container-sidebar">
      <div className="sidebar">
        <div className="top_section">
          <h1 className="logo">
            <img src={logoTokoSeller} alt="logo" />
            MicroSport
          </h1>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
