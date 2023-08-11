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
  const [filteredReviews, setFilteredReviews] = useState([]);

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

    if (star === null) {
      setFilteredReviews(toko); // Show all reviews
    } else {
      const filtered = toko.filter((review) => review.rate === star.toString());
      setFilteredReviews(filtered);
    }
  };
  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };
  const toggleAccordion2 = () => {
    setAccordionOpen2(!accordionOpen2);
  };

  useEffect(() => {
    setFilteredReviews(toko);
  }, [toko]);

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
                {filteredReviews.length === 0 ? (
                  <p>Tidak ada ulasan yang sesuai dengan filter ini.</p>
                ) : (
                  filteredReviews.map((review, index) => (
                    <div className="ulasan-item" key={review.id}>
                      <div className="info-ulasan">
                        <div className="rating-ulasan">
                          <AiFillStar />
                          <h3>{review.rate}</h3>
                        </div>
                        <p>
                          Oleh <span>{review.user.name}</span>
                        </p>
                        <p>
                          {new Date(review.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="balas-ulasan">
                        <div className="img-comment">
                          <img src={review.product.picturePath} alt="" />
                          {/* <img src={review.product.photo4} alt="" /> */}
                          <p className="comment-user">{review.product.name}</p>
                        </div>
                        <div className="img-ulasan">
                          {review.gallery_reviews.map((galleryReview) => (
                            <div
                              key={galleryReview.id}
                              className="img-container"
                            >
                              {galleryReview.image_path && (
                                <img src={galleryReview.image_path} alt="" />
                              )}
                              {galleryReview.image_path_2 && (
                                <img src={galleryReview.image_path_2} alt="" />
                              )}
                              {galleryReview.image_path_3 && (
                                <img src={galleryReview.image_path_3} alt="" />
                              )}
                            </div>
                          ))}
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
        </div>
      </div>
    </div>
  );
}

export default UlasanPembeli;
