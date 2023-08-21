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
import { Link } from "react-router-dom";

function ResultSearch() {
  const tabRef = useRef(null);
  const [activeTab, setActiveTab] = useState("reviews");
  const [underlineStyle, setUnderlineStyle] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const [products, setProducts] = useState([]);
  const [tokoproducts, setTokoProduk] = useState([]);
  const query = searchParams.get("query");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [queryType, setQueryType] = useState("store");
  const [queryTypeProduk, setQueryTypeP] = useState("product");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchProducts();
    calculateUnderlineStyle();
    getStoko().then((responseData) => {
      console.log(responseData);
      if (responseData.length > 0) {
        // setSelectedStoreId(responseData[0].id);
        fetchProducts(responseData[0].id);
      }
    });
  }, [query, activeTab, categoryId]);

  const fetchProducts = async (store_id) => {
    setIsSearching(true);
    try {
      let response;

      if (queryTypeProduk === "product") {
        if (categoryId) {
          response = await axios.get(
            apiurl() + `products?categoryId=${categoryId}`
          );
        } else if (store_id) {
          response = await axios.get(
            apiurl() + `products?store_id=${store_id}`
          );
        } else {
          response = await axios.get(apiurl() + `products?query=${query}`);
        }
      } else if (queryType === "store") {
        if (store_id) {
          response = await axios.get(
            apiurl() + `products?store_id=${store_id}`
          );
        } else {
        }
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

  const getStoko = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          apiurl() + `stores?store_name=${query}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const storeData = response.data.data[0];

        if (storeData) {
          const storeId = storeData.id;

          const productsResponse = await axios.get(
            apiurl() + `products?store_id=${storeId}`
          );
          setTokoProduk(productsResponse.data.data);
        }

        return response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  //   calculateUnderlineStyle();
  //   getStoko().then((responseData) => {
  //     console.log(responseData);
  //     fetchProducts(responseData[0].id);
  //   });
  // }, [query, activeTab, categoryId]);

  // const fetchProducts = async (store_id) => {
  //   setIsSearching(true);
  //   try {
  //     let response;
  //     if (categoryId) {
  //       response = await axios.get(
  //         apiurl() + `products?categoryId=${categoryId}`
  //       );
  //     } else if (store_id) {
  //       response = await axios.get(apiurl() + `products?store_id=${store_id}`);
  //     } else {
  //       response = await axios.get(apiurl() + `products?query=${query}`);
  //     }
  //     setIsLoading(false);
  //     setIsSearching(false);
  //     const filteredProducts = response.data.data.filter((product) =>
  //       product.name.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setProducts(filteredProducts);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsSearching(false);
  //     console.error(error);
  //     setIsLoading(false);
  //   }
  // };

  // const getStoko = async () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const response = await axios.get(
  //         apiurl() + `stores?store_name=${query}`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       return response.data.data;
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       return [];
  //     }
  //   }
  // };

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
                    {queryTypeProduk === "product" && products.length > 0 ? (
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
                    ) : queryType === "store" && tokoproducts.length > 0 ? (
                      <div className="pengaturan-result">
                        {tokoproducts.map((item, index) => (
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
                          {queryType === "store"
                            ? "Tidak ada produk yang cocok dengan pencarian Anda."
                            : "Tidak ada produk toko yang cocok dengan pencarian Anda."}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {activeTab === "ratings" && (
              <>
                {tokoproducts.length > 0 ? (
                  <div className="pengaturan-result-toko">
                    {isLoading ? (
                      <div
                        className="pengaturan-result"
                        style={{ marginRight: "80px" }}
                      >
                        <Loading cards={7} />
                      </div>
                    ) : (
                      <div className="list-toko">
                        {tokoproducts.map((toko, index) => (
                          <div className="card-toko" key={index}>
                            <Link to={`/detailtoko/${toko.store?.id}`}>
                              <div className="top-card-toko">
                                <div className="img-name-toko">
                                  <img src={toko.store?.logo} />
                                  <div className="name-toko-card">
                                    <h1>{toko.store?.name}</h1>
                                    <p>{toko.store?.provinces}</p>
                                  </div>
                                </div>
                                <button>Lihat Toko</button>
                              </div>
                            </Link>
                            <div className="bottom-card-toko">
                              <h3>Produk yang dijual</h3>
                              <div className="list-produk-toko">
                                {tokoproducts.map((produk, index) => (
                                  <div className="produk-toko" key={index}>
                                    <img src={produk.picturePath} />
                                    <div className="name-price-produk">
                                      <p>{produk.name}</p>
                                      <p>Rp {produk.price}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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
