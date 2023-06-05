import React, { useState } from "react";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";
import { Link } from "react-router-dom";
import arrowWhislist from "../assets/icon/Vector.svg";
import "../style/whislist.css";
import Product from "../component/product/product";
import { datawhislist, responsive } from "../utils/datawhislist";
import imgProdukOlahan from "../assets/image/imgProdukOlahan.svg";
import imgProdukFashion from "../assets/image/fashion.svg";
import FilterWhislist from "../component/filter/filterwhislist";

function Whislist() {
  const [filteredData, setFilteredData] = useState(datawhislist);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;

  // Menghandle perubahan pada dropdown "Urutkan"
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    let sortedData = [...filteredData];

    if (sortBy === "terbaru") {
      sortedData.sort((a, b) => b.id - a.id);
    } else if (sortBy === "harga-tinggi") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortBy === "harga-rendah") {
      sortedData.sort((a, b) => a.price - b.price);
    }

    setFilteredData(sortedData);
  };

  // Menghandle perubahan pada filter
  const handleFilterChange = (filters) => {
    setIsLoading(true);
    setSelectedCategory(filters.category); // Menyimpan kategori yang dipilih
    setCurrentPage(1);

    // Lakukan penyaringan berdasarkan filters yang diterima
    let filteredData = datawhislist.filter((item) => {
      // Contoh: Jika Anda memiliki properti "category" pada data produk
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Tambahkan kondisi lain sesuai dengan kebutuhan

      return true;
    });

    // Delay sementara untuk simulasi loading
    setTimeout(() => {
      setIsLoading(false);
      setFilteredData(filteredData);
    }, 1000);
  };

  // Menghitung total halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Mengambil data produk sesuai dengan halaman saat ini
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mengubah halaman saat tombol "Previous" atau "Next" diklik
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Daftar produk yang akan ditampilkan
  const productList = currentItems.map((item) => (
    <Product
      key={item.id}
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
            <div className="center">
              <select
                name="sortBy"
                id="sortBy"
                className="custom-select sources"
                onChange={handleSortChange}
              >
                <option value="terbaru">Terbaru</option>
                <option value="harga-tinggi">Harga Tertinggi</option>
                <option value="harga-rendah">Harga Terendah</option>
              </select>
            </div>
          </div>
        </div>
        <div className="filter">
          <div className="acc-filter">
            <h2 className="name-filter">Filter</h2>
            <FilterWhislist onFilterChange={handleFilterChange} />
          </div>
          <div className="card-barang">
            <h2 className="barang">Barang</h2>
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className={`produkwishlist ${selectedCategory ? "fade" : ""}`}>
                {productList}
              </div>
            )}
            {totalPages > 1 && (
              <div className="pagination-whislist">
                <button
                  className={`prev-btn ${currentPage === 1 ? "disabled" : ""}`}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                <button
                  className={`next-btn ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
        <Footer />
    </div>
  );
}

export default Whislist;
