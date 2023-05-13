import React from "react";
import "../style/daftarproduk.css";

function DaftarProduk() {
  const data = [
    {
      name: "Anom",
      age: 19,
      gender: "Male",
      imgProduk: "https://mg.co.id/wp-content/uploads/2020/03/nr20_yel_bk.jpg",
    },
    {
      name: "Megha",
      age: 19,
      gender: "Female",
      imgProduk: "https://mg.co.id/wp-content/uploads/2020/03/nr20_yel_bk.jpg",
    },
    {
      name: "Subham",
      age: 25,
      gender: "Male",
      imgProduk: "https://mg.co.id/wp-content/uploads/2020/03/nr20_yel_bk.jpg",
    },
  ];

  return (
    <div className="container-daftarProduk">
      <h1>Daftar Produk</h1>
      <div className="btn-tambahProduk">
        <button>Tambah Produk</button>
      </div>
      <div className="table-daftarProduk">
        <div className="top-daftarProduk">
          <div className="tab-daftar">
            <h1>Semua Produk(1)</h1>
          </div>
        </div>
        <div className="filter-section">
          <div className="search-daftar">
            <input type="text" placeholder="Cari Produk" />
          </div>
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
        <div className="table-produk">
          <table>
            <tr>
              <th>Info Produk</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <img src={val.imgProduk} alt="" width={100} />
                  </td>
                  <td>{val.name}</td>
                  <td>{val.age}</td>
                  <td>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-hapus">Hapus</button>
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
