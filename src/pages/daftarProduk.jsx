import React from "react";
import "../style/daftarproduk.css";
import { BsPlusLg, BsTrash3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BiPencil } from "react-icons/bi";

function DaftarProduk() {
  const data = [
    {
      id: "1",
      harga: "10.000.000",
      stok: 19,
      gender: "Male",
      imgProduk: "https://mg.co.id/wp-content/uploads/2020/03/nr20_yel_bk.jpg",
      namaProduk: "Raket Li-ning",
      nomorSKU: "AM241",
    },
    {
      id: "2",
      harga: "10.000.000",
      stok: 19,
      gender: "Female",
      imgProduk: "https://mg.co.id/wp-content/uploads/2020/03/nr20_yel_bk.jpg",
      namaProduk: "Raket Li-ning",
      nomorSKU: "AM241",
    },
    {
      id: "3",
      harga: "10.000.000",
      stok: 25,
      gender: "Male",
      imgProduk: "https://mg.co.id/wp-content/uploads/2020/03/nr20_yel_bk.jpg",
      namaProduk: "Raket Li-ning",
      nomorSKU: "AM241",
    },
  ];

  return (
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
            <h1>Semua Produk(1)</h1>
          </div>
        </div>
        <div className="filter-daftarproduk">
          <div className="search-daftar">
            <CiSearch />
            <input type="text" placeholder="Cari Produk" />
          </div>
          <div className="filter-section">
            <div className="dropdown-produk">
              <select name="kategori-produk" id="kategori-produk">
                <option value="kategori-produk">Kategori Produk</option>
                <option value="kategori-produk">Kategori Produk</option>
                <option value="kategori-produk">Kategori Produk</option>
                <option value="kategori-produk">Kategori Produk</option>
              </select>
            </div>
            <div className="dropdown-produk">
              <select name="filter-produk" id="filter-produk">
                <option value="kategori-produk">Filter</option>
                <option value="kategori-produk">Kategori Produk</option>
                <option value="kategori-produk">Kategori Produk</option>
                <option value="kategori-produk">Kategori Produk</option>
              </select>
            </div>
            <div className="dropdown-produk">
              <select name="urutkan-produk" id="urutkan-produk">
                <option value="kategori-produk">Urutkan</option>
                <option value="kategori-produk">Kategori Produk</option>
                <option value="kategori-produk">Kategori Produk</option>
                <option value="kategori-produk">Kategori Produk</option>
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
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td className="info-produk">
                    <img src={val.imgProduk} alt="" width={100} />
                    <div className="detail-produkTbl">
                      <h3>{val.namaProduk}</h3>
                      <p>SKU : {val.nomorSKU}</p>
                    </div>
                  </td>
                  <td className="harga-tbl">
                    <div className="harga-info">
                      <div className="box-harga">
                        <h4>Rp</h4>
                      </div>
                      <h3>{val.harga}</h3>
                    </div>
                  </td>
                  <td className="stoktabel">
                    <div className="stokTbl">
                      <h3>{val.stok}</h3>
                    </div>
                  </td>
                  <td>
                    <div className="btn-table">
                      <button className="btn-edit">
                        <BiPencil />
                        Edit
                      </button>
                      <button className="btn-hapus">
                        <BsTrash3 />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default DaftarProduk;
