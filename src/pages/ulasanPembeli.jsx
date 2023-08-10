import React, { useState, useRef, useEffect } from "react";
import "../style/ulasanPembeli.css";
import { AiFillStar } from "react-icons/ai";
import imgpro from "../assets/image/imgProduk.svg";
import { useParams } from "react-router-dom";
import apiurl from "../utils/apiurl";
import axios from "axios";

function UlasanPembeli() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [activeFilterStar, setActiveFilterStar] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [accordionOpen2, setAccordionOpen2] = useState(false);
  const { id } = useParams();
  const tabRef = useRef(null);
  const [toko, setToko] = useState([]);

  useEffect(() => {
    getReviewById();
  }, []);

  function getReviewById() {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(apiurl() + `reviews/products?store_id=${id}`, { headers })
      .then((response) => {
        setToko(response.data.data);
        console.log("Data Store by ID:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    calculateUnderlineStyle();
  }, [activeTab]);

  const calculateUnderlineStyle = () => {
    const activeTabElement = tabRef.current.querySelector(
      `button[data-tab="${activeTab}"]`
    );
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement;
      setUnderlineStyle({
        width: offsetWidth,
        transform: `translateX(${offsetLeft}px)`,
      });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterStarClick = (star) => {
    setActiveFilterStar(star);
  };

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };
  const toggleAccordion2 = () => {
    setAccordionOpen2(!accordionOpen2);
  };

  return (
    <div className="container-ulasan">
      <div className="title-ulasan">
        <h1>Ulasan</h1>
      </div>
      <div className="box-ulasan">
        <div className="tab-navigation" ref={tabRef}>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => handleTabClick("reviews")}
            data-tab="reviews"
          >
            Ulasan Baru
          </button>
          <button
            className={activeTab === "ratings" ? "active" : ""}
            onClick={() => handleTabClick("ratings")}
            data-tab="ratings"
          >
            Belum diulas
          </button>
          <div className="tab-indicator" style={underlineStyle}></div>
        </div>
        <div className="tab-content">
          {activeTab === "reviews" && (
            <div className="newUlasan-tab">
              <div className="tab-filterStar">
                <p>Filter</p>
                <button
                  className={activeFilterStar === null ? "active" : ""}
                  onClick={() => handleFilterStarClick(null)}
                >
                  Semua
                </button>
                <button
                  className={activeFilterStar === 1 ? "active" : ""}
                  onClick={() => handleFilterStarClick(1)}
                >
                  <AiFillStar /> 1
                </button>
                <button
                  className={activeFilterStar === 2 ? "active" : ""}
                  onClick={() => handleFilterStarClick(2)}
                >
                  <AiFillStar /> 2
                </button>
                <button
                  className={activeFilterStar === 3 ? "active" : ""}
                  onClick={() => handleFilterStarClick(3)}
                >
                  <AiFillStar /> 3
                </button>
                <button
                  className={activeFilterStar === 4 ? "active" : ""}
                  onClick={() => handleFilterStarClick(4)}
                >
                  <AiFillStar /> 4
                </button>
                <button
                  className={activeFilterStar === 5 ? "active" : ""}
                  onClick={() => handleFilterStarClick(5)}
                >
                  <AiFillStar /> 5
                </button>
              </div>
              <div className="page-ulasan">
                {toko.length === 0 ? (
                  <p>Anda belum memiliki ulasan.</p>
                ) : (
                  toko?.map((review, index) => (
                    <div className="ulasan-item" key={review.id}>
                      <div className="info-ulasan">
                        <div className="rating-ulasan">
                          <AiFillStar />
                          <h3>{review.rating}</h3>
                        </div>
                        <p>
                          Oleh <span>{review.user.name}</span>
                        </p>
                        <p>{review.created_at}</p>
                      </div>
                      <div className="balas-ulasan">
                        <div className="img-ulasan">
                          <img src={imgpro} alt="" />
                          <p>{review.product.name}</p>
                        </div>
                        <div className="form-balasan">
                          <p>{review.review}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {activeTab === "ratings" && (
            <div className="belum-ulas">
              <div className="title-blmUlas">
                <h1>Produk yang belum diulas</h1>
              </div>
              <div className="pro-belum-ulas">
                <div className="table-blmUlas">
                  <div className="pro">
                    <div className="img-pro">
                      <img src={imgpro} alt="" />
                    </div>
                    <p>Jual Dodol rumput laut Per pcs</p>
                  </div>
                  <div className="pro">
                    <div className="img-pro">
                      <img src={imgpro} alt="" />
                    </div>
                    <p>Jual Dodol rumput laut Per pcs</p>
                  </div>
                  <div className="pro">
                    <div className="img-pro">
                      <img src={imgpro} alt="" />
                    </div>
                    <p>Jual Dodol rumput laut Per pcs</p>
                  </div>
                  <div className="pro">
                    <div className="img-pro">
                      <img src={imgpro} alt="" />
                    </div>
                    <p>Jual Dodol rumput laut Per pcs</p>
                  </div>
                </div>
                <div className="form-blmUlas">
                  <h3>Kirim chat kepada pembeli untuk mengulas produk</h3>
                  {/* <div className="textareaBlm">
                    <textarea
                      name=""
                      id=""
                      placeholder="Kirim Chat Kepada Pembeli agar Produkmu diulas"
                    ></textarea>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UlasanPembeli;
