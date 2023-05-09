import React from "react";
import Navbar from "../component/navbar/navbar";
import imgToko from "../assets/image/imgToko.svg";
import DropdownKotaKec from "../component/dropdown/dropdownKotaKec";
import "../style/daftartoko.css";
import Footer from "../component/footer/footer";

function DaftarToko() {
  return (
    <div>
      <Navbar />
      <div className="container-toko">
        <div className="con-img">
          <h1>Buat Toko Kamu ! </h1>
          <p>
            Jadikan tokomu yang terbaik dan memiliki produk UMKM yang
            berkualitas
          </p>
          <img src={imgToko} alt="" />
        </div>
        <div className="con-daftarToko">
          <h1>
            Halo, <span>Amri Iqro</span> ayo isi detail tokomu!
          </h1>
          <div className="con-input">
            <div className="timeline">
              <div className="step">
                <div className="step__marker">
                  <div className="step__number">
                    <div className="number-timeline">
                      <div className="circle-number">
                        <span>1</span>
                      </div>
                      <div className="timeline-toko"></div>
                    </div>
                    <div className="main-input">
                      <div className="step__marker-text">
                        <h2>Masukkan NO.HP-mu</h2>
                      </div>
                      <div className="inputNoHp">
                        <input
                          type="number"
                          name=""
                          id=""
                          placeholder="Masukkan No.Hp"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step__marker">
                  <div className="step__number">
                    <div className="number-timeline">
                      <div className="circle-number">
                        <span>2</span>
                      </div>
                      <div className="timeline-toko-domain"></div>
                    </div>
                    <div className="main-input">
                      <div className="step__marker-text">
                        <h2>Masukkan Nama Toko dan Domain </h2>
                      </div>
                      <p>Nama Toko</p>
                      <input
                        className="namatoko"
                        type="text"
                        name=""
                        id=""
                        placeholder="Masukkan Nama Toko"
                      />
                      <p>Nama Domain</p>
                      <input
                        className="namadomain"
                        type="text"
                        name=""
                        id=""
                        placeholder="Masukkan Nama Domain"
                      />
                    </div>
                  </div>
                </div>
                <div className="step__marker">
                  <div className="step__number">
                    <div className="number-timeline">
                      <div className="circle-number">
                        <span>3</span>
                      </div>
                    </div>
                    <div className="main-input">
                      <div className="step__marker-text">
                        <h2>Masukkan Alamat Tokomu</h2>
                      </div>
                      <div className="dropdown">
                        <DropdownKotaKec />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-buatToko">
                  <button className="btn-kembali">Kembali</button>
                  <button>Buat Sekarang</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DaftarToko;
