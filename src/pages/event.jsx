import React, { useState } from "react";
import imgEvent from "../assets/image/eventimg.svg";
import "../style/event.css";
import Navbar from "../component/navbar/navbar";
import { useEffect } from "react";
import Footer from "../component/footer/footer";
import { Link } from "react-router-dom";
import { MdOutlineDateRange, MdOutlineSchedule, } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward,  } from "react-icons/io";

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
      tanggal: "2 Novemberx 2023",
      waktu: "10.00",
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
      tanggal: "2 Januari 2023",
      waktu: "10.00",
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
      tanggal: "2 Agustus 2023",
      waktu: "10.00",
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
      tanggal: "2 Agustus 2023",
      waktu: "10.00",
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
      tanggal: "21 September 2023",
      waktu: "10.00",
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
      tanggal: "20 September 2023",
      waktu: "10.00",
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
      tanggal: "5 Desember 2023",
      waktu: "10.00",
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
      tanggal: "2 September 2023",
      waktu: "10.00",
    },
    {
      id: 9,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2 Agustus 2023",
      waktu: "10.00",
    },
    {
      id: 10,
      imageEvent: imgEvent,
      nama: "GREBEG UMKM DIY 2019",
      judul:
        "BANK INDONESIA BANK SENTRAL REPUBLIK INDONEISA GREBEG UMKM DIY 2019",
      pembuatEvent: "Belanja.id ",
      deskripsi:
        "Acara ini sepenuhnya Gratis dan akan diselenggarakan hari selasa, 14-18 november 2019 pukul 11.00-12.00 WIB  Live di YouTube",
      tanggal: "2 Juli 2023",
      waktu: "10.00",
    },
  ];

  const itemsPerPage = 6; // Jumlah item per halaman
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
    <div className="event-main">
      <Navbar />
      <div className="bapak-event">
        <div className="content-event">
          {getCurrentPageItems().map((dataevent) => (
            <Link to="/detailevent">
              <div className="box-event" key={dataevent.id}>
                <div className="wrap-content-event">
                  <div className="img-event">
                    <img
                      src={dataevent.imageEvent}
                      alt=""
                      className="img-photo-event"
                    />
                  </div>
                  <div className="info">
                    <p className="data-event-nama">{dataevent.nama}</p>
                    <h3>{dataevent.judul}</h3>
                    <p className="asal-event">
                      oleh: {dataevent.pembuatEvent} Event
                    </p>
                    <p className="tanggal-event">
                      <MdOutlineDateRange />
                      Jumat, {dataevent.tanggal}
                    </p>
                    <p className="waktu-event">
                      <MdOutlineSchedule />
                      {dataevent.waktu} WIB - Selesai
                    </p>
                    <div className="button-event">
                      <button className="btn-masuk-event">Detail Event</button>
                    </div>
                  </div>
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
              <span className="arrow-back"><IoIosArrowBack /></span>
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
                 <span className="arrow-next"> <IoIosArrowForward/> </span>
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
