import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../style/daftarproduk.css";

function LoadingDaftarProduk() {
  return (
    <div className="container-daftarProduk">
      <div className="btn-tambahProduk">
        <h1>
          <Skeleton height={40} width={200} />
        </h1>
        <Skeleton height={40} width={200} />
      </div>
      <div className="table-daftarProduk">
        <div className="top-daftarProduk" style={{ margin: "0 20px" }}>
          <Skeleton height={30} width={200} style={{ margin: "5px 0" }} />
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
              <th>
                <Skeleton height={40} width={60} />
              </th>
              <th>
                <Skeleton height={40} width={60} />
              </th>
              <th>
                <Skeleton height={40} width={60} />
              </th>
              <th>
                <Skeleton height={40} width={60} />
              </th>
            </tr>
            <tr>
              <td className="info-produk">
                <Skeleton
                  height={30}
                  width={20}
                  style={{ marginRight: "10px" }}
                />
                <Skeleton
                  height={130}
                  width={120}
                  style={{ margin: "10px 0" }}
                />
                <div className="detail-produkTbl">
                  <Skeleton height={50} width={150} />
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
            <tr></tr>
          </table>
        </div>
        <div className="table-produk">
          <table>
            <tr>
              <td className="info-produk">
                <Skeleton
                  height={30}
                  width={20}
                  style={{ marginRight: "10px" }}
                />
                <Skeleton
                  height={130}
                  width={120}
                  style={{ margin: "10px 0" }}
                />
                <div className="detail-produkTbl">
                  <Skeleton height={50} width={150} />
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
            <tr></tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LoadingDaftarProduk;
