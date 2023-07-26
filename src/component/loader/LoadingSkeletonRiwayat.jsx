import React from "react";
import DropdownProduk from "../dropdown/dropdownproduk";
import Skeleton from "react-loading-skeleton";

function LoadingSkeletonRiwayat() {
  return (
    <div className="content">
      <div className="text-histori">
        <h1>Riwayat Pesanan</h1>
      </div>
      <div className="opsi">
        <div className="search-riwayat">
          <input type="text" placeholder="Kamu Lagi nyari Pesanan yg mana? " />
          <button type="submit">Search</button>
        </div>
        <DropdownProduk />
      </div>
      <div className="form-riwayat">
        <h3>
          <Skeleton height={30} width={200} />
        </h3>
        <div className="box-riwayat">
          <Skeleton height={100} width={800} />
        </div>
        <div className="box-riwayat">
          <Skeleton height={100} width={800} />
        </div>
        <div className="box-riwayat">
          <Skeleton height={100} width={800} />
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeletonRiwayat;
