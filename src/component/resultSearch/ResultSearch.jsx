import React from "react";
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { BiBox } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import FilterSearch from "../filter/filterSearch";
import "./ResultSearch.css";

function ResultSearch() {
  const tabRef = useRef(null);
  const [activeTab, setActiveTab] = useState("reviews");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  return (
    <div className="pro-filter">
      <div className="filter-pro">
        <FilterSearch />
      </div>
      <div className="resultSearch">
        {/* <p>Showing results for: {query}</p> */}
        <div className="tab-navigation-result" ref={tabRef}>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => handleTabClick("reviews")}
            data-tab="reviews"
          >
            <BiBox fontSize={25} />
            Produk
          </button>
          <button
            className={activeTab === "ratings" ? "active" : ""}
            onClick={() => handleTabClick("ratings")}
            data-tab="ratings"
          >
            <BsShop fontSize={25} />
            Toko
          </button>
          <div className="tab-indicator-result" style={underlineStyle}></div>
        </div>
        <div className="tab-content">
          {activeTab === "reviews" && (
            <div className="pengaturan-tab">
              <h1>Produk</h1>
            </div>
          )}
          {activeTab === "ratings" && (
            <div className="pengaturan-tab">
              <h1>Toko</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultSearch;
