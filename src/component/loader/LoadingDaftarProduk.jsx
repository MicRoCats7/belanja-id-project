import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../style/daftarproduk.css";
import { BsPlusLg, BsTrash3 } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { formatPrice } from "../../utils/helpers";

function LoadingDaftarProduk() {
  return (
    <div className="container-daftarProduk">
    <div className="btn-tambahProduk">
      <h1>Daftar Produk</h1>
      <Link to={"/tambahproduk"}>
      <Skeleton height={40} width={100} />
      </Link>
    </div>
    <div className="table-daftarProduk">
      <div className="top-daftarProduk">
        <div className="tab-daftar">
        <Skeleton height={40} width={200} />
        </div>
      </div>
      <div className="filter-daftarproduk">
      <Skeleton height={40} width={200} />
        <div className="filter-section">
        <Skeleton height={40} width={200} />
          <Skeleton height={40} width={200} />
          <Skeleton height={40} width={200} />
        </div>
      </div>
      <div className="table-produk">
        <table>
          <tr>
          <Skeleton height={40} width={60} />
          <Skeleton height={40} width={60} />
          </tr>
              <tr>
              <Skeleton height={40} width={100} />
                <td className="info-produk">
                <Skeleton height={40} width={100} />
                <Skeleton height={40} width={100} />
                  <div className="detail-produkTbl">
                  <Skeleton height={40} width={100} />
                
                  </div>
                </td>
                <td className="harga-tbl">
                <Skeleton height={40} width={100} />
                </td>
                <td className="stoktabel">
                <Skeleton height={40} width={100} />
                </td>
                <td>
                  <div className="btn-table">
                  <Skeleton height={40} width={100} />
                <Skeleton height={40} width={100} />
                  </div>
                </td>
              </tr>
            <tr>
            </tr>
        </table>
      </div>
    </div>
  </div>
  );
}

export default LoadingDaftarProduk;
