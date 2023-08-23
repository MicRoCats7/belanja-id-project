import React from "react";
import Skeleton from "react-loading-skeleton";

function DetaileventSkeleton() {
  return (
    <div className="main-evnt">
      <div className="con-box-detail-evnt">
        <div className="image-detail-event" style={{ marginLeft: "20px" }}>
          <Skeleton height={300} width={400} />
        </div>
        <div className="box-event-detail" style={{ marginRight: "20px" }}>
          <div className="con-detail-event">
            <h2>
              <Skeleton width={200} />
            </h2>
            <hr />
            <div className="waktu-tgl-event">
              <p>
                <Skeleton width={100} />
              </p>
              <p>
                <Skeleton width={100} />
              </p>
            </div>
            <div className="desk-event-umkm">
              <h3>
                <Skeleton width={100} />
              </h3>
              <p className="isi-deskripsi">
                <Skeleton count={3} />
              </p>
              <h3 className="teks-ajakan">
                <Skeleton width={150} />
              </h3>
            </div>
            <div className="info-waktu-tempat">
              <div className="tgl-hari">
                <Skeleton width={20} height={20} />
                <p>
                  <Skeleton width={80} />
                </p>
              </div>
              <div className="jam-event">
                <Skeleton width={20} height={20} />
                <p>
                  <Skeleton width={80} />
                </p>
              </div>
              <div className="mentor-event">
                <Skeleton width={20} height={20} />
                <p>
                  <Skeleton width={100} />
                </p>
              </div>
            </div>
            <div className="ayo-join">
              <h3>
                <Skeleton count={2} />
              </h3>
            </div>
            <div className="btn-join-event">
              <Skeleton width={120} height={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetaileventSkeleton;
