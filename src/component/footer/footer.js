import React from "react";
import logoBelanjaID from "../../assets/logoIMG/logo belanjaid.svg";
import iconInstagram from "../../assets/icon/instagram.svg";
import iconTwitter from "../../assets/icon/twitter.svg";
import iconFacebook from "../../assets/icon/facebook.svg";
import "../../style/footer.css";

function Footer() {
  return (
    <div className="footer-bg">
      <div className="footer">
        <div className="container-footer-left">
          <div className="footer-logo">
            <img src={logoBelanjaID} alt="" />
            <h3>Alamat</h3>
            <p>
              Jalan Sukun Raya No.09, Besito Kulon, Besito, Kec. Gebog,
              Kabupaten Kudus, Jawa Tengah 59333
            </p>
          </div>
          <div className="footer-list">
            <h3>Belanja.id</h3>
            <ul>
              <li>Tentang kami</li>
              <li>Kebajikan privasi</li>
              <li>Kontak kami</li>
              <li>Metode pembayaran</li>
            </ul>
          </div>
        </div>
        <div className="container-footer-right">
          <div className="footer-sosmed">
            <h3>Ikuti kami di</h3>
            <div className="instagram">
              <img src={iconInstagram} alt="" />
              <h3>Instagram</h3>
            </div>
            <div className="twitter">
              <img src={iconTwitter} alt="" />
              <h3>Twitter</h3>
            </div>
            <div className="facebook">
              <img src={iconFacebook} alt="" />
              <h3>Facebook</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="privacy">
          <p>Legal</p>
          <p>Pusat Privasi</p>
          <p>Kebijakan Privasi</p>
        </div>
        <div className="copyright">
          <p>Indonesia</p>
          <p>© 2021 Belanja.id. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
