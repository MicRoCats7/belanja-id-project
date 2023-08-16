import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductDetailSkeleton = () => {
  return (
    <>
      <div className="detail-product">
        <div className="detail-product-img">
          <Skeleton height={400} width={500} />
          <div className="more-img">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={100} width={100} />
            ))}
          </div>
        </div>
        <div className="detail-product-desc">
          <h1>
            <Skeleton height={40} width={300} />
          </h1>
          <div className="info-desc">
            <div className="sold">
              <Skeleton height={20} width={25} />
              <h4>
                <Skeleton height={20} width={100} />
              </h4>
            </div>
            <div className="line-detail"></div>
            <div className="ratings">
              <Skeleton height={20} width={25} />
              <h4>
                <Skeleton height={20} width={100} />
              </h4>
            </div>
            <div className="like">
              <Skeleton height={20} width={25} />
              <h4>
                <Skeleton height={20} width={100} />
              </h4>
            </div>
            <div className="line-detail"></div>
            <div className="toko-detail">
              <Skeleton height={20} width={25} />
              <h4>
                <Skeleton height={20} width={100} />
              </h4>
            </div>
          </div>
          <div className="harga">
            <h2>
              <Skeleton height={30} width={120} />
            </h2>
            <h3>
              <Skeleton height={30} width={200} />
            </h3>
          </div>
          <div className="pilih-product">
            <h3>
              {" "}
              <Skeleton height={30} width={100} />
            </h3>
            <div className="pilih-product-item">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} height={30} width={150} />
              ))}
            </div>
          </div>
          <div className="kuantitas-detail">
            <h3>
              {" "}
              <Skeleton height={30} width={100} />
            </h3>
            <div className="kuantitas-item">
              <Skeleton height={40} width={150} />
            </div>
            <p>
              {" "}
              <Skeleton height={30} width={130} />
            </p>
          </div>
          <div className="btn-cartBuy">
            <Skeleton height={60} width={250} />
            <Skeleton height={60} width={250} />
          </div>
        </div>
      </div>
      <div className="deskripsi-produk">
        <h3>
          {" "}
          <Skeleton height={30} width={200} />
        </h3>
        <div className="spesifikasi-item">
          <Skeleton height={25} width={150} />
        </div>
        <p>
          {" "}
          <Skeleton
            height={30}
            width={1200}
            count={3}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <div className="penilaian-produk">
        <h3>
          {" "}
          <Skeleton height={30} width={200} />
        </h3>
        <div className="produk-dinilai">
          <div className="img-pro-dinilai">
            <Skeleton height={100} width={100} />
            <div className="name-produk-dinilai">
              <h1>
                {" "}
                <Skeleton height={20} width={130} />
              </h1>
              <h2>
                <Skeleton height={20} width={100} />
              </h2>
            </div>
          </div>
          <div className="dropdown-urutkan">
            <p className="urutkan-teks">
              {" "}
              <Skeleton height={20} width={100} />
            </p>
            <div className="center">
              <Skeleton height={30} width={120} />
            </div>
          </div>
        </div>
        <div className="tab-filterStar-penilaian">
          <p>
            {" "}
            <Skeleton height={20} width={80} />
          </p>
          <Skeleton height={25} width={80} />
          <Skeleton height={25} width={60} />
          <Skeleton height={25} width={60} />
          <Skeleton height={25} width={60} />
          <Skeleton height={25} width={60} />
          <Skeleton height={25} width={60} />
        </div>
        <div className="penilaian-item">
          <div className="penilaian-item1">
            <div className="profile-nilai">
              <div className="profile-penilaian">
                <Skeleton circle width={60} height={60} />
                <h4>
                  {" "}
                  <Skeleton height={20} width={150} />
                </h4>
              </div>
              <div className="tgl-penilaian">
                <h4>
                  {" "}
                  <Skeleton height={20} width={150} />
                </h4>
              </div>
            </div>
            <div className="desc-penilaian">
              <div className="rating">
                <h4>
                  {" "}
                  <Skeleton height={20} width={100} />
                </h4>

                <Skeleton height={20} width={170} />
              </div>
              <p>
                <Skeleton height={20} width={600} count={2} />
              </p>
            </div>
            <div className="img-produk-penilaian">
              <Skeleton height={80} width={80} />

              <Skeleton height={80} width={80} />

              <Skeleton height={80} width={80} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailSkeleton;
