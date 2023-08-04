import React from "react";
import { Skeleton } from "@mui/material";
import "../../style/pengaturantoko.css";

const PengirimanSkeleton = () => {
  return (
    <div className="main-pengiriman">
      <div className="container-asal-pengiriman">
        <h1>
          <Skeleton variant="text" width={200} height={30} />
        </h1>
        <div className="box-container-asal-pengiriman">
          <Skeleton variant="text" width={100} height={30} />
          <Skeleton variant="text" width={300} height={50} />
          <Skeleton variant="text" width={100} height={30} />
          <Skeleton variant="text" width={300} height={50} />
        </div>
      </div>
      <div className="container-pengiriman-kurir">
        <h1>
          <Skeleton variant="text" width={200} height={30} />
        </h1>
        <div className="main-layanan-kurir">
          <div className="layanan-pengiriman-kurir">
            <h1>
              <Skeleton variant="text" width={300} height={20} />
            </h1>
            <p>
              <Skeleton variant="text" width={300} height={20} />
            </p>
          </div>
          <div className="antar-ke-kantor">
            <Skeleton variant="rectangular" width={50} height={50} />
            <div className="text-antar-ke-kantor">
              <h1>
                <Skeleton variant="text" width={150} height={20} />
              </h1>
              <p>
                <Skeleton variant="text" width={200} height={20} />
              </p>
            </div>
          </div>
        </div>
        <div className="select-pengiriman-kurir">
          {[...Array(3)].map((_, index) => (
            <div className="box-select-skeleton" key={index}>
              <Skeleton variant="rectangular" width={200} height={80} />
            </div>
          ))}
        </div>
        <div className="btn-simpan-kurir">
          <Skeleton variant="rectangular" width={160} height={40} />
        </div>
      </div>
    </div>
  );
};

export default PengirimanSkeleton;
