import React, { useState } from "react";
import imgEvent from "../assets/image/eventimg.svg";
import "../style/event.css";
import Navbar from "../component/navbar/navbar";
import { useEffect } from "react";
import Footer from "../component/footer/footer";
import { Link } from "react-router-dom";
import { MdOutlineDateRange, MdOutlineSchedule } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import apiurl from "../utils/apiurl";

function Event() {
  const itemsPerPage = 6; // Jumlah item per halaman
  const [event, setEvents] = useState([]);
  const totalPages = Math.ceil(event.data?.length / itemsPerPage); // Total halaman
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [currentItems, setCurrentItems] = useState([]);
  const [imageEvents, setImg] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const hasNextPage = currentPage < totalPages;

  useEffect(() => {
    getEvent();
    getImg();
  }, []);

  useEffect(() => {
    if (event.data) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentItems(event.data.slice(startIndex, endIndex));
    }
  }, [currentPage, event.data]);

  function getEvent() {
    axios
      .get(apiurl() + "events")
      .then((response) => {
        setEvents(response.data);
        console.log("Berhasil mengambil data event:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  const getImg = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(apiurl() + "event/img", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setImg(response.data.data);
        console.log("Data successfully fetched:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
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
          {currentItems.length > 0 ? (
            currentItems.map((dataevent) => (
              <Link to={`/detailevent/${dataevent.id}`} key={dataevent.id}>
                <div className="box-event">
                  <div className="wrap-content-event">
                    <div className="img-event">
                      {/* {imageEvents.map((img) =>
                        img.events_id === dataevent.id ? (
                          <img
                            key={img.id}
                            src={img.url}
                            alt=""
                            className="img-photo-event"
                          />
                        ) : (
                          <img
                            key={dataevent.id}
                            src={imgEvent}
                            alt=""
                            className="img-photo-event"
                          />
                        )
                      )} */}
                      <img
                        src={dataevent.poster || imgEvent}
                        alt=""
                        className="img-photo-event"
                      />
                    </div>
                    <div className="info">
                      <p className="data-event-nama">{dataevent.name}</p>
                      <h3>{dataevent.title}</h3>
                      <p className="asal-event">Kota: {dataevent.location}</p>
                      <p className="tanggal-event">
                        <MdOutlineDateRange />
                        {dataevent.date}
                      </p>
                      <p className="waktu-event">
                        <MdOutlineSchedule />
                        {dataevent.time}
                      </p>
                      <div className="button-event">
                        <button className="btn-masuk-event">
                          Detail Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => changePage(currentPage - 1)}
              className={currentPage === 1 ? "disabled" : ""}
            >
              <span className="arrow-back">
                <IoIosArrowBack />
              </span>
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
            {hasNextPage && (
              <button
                onClick={() => changePage(currentPage + 1)}
                className={currentPage === totalPages ? "disabled" : ""}
              >
                <span className="arrow-next">
                  <IoIosArrowForward />
                </span>
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
