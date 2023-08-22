import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiurl from "../utils/apiurl";
import Product from "../component/product/product";
import Navbar from "../component/navbar/navbar";
import FilterSearch from "../component/filter/filterSearch";
import { BiBox } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import Loading from "../component/loader/Loading";
import "../style/categorypage.css";

function CategoryPage() {
  const { name, id } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("reviews");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [selectedProvinces, setSelectedProvinces] = useState([]);

  useEffect(() => {
    fetchCategoryProducts(maxPrice, minPrice);
    fetchCategoryName();
    window.scrollTo(0, 0);
  }, [id, minPrice, maxPrice, selectedProvinces]);

  const fetchCategoryProducts = (minPrice, maxPrice) => {
    axios
      .get(apiurl() + `products?category_id=${id}` + name, {
        params: {
          price_from: minPrice,
          price_to: maxPrice,
        },
      })
      .then((response) => {
        const filteredProducts = response.data.data.filter((product) => {
          const productPrice = parseFloat(product.price);
          const isMinPriceMatch = !minPrice || productPrice >= minPrice;
          const isMaxPriceMatch = !maxPrice || productPrice <= maxPrice;
          return isMinPriceMatch && isMaxPriceMatch;
        });

        setCategoryProducts(filteredProducts);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const fetchCategoryName = () => {
    axios
      .get(apiurl() + `categories?id=${id}`, {
        params: {
          price_from: minPrice,
          price_to: maxPrice,
        },
      })
      .then((response) => {
        setCategoryName(response.data.data.name);
      })
      .catch((error) => console.error(error));
  };

  const handlePriceFilter = (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    fetchCategoryProducts();
  };

  return (
    <>
      <Navbar />
      <div className="main-result-category">
        <div className="pro-filter">
          <div className="filter-container">
            <div className="filter-sidebar">
              <div className="filter-pro">
                <FilterSearch
                  onProvincesSelect={setSelectedProvinces}
                  onPriceFilter={handlePriceFilter}
                />
              </div>
            </div>
          </div>
          <div className="resultSearch">
            <div className="tab-container">
              <div className="tab-navigation-result-category">
                <button>
                  <BiBox fontSize={25} />
                  Produk
                </button>
                <div className="underline-category"></div>
              </div>
              <div className="tab-content">
                {isLoading ? (
                  <div className="query-key">
                    <Skeleton width={300} />
                  </div>
                ) : (
                  <>
                    {categoryProducts.length > 0 && (
                      <div className="query-key">
                        <h2>
                          Menampilkan Barang untuk{" "}
                          <strong>"{categoryName}"</strong>
                        </h2>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "reviews" && (
                  <>
                    {isLoading ? (
                      <div
                        className="pengaturan-result"
                        style={{ marginRight: "80px" }}
                      >
                        <Loading cards={5} />
                      </div>
                    ) : (
                      <>
                        {categoryProducts.length > 0 ? (
                          <div className="pengaturan-result">
                            {categoryProducts.map((item, index) => (
                              <Product
                                key={index}
                                name={item.name}
                                url={item.picturePath}
                                location={item.store?.provinces}
                                price={item.price}
                                rating={item.rate}
                                ulasan={item.review}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
