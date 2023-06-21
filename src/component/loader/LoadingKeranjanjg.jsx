import React from "react";
import Skeleton from "react-loading-skeleton";

function LoadingKeranjang() {
  return (
    <div className="container-keranjang">
      <div className="container-item-keranjang">
        <h1>
          Keranjang
          {/* <Skeleton /> */}
        </h1>
        <div className="checkbox-keranjang">
          <Skeleton height={20} width={20} />
          <label htmlFor="">
            <Skeleton width={100} />
          </label>
        </div>
        <div className="line-keranjang"></div>

        {/* Render beberapa item keranjang yang sedang loading */}
        {[1, 2, 3].map((index) => (
          <div key={index} className="keranjang-item">
            <div className="checkbox-keranjang">
              <Skeleton height={20} width={20} />
              <div className="toko-keranjang">
                <div className="img-checkbox">
                  <Skeleton circle height={30} width={30} />
                </div>
                <div className="nama-toko-keranjang">
                  <h3>
                    <Skeleton width={100} />
                  </h3>
                  <p>
                    <Skeleton width={80} />
                  </p>
                </div>
              </div>
            </div>
            <div className="item-pro-detail">
              <div className="item-pro">
                <Skeleton height={20} width={20} />
                <div className="img-item-pro">
                  <Skeleton height={80} width={80} />
                </div>
                <div className="nama-item-pro">
                  <h3 className="name-pro-cart">
                    <Skeleton width={120} />
                  </h3>
                  <h4 className="harga-pro-cart">
                    <Skeleton width={80} />
                  </h4>
                  <p>
                    <Skeleton width={60} />
                  </p>
                  <p>
                    <Skeleton width={60} />
                  </p>
                </div>
              </div>
            </div>
            <div className="item-pro-bottom">
              <div className="pro-bottom-wish">
                <span>
                  <Skeleton width={120} height={20} />
                </span>
                <div className="line-bottom-wish">
                  <Skeleton height={1} />
                </div>
                <div className="kuantitas-keranjang">
                  <div className="kuantitas-item">
                    <Skeleton height={30} width={100} />
                  </div>
                </div>
              </div>
            </div>
            {/* ---------- LINE PEMISAH ---------*/}
            <div className="line-keranjang"></div>
            {/* ---------- LINE PEMISAH ---------*/}
          </div>
        ))}

        <div className="wishlist-kamu">
          <h1>
            <Skeleton width={300} />
          </h1>
          <div className="wishlist-pro-kamu">
            {[1, 2].map((index) => (
              <div key={index} className="pro-wishlist-cart">
                <div className="item-wishlist-cart">
                  <div className="img-wishlist-cart">
                    <Skeleton height={80} width={80} />
                  </div>
                  <div className="nama-wishlist-cart">
                    <h3>
                      <Skeleton width={200} />
                    </h3>
                    <span>
                      <Skeleton width={100} />
                    </span>
                    <div className="toko-wishlist-cart">
                      <div className="nama-toko-wishlist-cart">
                        <h4>
                          <Skeleton width={150} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wishlist-bottom-action">
                  <div className="icon-bottom-action">
                    <Skeleton height={40} width={40} />
                  </div>
                  <Skeleton height={40} width={250} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-subtotal">
        <div className="border-subtotal">
          <Skeleton width={330} height={70} style={{ marginBottom: "35px" }} />
          <div className="container-total-produk">
            <h2>
              <Skeleton width={200} />
            </h2>
            <div className="total-pro">
              <div className="total-pro-left">
                <p>
                  <Skeleton width={120} />
                </p>
                <p>
                  <Skeleton width={80} />
                </p>
              </div>
              <div className="total-pro-right">
                <p>
                  <Skeleton width={80} />
                </p>
                <p>
                  <Skeleton width={60} />
                </p>
              </div>
            </div>
          </div>
          <div className="line-subtotal-pro"></div>
          <div className="total-harga-cart">
            <h2>
              <Skeleton width={120} />
            </h2>
            <h2>
              <Skeleton width={80} />
            </h2>
          </div>
          <div className="btn-bayar">
            <Skeleton width={330} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingKeranjang;
