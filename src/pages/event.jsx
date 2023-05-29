import React, { useState } from "react";
import imgEvent from "../assets/image/eventimg.svg";
import "../style/event.css";
import Navbar from "../component/navbar/navbar";
import { useEffect } from "react";
import Footer from "../component/footer/footer";
import { Link } from "react-router-dom";

function Event() {
  const valueBoxEvent = [
    {
      id: 1,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
    {
      id: 2,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
    {
      id: 3,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
    {
      id: 4,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
    {
      id: 5,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
    {
      id: 6,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
    {
      id: 7,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
    {
      id: 8,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2",
    },
  ];

  const itemsPerPage = 3; // Jumlah item per halaman
  const totalPages = Math.ceil(valueBoxEvent.length / itemsPerPage); // Total halaman
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [currentItems, setCurrentItems] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const getPreviousPage = () => {
    return currentPage > 1 ? currentPage - 1 : currentPage;
  };
  const getNextPage = () => {
    return currentPage < totalPages ? currentPage + 1 : currentPage;
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return valueBoxEvent.slice(startIndex, endIndex);
  };
  // Data event untuk halaman saat ini

  useEffect(() => {
    // Mendapatkan data event untuk halaman saat ini
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(valueBoxEvent.slice(startIndex, endIndex));
  }, [currentPage]);

  // Mengubah halaman
  const changePage = (page) => {
    setCurrentPage(page);
    setActiveButton(page);
  };

  return (
    <div>
      <Navbar />
      <div className="bapak-event">
        <div className="content-event">
          {getCurrentPageItems().map((dataevent) => (
            <Link to="/detailevent">
              <div className="box-event" key={dataevent.id}>
                <div className="gambar-judul">
                  <div className="img-event">
                    <img src={dataevent.imageEvent} alt="" />
                  </div>
                  <p>{dataevent.nama}</p>
                </div>
                <div className= "info-event">
                  <h3>{dataevent.judul}</h3>
                  <p className="asal-event">
                    oleh: {dataevent.pembuatEvent} Event
                  </p>
                  <p className="deskripsi-event">{dataevent.deskripsi}</p>
                </div>
                <div className="waktu-event">
                  <p>{dataevent.tanggal} hari lagi</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => changePage(getPreviousPage())}
              className={activeButton === getPreviousPage() ? "active" : ""}
            >
              <span className="arrow">&#8249;</span> Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => changePage(page)}
                >
                  {page}
                </button>
              )
            )}
            {/* Button untuk halaman selanjutnya */}
            {currentPage < totalPages && (
              <button
                onClick={() => changePage(getNextPage())}
                className={activeButton === getNextPage() ? "active" : ""}
              >
                Next <span className="arrow">&#8250;</span>
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Event;
