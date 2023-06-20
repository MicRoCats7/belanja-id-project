import React from "react";
import "../../style/navbar.css";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import { Link } from "react-router-dom";

function NavbarCheckout() {
  return (
    <>
      <div className="navbar">
        <div className="container-navbar">
          <div className="navbar-logo">
            <Link to={"/"}>
              <img src={logoBelanjaID} alt="logo belanja.id" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarCheckout;
