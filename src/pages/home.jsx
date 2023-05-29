import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Navbar from "../component/navbar/navbar";
import bgHome from "../assets/image/img-homepage.svg";
import iconKerajinanTangan from "../assets/icon/paper-crafts 1.svg";
import iconProdukPertanian from "../assets/icon/icon pertanian 1.svg";
import iconMakananMinuman from "../assets/icon/icon makanan minuman 1.svg";
import iconHerbal from "../assets/icon/herbs 1.svg";
import iconPakaian from "../assets/icon/clothes-rack 1.svg";
import iconElektronik from "../assets/icon/gadgets 1.svg";
import iconFurniture from "../assets/icon/furniture 1.svg";
import iconRumahtangga from "../assets/icon/bucket 1.svg";
import iconKaryaSeni from "../assets/icon/auction 1.svg";
import iconMainanaHobi from "../assets/icon/box 1.svg";
import iconBarangAntik from "../assets/icon/vase 1.svg";
import imgProdukPilihan from "../assets/image/img-pilihan.svg";
import imgProdukOlahan from "../assets/image/imgProdukOlahan.svg";
import imgProdukFashion from "../assets/image/fashion.svg";
import imgProdukKerajinan from "../assets/image/kerajinan tangan.svg";
import "../style/home.css";
import Product from "../component/product/product";
import { productData, responsive } from "../utils/data";
import SimpleAccordion from "../component/accordion/accordion";
import Footer from "../component/footer/footer";
import axios from "axios";
import apiurl from "../utils/apiurl";

function Home() {
  // const [product, setProduct] = useState([]);

  // function getProduct() {
  //   axios
  //     .get(apiurl() + "products")
  //     .then((response) => {
  //       setProduct(response.data);
  //     })
  //     .catch((error) => console.error(error));
  // }

  // console.log(getProduct());

  const product = productData.map((item) => (
    <Product
      name={item.name}
      url={item.image}
      price={item.price}
      rating={item.rating}
      ulasan={item.ulasan}
    />
  ));

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <div className="heroPage">
          <div className="text-ajakan">
            <h1>
              Temukan produk-produk berkualitas dari <span>UMKM</span> lokal di
              Belanja.id!
            </h1>
            <button className="btnBelanja">Belanja Sekarang</button>
          </div>
          <div className="img-homepage">
            <img src={bgHome} alt="icon keranjang" loading="lazy" />
          </div>
        </div>
        <div className="Kategori">
          <div className="title-kategori">
            <h1>Kategori Produk</h1>
          </div>
          <div className="container-kategori">
            <div className="kategori-produk">
              <img
                src={iconKerajinanTangan}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Kerajinan Tangan</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconProdukPertanian}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Produk Pertanian</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconMakananMinuman}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Makanan/Minuman</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconHerbal}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Produk Herbal</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconPakaian}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Pakaian</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconElektronik}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Elektronik</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconFurniture}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Furniture</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconRumahtangga}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Rumah Tangga</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconKaryaSeni}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Karya Seni</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconMainanaHobi}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Mainan dan Hobi</h3>
            </div>
            <div className="kategori-produk">
              <img
                src={iconBarangAntik}
                alt="icon kerajinan tangan"
                loading="lazy"
              />
              <h3>Barang Antik</h3>
            </div>
          </div>
        </div>
        <div className="produk-pilihan">
          <div className="title-produkPilihan">
            <h1>Produk Pilihan Belanja.id Untuk Kamu</h1>
          </div>
          <Carousel
            removeArrowOnDeviceType={["tablet", "mobile"]}
            className="container-produkPilihan"
            responsive={responsive}
          >
            <div className="img-produk-pilihan">
              <img src={imgProdukPilihan} alt="Produk pilihan " />
            </div>
            {product}
          </Carousel>
          <div className="line-produk"></div>
          <div className="title-produkPilihan">
            <h1>Produk Olahan Makanan Pilihan Untuk Kamu</h1>
          </div>
          <Carousel
            removeArrowOnDeviceType={["tablet", "mobile"]}
            className="container-produkPilihan"
            responsive={responsive}
          >
            <div className="img-produk-pilihan">
              <img src={imgProdukOlahan} alt="Produk pilihan " />
            </div>
            {product}
          </Carousel>
          <div className="line-produk"></div>
          <div className="title-produkPilihan">
            <h1>Produk Fashion Terbaik Untuk Kamu</h1>
          </div>
          <Carousel
            removeArrowOnDeviceType={["tablet", "mobile"]}
            className="container-produkPilihan"
            responsive={responsive}
          >
            <div className="img-produk-pilihan">
              <img src={imgProdukFashion} alt="Produk pilihan" />
            </div>
            {product}
          </Carousel>
          <div className="line-produk"></div>
          <div className="title-produkPilihan">
            <h1>Produk Kerajinan Terbaik Untuk Kamu</h1>
          </div>
          <Carousel
            removeArrowOnDeviceType={["tablet", "mobile"]}
            className="container-produkPilihan"
            responsive={responsive}
          >
            <div className="img-produk-pilihan">
              <img src={imgProdukKerajinan} alt="Produk pilihan" />
            </div>
            {product}
          </Carousel>
          <div className="line-produk"></div>
          <div className="produk-lainnya">
            <div className="title-lainnya">
              <h1>Produk Lainnya</h1>
            </div>
            <div className="container-lainnya">
              <div className="card-produk-lainnya">{product}</div>
            </div>
            <div className="container-btnSeemore">
              <button>Muat Lebih Banyak</button>
            </div>
          </div>
          <SimpleAccordion />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
