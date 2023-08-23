import React from "react";
import Skeleton from "react-loading-skeleton";

function EventSkeleton() {
  return (
    <div className="bapak-event" style={{ marginBottom: "30px" }}>
      <div className="content-event">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="box-event" key={index}>
            <div className="wrap-content-event">
              <div className="img-event">
                <Skeleton height={200} />
              </div>
              <div className="info">
                <p className="data-event-nama">
                  <Skeleton width={150} />
                </p>
                <h3>
                  <Skeleton width={100} />
                </h3>
                <p className="asal-event">
                  <Skeleton width={100} />
                </p>
                <p className="tanggal-event">
                  <Skeleton width={100} />
                </p>
                <p className="waktu-event">
                  <Skeleton width={100} />
                </p>
                <div className="button-event">
                  <Skeleton width={120} height={40} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventSkeleton;
