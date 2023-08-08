import React, { useEffect, useState } from "react";
import "../style/daftarproduk.css";
import { BsPlusLg, BsTrash3 } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BiPencil } from "react-icons/bi";
import axios from "axios";
import apiurl from "../utils/apiurl";
import token from "../utils/token";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { formatPrice } from "../utils/helpers";
import LoadingDaftarProduk from "../component/loader/LoadingDaftarProduk";

function DaftarProduk() {
  const [products, setProduct] = useState([]); // Ensure the initial state is an empty array
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [filter, setFilter] = useState(""); // State untuk menyimpan nilai filter
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [conditionFilter, setConditionFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceSortOption, setPriceSortOption] = useState("default");

  function performSearch(searchQuery) {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        (product.name.toLowerCase().includes(lowercasedQuery) ||
          product.sku.toLowerCase().includes(lowercasedQuery)) &&
        (conditionFilter === "all" ||
          product.kondisi_produk.toLowerCase() === conditionFilter) &&
        (selectedCategory === "all" || product.category_id === selectedCategory)
    );

    if (priceSortOption === "harga-tertinggi") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (priceSortOption === "harga-terendah") {
      filtered.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(filtered);
  }

  function getProductByUserId() {
    axios
      .get(apiurl() + "products", {
        params: {
          store_id: id,
        },
      })
      .then((response) => {
        console.log("Data produk dari server:", response.data.data);
        setProduct(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }

  const handleDeleteItem = async (produkId) => {
    try {
      const response = await axios.delete(apiurl() + "products/" + produkId, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      if (response.status === 200) {
        handleSuccessAlertOpen();
        console.log("Item berhasil dihapus dari API");
        // Memperbarui wishlistData dan filteredData setelah penghapusan item
        const updatedWishlist = products.filter((item) => item.id !== produkId);
        setProduct(updatedWishlist);
        getProductByUserId();
      } else {
      }
    } catch (error) {
      handleErrorAlertOpen();
      console.log("Gagal menghapus item dari API:", error);
    }   
  };

  // useEffect(() => {
  //   // Fetch the product list from the server
  //   axios
  //     .get(apiurl() + "products", {
  //       headers: {
  //         Authorization: `Bearer ${token()}`,
  //       },
  //     })
  //     .then((response) => {
  //       setProducts(response.data.data.data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  function getCategories() {
    axios
      .get(apiurl() + "categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log("Categories data:", response.data.data);
      })
      .catch((error) => console.error(error));
  }

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  useEffect(() => {
    getProductByUserId();
    getCategories();
  }, []);

  useEffect(() => {
    performSearch(filter, priceSortOption);
  }, [filter, products, conditionFilter, selectedCategory, priceSortOption]);

  return (
    // <>
    //   {isLoading ? (
    //     <LoadingDaftarProduk />
    //   ) : (
    <div className="container-daftarProduk">
      <div className="btn-tambahProduk">
        <h1>Daftar Produk</h1>
        <Link to={"/tambahproduk"}>
          <button className="tambah">
            <BsPlusLg />
            Tambah Produk
          </button>
        </Link>
      </div>
      <div className="table-daftarProduk">
        <div className="top-daftarProduk">
          <div className="tab-daftar">
            <h1>Semua Produk({products.length})</h1>
          </div>
        </div>
        <div className="filter-daftarproduk">
          <div className="search-daftar">
            <CiSearch />
            <input
              type="text"
              placeholder="Cari Produk"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="filter-section">
            <div className="dropdown-produk">
              <select
                name="kategori-produk"
                id="kategori-produk"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Semua</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-produk">
              <select
                name="kategori-produk"
                id="kategori-produk"
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
              >
                <option value="all">filter</option>
                <option value="baru">Baru</option>
                <option value="bekas">Bekas</option>
              </select>
            </div>
            <div className="dropdown-produk">
              <select
                name="urutkan-produk"
                id="urutkan-produk"
                value={priceSortOption} // Memberikan nilai state priceSortOption pada value
                onChange={(e) => setPriceSortOption(e.target.value)} // Update state priceSortOption saat pengguna memilih opsi pengurutan harga
              >
                <option value="default">Urutkan</option>
                <option value="harga-tertinggi">Harga Tertinggi</option>
                <option value="harga-terendah">Harga Terendah</option>
              </select>
            </div>
          </div>
        </div>
        <div className="table-produk">
          <table>
            <tr>
              <th>No</th>
              <th>INFO PRODUK</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td className="info-produk">
                    <img
                      src={product.picturePath}
                      alt={product.name}
                      width={100}
                    />
                    <div className="detail-produkTbl">
                      <h3>{product.name}</h3>
                      <p>SKU : {product.sku}</p>
                    </div>
                  </td>
                  <td className="harga-tbl">
                    <div className="harga-info">
                      <div className="box-harga">
                        <h4>Rp</h4>
                      </div>
                      <h3>{formatPrice(product.price)}</h3>
                    </div>
                  </td>
                  <td className="stoktabel">
                    <div className="stokTbl">
                      <h3>{product.quantity}</h3>
                    </div>
                  </td>
                  <td>
                    <div className="btn-table">
                      <button className="btn-edit">
                        <Link to={`/ubahProduk/${product.id}`}>Edit</Link>
                      </button>
                      <button
                        className="btn-hapus"
                        onClick={() => handleDeleteItem(product.id)}
                      >
                        <BsTrash3 />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Render a placeholder if products are not found based on the filter
              <tr>
                <td colSpan="5" className="alert-notfound">
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
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
          Data Product Berhasil dihapus!
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
          Data Product gagal dihapus
        </MuiAlert>
      </Snackbar>
    </div>
    // )}
    // </>
  );
}

export default DaftarProduk;
