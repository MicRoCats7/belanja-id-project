import React from "react";
import "../style/detailevent.css";
import Navbar from "../component/navbar/navbar";
import imgDetailEvnt from "../assets/image/contohimgevent.svg";
import {
  MdLeaderboard,
  MdOutlineDateRange,
  MdOutlineSchedule,
} from "react-icons/md";
import Footer from "../component/footer/footer";

function detailevent() {
  return (
    <div>
      <Navbar />
      <div className="container-event">
        <div className="image-detail-event">
          <img src={imgDetailEvnt} alt="" />
        </div>
        <div className="con-detail-event">
          <h2>
            BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019
          </h2>
          <hr />
          <div className="waktu-tgl-event">
            <p>14-18 November 2019</p>
            <p>11.00 - 12.00 WIB</p>
          </div>
          <div className="desk-event-umkm">
            <h3>Deskripsi Event UMKM</h3>
            <p className="isi-deskripsi">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <h3 className="teks-ajakan">
              Yuk, gabung di BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA
              GREBEG UMKM DIY 2019 "MENDORONG UMKM DIY MENEMBUS PASAR DUNIA
              TANPA BATAS”.
            </h3>
          </div>
          <div className="info-waktu-tempat">
            <div className="tgl-hari">
              <MdOutlineDateRange />
              <p>Selasa, 14-18 November 2019</p>
            </div>
            <div className="jam-event">
              <MdOutlineSchedule />
              <p>11:00 WIB 11:00 WIB</p>
            </div>
            <div className="mentor-event">
              <MdLeaderboard />
              <p>
                Rosaline Tandiono, S.E., M.Com., Ph.D. (Subject Content
                Coordinator - Program Master of Accounting Binus University)
              </p>
            </div>
            <p className="text-kelas-gratis">
              Kelas ini GRATIS dengan KUOTA TERBATAS!
            </p>
          </div>
          <div className="ayo-join">
            <h3>
              Tunggu apa lagi? Segera daftar dan jadilah pelaku UMKM sukses
              untuk mengelola aset dengan benar!
            </h3>
            <p>Link Pendaftaran :</p>
            <a href="https://bit.ly/grebegumkmdiy2019" target="_blank">
              https://bit.ly/grebegumkmdiy2019
            </a>
          </div>
          <div className="btn-join-event">
            <button>Join Sekarang</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default detailevent;
