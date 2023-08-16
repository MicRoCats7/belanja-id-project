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
import Loading from "../loader/Loading";
import Skeleton from "react-loading-skeleton";
import Cardtoko from "../cardToko/cardtoko";

function ResultSearch() {
  const tabRef = useRef(null);
  const [activeTab, setActiveTab] = useState("reviews");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const [products, setProducts] = useState([]);
  const query = searchParams.get("query");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchProducts();
    calculateUnderlineStyle();
  }, [query, activeTab, categoryId]);

  const fetchProducts = async () => {
    setIsSearching(true);
    try {
      let response;
      if (categoryId) {
        response = await axios.get(
          apiurl() + `products?categoryId=${categoryId}`
        );
      } else {
        response = await axios.get(apiurl() + `products?query=${query}`);
      }
      setIsLoading(false);
      setIsSearching(false);
      const filteredProducts = response.data.data.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    } catch (error) {
      setIsLoading(false);
      setIsSearching(false);
      console.error(error);
      setIsLoading(false);
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
            <div className="tab-indicator-result" style={underlineStyle}></div>
          </div>
          <div className="tab-content">
            {isLoading ? (
              <div className="query-key">
                <Skeleton width={300} />
              </div>
            ) : (
              <>
                {products.length > 0 && (
                  <div className="query-key">
                    <h2>
                      Menampilkan Barang untuk <strong>"{query}"</strong>
                    </h2>
                  </div>
                )}
              </>
            )}

            {activeTab === "reviews" && (
              <>
                {isLoading || isSearching ? (
                  <div
                    className="pengaturan-result"
                    style={{ marginRight: "80px" }}
                  >
                    <Loading cards={5} />
                  </div>
                ) : (
                  <>
                    {products.length > 0 ? (
                      <div className="pengaturan-result">
                        {products.map((item, index) => (
                          <Product
                            key={index}
                            name={item.name}
                            url={item.picturePath}
                            location={item.store?.provinces}
                            price={item.price}
                            rating={item.rate}
                            ulasan={item.sold_quantity}
                            stok={item.stok}
                            id={item.id}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="no-result">
                        <p>
                          Tidak ada produk yang cocok dengan pencarian Anda.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {activeTab === "ratings" && (
              <>
                {products.length > 0 ? (
                  <div className="pengaturan-result-toko">
                    {isLoading ? (
                      <div
                        className="pengaturan-result"
                        style={{ marginRight: "80px" }}
                      >
                        <Loading cards={7} />
                      </div>
                    ) : (
                      <>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <Cardtoko key={index} />
                        ))}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="no-result">
                    <p>Tidak ada Toko yang cocok dengan pencarian Anda.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSearch;
