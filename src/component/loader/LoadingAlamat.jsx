import React from "react";
import Skeleton from "@mui/material/Skeleton";

const LoadingAlamat = () => {
  return (
    <div className="contain">
      <div className="plus-alamat">
        <Skeleton height={50} width={140} style={{ marginBottom: "30px" }} />
      </div>
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="box-alamat" key={index}>
          <div className="isi-alamat">
            <div className="item-alamat">
              <div className="text-alamat">
                <Skeleton height={24} width={120} />
                <Skeleton height={30} width={120} />
              </div>
              <div className="line-atas"></div>
              <div className="nama-nomer-alamat">
                <Skeleton height={20} width={120} />
                <hr />
                <Skeleton height={20} width={80} />
              </div>
              <div className="deskripsi-alamat">
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="60%" />
              </div>
              <div className="line-bawah"></div>
              <div className="opsi-alamat">
                <Skeleton height={20} width={60} />
                <Skeleton height={20} width={100} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingAlamat;
