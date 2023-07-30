import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar/navbar";
import Footer from "../component/footer/footer";
import { Link } from "react-router-dom";
import arrowWhislist from "../assets/icon/Vector.svg";
import "../style/whislist.css";
import Product from "../component/product/product";
import { datawhislist, responsive } from "../utils/datawhislist";
import FilterWhis from "../component/filter/filterwhislist";
import apiurl from "../utils/apiurl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import token from "../utils/token";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import imgbelanja from "../assets/image/shopping-bag-chat.svg";

function Whislist() {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [whislistData, setDataWhislist] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("terbaru");
  const navigate = useNavigate();
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const itemsPerPage = 6;

  // Menghitung total halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    getWishlist();
  }, []);

  // Mengambil data produk sesuai dengan halaman saat ini
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortingOptions = {
    terbaru: (a, b) => b.product.id - a.product.id,
    "harga-tinggi": (a, b) => b.product.price - a.product.price,
    "harga-rendah": (a, b) => a.product.price - b.product.price,
  };

  const handleSortChange = (event) => {
    const sortBy = event.target.value;
    console.log("Selected Sort Option:", sortBy);
    let sortedData = [...filteredData];

    if (sortBy in sortingOptions) {
      sortedData.sort(sortingOptions[sortBy]);
      setSelectedSortOption(sortBy);
    }
    setFilteredData(sortedData);
  };

  const handleCategoryFilterChange = (event) => {
    const category = event.target.value;
    console.log("Selected Category:", category);
    setSelectedCategory(category);

    // Filter the data based on the selected category
    if (category === "all") {
      setFilteredData(whislistData); // Display all data if "all" category is selected
    } else {
      const filteredByCategory = whislistData.filter(
        (item) => item.product.category === category
      );
      setFilteredData(filteredByCategory);
    }
  };

  // Mengubah halaman saat tombol "Previous" atau "Next" diklik
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get(apiurl() + "wishlist/all", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      if (response.status === 200) {
        setDataWhislist(response.data.data);
        setFilteredData(response.data.data);
        handleSortChange({ target: { value: "terbaru" } });
      } else {
      }
    } catch (error) {
      console.error("Gagal menambahkan produk ke wishlist:", error);
      handleErrorAlertOpen();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  function renderEmptywishlist() {
    return (
      <div className="empty-wishlist-container">
        <div className="empty-wishlist">
          <img src={imgbelanja} alt="" loading="lazy" />
          <h2>wishlist Anda Kosong</h2>
          <p>Anda belum menambahkan produk apapun ke dalam wishlist.</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Lanjut Belanja
          </button>
        </div>
      </div>
    );
  }

  const handleDeleteItem = async (wishlistId) => {
    try {
      const response = await axios.delete(
        apiurl() + "wishlist/delete/" + wishlistId,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );

      if (response.status === 200) {
        handleSuccessAlertOpen();
        console.log("Item berhasil dihapus dari API");
        // Memperbarui wishlistData dan filteredData setelah penghapusan item
        const updatedWishlist = whislistData.filter(
          (item) => item.id !== wishlistId
        );
        setDataWhislist(updatedWishlist);
        setFilteredData(updatedWishlist);
        getWishlist();
      } else {
        handleErrorAlertOpen();
      }
    } catch (error) {
      handleErrorAlertOpen();
      console.log("Gagal menghapus item dari API:", error);
    }
  };

  const productList = whislistData.map((item) => {
    if (!item.product || !item.product.id) {
      return null; // Handle cases where item.product or item.product.id is null or undefined
    }
    const isProductInWishlist = checkIfProductInWishlist(item.product.id); // Implement your logic to check if product is in the wishlist
    return (
      <Product
        key={item.product.id}
        name={item.product.name}
        url={item.product.picturePath}
        location={item.product.product_origin}
        price={item.product.price}
        rating={item.product.rate}
        ulasan={item.product.review}
        stok={item.product.stok}
        id={item.product.id}
        product={item.product}
        wishlistAdded={isProductInWishlist}
        onDelete={() => handleDeleteItem(item.id)}
      />
    );
  });
  function checkIfProductInWishlist(productId) {
    if (!whislistData || whislistData.length === 0) {
      return false; // Return false if wishlist data is null or empty
    }

    return whislistData.some(
      (item) => item.product && item.product.id === productId
    );
  }

  return (
    <div className="whislist">
      <Navbar />
      <div className="whis-page">
        <div className="whis-arrow">
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
                value={selectedSortOption}
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
            <FilterWhis
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryFilterChange}
            />
          </div>
          <div className="card-barang">
            <h2 className="barang">Barang</h2>
            {isLoading ? (
              <div className="loading">Tunggu sebentar...</div>
            ) : (
              <div
                className={`produkwishlist ${
                  selectedSortOption || selectedPriceRange ? "fade" : ""
                }`}
              >
                {productList.length > 0 ? productList : renderEmptywishlist()}
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
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Berhasil Di hapus dari wishlist
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Gagal menghapus dari wishlist
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Whislist;
