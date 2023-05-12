import React from "react";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";
import { Link } from "react-router-dom";
import arrowWhislist from "../assets/icon/Vector.svg";
import "../style/whislist.css";
import Product from "../component/product/product";
import { datawhislist, responsive } from "../utils/datawhislist";
import imgProdukOlahan from "../assets/image/imgProdukOlahan.svg";
import imgProdukFashion from "../assets/image/fashion.svg";
import FilterSimple from "../component/accordion/filter";

function Whislist() {
  const product = datawhislist.map((item) => (
    <Product
      name={item.name}
      url={item.image}
      price={item.price}
      rating={item.rating}
      ulasan={item.ulasan}
    />
  ));
  return (
    <div className="whislist">
      <Navbar />
      <div className="main">
        <div className="nav-whislist">
          <h3 className="whisone">Whislist</h3>
          <img src={arrowWhislist} alt="arrow" loading="lazy" />
          <h3 className="all-whist">Semua Whislist</h3>
        </div>
        <div className="drpdwn-whislist">
          <h3 className="smuawhist-teks">Semua Whislist</h3>
          <div className="drpdwn-urutkan">
            <h3 className="urutkan-teks">Urutkan</h3>
            <div class="center">
              <select
                name="sources"
                id="sources"
                class="custom-select sources"
                placeholder="Source Type"
              >
                <option value="profile">Terbaru</option>
                <option value="word">Harga tertinggi</option>
                <option value="hashtag">Harga terendah</option>
              </select>
            </div>
          </div>
        </div>
        <div className="filter">
          <div className="acc-filter">
            <h2 className="name-filter">Filter</h2>
            <div>
              <FilterSimple />
            </div>
          </div>
          <div className="card-barang">
            <h2 className="barang">barang</h2>
            <div className="produk">{product}</div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Whislist;
