import React from "react";
import Skeleton from "react-loading-skeleton";

function LoadingPesananToko() {
  return (
    <>
      <div className="box-item-pesanan-baru">
        <div className="top-item-box-pesanan-baru">
          <div className="text-top-item-box-pesanan-baru">
            <Skeleton width={80} height={20} style={{ marginRight: "8px" }} />
            <h1>{<Skeleton width={120} height={20} />}</h1>
            <h1>{<Skeleton width={80} height={20} />}</h1>
          </div>
          <h1>
            <Skeleton width={90} height={20} style={{ marginLeft: "20px" }} />
          </h1>
        </div>
        <div className="product-item-pesanan-baru">
          <div className="detail-product-pesanan-baru">
            <div className="img-pesanan-baru">
              <Skeleton width={100} height={100} />
            </div>
            <div className="text-detail-pesanan-baru">
              <h2>
                <Skeleton width={160} height={20} />
              </h2>
              <p>
                <Skeleton width={80} height={20} />
              </p>
            </div>
          </div>
          <div className="detail-alamat-pesanan-baru">
            <h2>
              <Skeleton width={80} height={20} />
            </h2>
            <p>
              <Skeleton width={200} height={20} />
            </p>
            <p>
              <Skeleton width={200} height={20} />
            </p>
          </div>
          <div className="detail-kurir-pesanan-baru">
            <h2>
              <Skeleton width={60} height={20} />
            </h2>
            <p>
              <Skeleton width={120} height={20} />
            </p>
          </div>
        </div>
        <div className="btn-total-pesanan-baru">
          <h2>
            <Skeleton width={80} height={20} />
          </h2>
          <div className="con-btn-pesanan-baru">
            <Skeleton width={120} height={20} />
          </div>
        </div>
      </div>
      <div className="box-item-pesanan-baru">
        <div className="top-item-box-pesanan-baru">
          <div className="text-top-item-box-pesanan-baru">
            <Skeleton width={80} height={20} style={{ marginRight: "8px" }} />
            <h1>{<Skeleton width={120} height={20} />}</h1>
            <h1>{<Skeleton width={80} height={20} />}</h1>
          </div>
          <h1>
            <Skeleton width={90} height={20} style={{ marginLeft: "20px" }} />
          </h1>
        </div>
        <div className="product-item-pesanan-baru">
          <div className="detail-product-pesanan-baru">
            <div className="img-pesanan-baru">
              <Skeleton width={100} height={100} />
            </div>
            <div className="text-detail-pesanan-baru">
              <h2>
                <Skeleton width={160} height={20} />
              </h2>
              <p>
                <Skeleton width={80} height={20} />
              </p>
            </div>
          </div>
          <div className="detail-alamat-pesanan-baru">
            <h2>
              <Skeleton width={80} height={20} />
            </h2>
            <p>
              <Skeleton width={200} height={20} />
            </p>
            <p>
              <Skeleton width={200} height={20} />
            </p>
          </div>
          <div className="detail-kurir-pesanan-baru">
            <h2>
              <Skeleton width={60} height={20} />
            </h2>
            <p>
              <Skeleton width={120} height={20} />
            </p>
          </div>
        </div>
        <div className="btn-total-pesanan-baru">
          <h2>
            <Skeleton width={80} height={20} />
          </h2>
          <div className="con-btn-pesanan-baru">
            <Skeleton width={120} height={20} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingPesananToko;
