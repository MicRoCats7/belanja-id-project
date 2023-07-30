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
        <Skeleton height={30} width={50} />
        <Link to={"/tambahproduk"}>
          <Skeleton height={20} width={20} />
        </Link>
      </div>
      <div className="table-daftarProduk">
        <div className="top-daftarProduk">
          <div className="tab-daftar">
            <Skeleton height={10} width={20} />
          </div>
        </div>
        <div className="filter-daftarproduk">
          <Skeleton height={30} width={30} />
          <div className="filter-section">
          <Skeleton height={30} width={30} />
            <div className="dropdown-produk">
            <Skeleton height={30} width={30} />
            </div>
            <div className="dropdown-produk">
            <Skeleton height={30} width={30} />
            </div>
          </div>
        </div>
        <div className="table-produk">
          <table>
            <tr>
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
            </tr>
                <tr>
                  <td className="info-produk">
                  <Skeleton height={30} width={30} />
                    <div className="detail-produkTbl">
                    </div>
                  </td>
                  <td className="harga-tbl">
                    <div className="harga-info">
                    <Skeleton height={30} width={30} />
                    </div>
                  </td>
                  <td className="stoktabel">
                  <Skeleton height={30} width={30} />
                  </td>
                  <td>
                    <div className="btn-table">
                    <Skeleton height={30} width={30} />
                    <Skeleton height={30} width={30} />
                    </div>
                  </td>
                </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LoadingDaftarProduk;
