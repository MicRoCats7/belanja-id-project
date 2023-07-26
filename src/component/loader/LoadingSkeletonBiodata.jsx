import React from "react";
import Skeleton from "react-loading-skeleton";

function LoadingSkeletonBiodata() {
  return (
    <div className="box-biodata">
      <div className="top-text">
        <p className="text-judul">
          <Skeleton height={30} width={200} />
        </p>
      </div>
      <div className="container">
        <div className="biodata-kiri">
          <div className="box-photo">
            <div>
              <Skeleton height={300} width={200} />
              <div className="isibox">
                <Skeleton height={50} />
              </div>
            </div>
          </div>
        </div>
        <div className="biodata-kanan">
          <h3 className="edit-biodata">
            <Skeleton height={30} width={200} />
          </h3>
          <div className="edit-nama">
            <span className="nama-text">
              <Skeleton height={20} width={100} />
            </span>
            <span className="nama-user-biodata">
              <Skeleton width={200} />
            </span>
            <div>
              <Skeleton height={30} width={100} />
            </div>
          </div>
          <div className="edit-tanggal">
            <span className="nama-tgl">
              <Skeleton height={20} width={100} />
            </span>
            <div>
              <Skeleton height={30} width={200} />
            </div>
          </div>
          <h3 className="ubah-kontak">
            <Skeleton height={30} width={200} />
          </h3>
          <div className="edit-kontak">
            <span className="email-text">
              <Skeleton height={20} width={100} />
            </span>
            <span className="email-user-profile">
              <Skeleton width={200} />
            </span>
            <div className="data-verifikasi">
              <Skeleton height={20} width={100} />
            </div>
          </div>
          <div className="edit-nohp">
            <span className="text-nohp">
              <Skeleton height={20} width={100} />
            </span>
            <span className="email-user-profile">
              <Skeleton width={200} />
            </span>
            <Skeleton height={20} width={200} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeletonBiodata;
