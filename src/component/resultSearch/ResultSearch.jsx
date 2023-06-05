import React from "react";
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { BiBox } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import FilterSearch from "../filter/filterSearch";
import "./ResultSearch.css";
import FilterToko from "../filter/filterToko";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import Product from "../product/product";

function ResultSearch() {
  const tabRef = useRef(null);
  const [activeTab, setActiveTab] = useState("reviews");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  const query = searchParams.get("query");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchProducts();
    calculateUnderlineStyle();
  }, [query, activeTab]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiurl() + `products?query=${query}`);
      const filteredProducts = response.data.data.data.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };
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
        <div className="filter-container">
          <div className="filter-sidebar">
            <div className="filter-pro">
              {activeTab === "reviews" && <FilterSearch />}
              {activeTab === "ratings" && <FilterToko />}
            </div>
          </div>
        </div>
        <div className="resultSearch">
          <div className="tab-container">
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
              <div
                className="tab-indicator-result"
                style={underlineStyle}
              ></div>
            </div>
            <div className="tab-content">
              {products.length > 0 && (
                <div className="query-key">
                  <h2>
                    Menampilkan Barang untuk <strong>"{query}"</strong>
                  </h2>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="pengaturan-result">
                  {products.length > 0 ? (
                    products.map((item, index) => (
                      <Product
                        key={index}
                        name={item.name}
                        url={item.picturePath}
                        location={item.product_origin}
                        price={item.price}
                        rating={item.rate}
                        ulasan={item.review}
                        stok={item.stok}
                        id={item.id}
                      />
                    ))
                  ) : (
                    <div className="no-result">
                      <p>Tidak ada produk yang cocok dengan pencarian Anda.</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "ratings" && (
                <div className="pengaturan-result">
                  <h1>Toko</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ResultSearch;
