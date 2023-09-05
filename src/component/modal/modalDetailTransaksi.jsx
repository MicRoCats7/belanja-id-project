import React from "react";
import { MdOutlineClose, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { IoMdCopy } from "react-icons/io";
import { formatPrice } from "../../utils/helpers";

function ModalDetailTransaksi({
  selectedTransaction,
  handleCloseDetailTransaksi,
}) {
  return (
    <div className="modal-container-detail-transaksi">
      <div className="modal-content-detail-transaksi">
        <div className="top-modal-content">
          <h2>Detail Transaksi</h2>
          <MdOutlineClose onClick={handleCloseDetailTransaksi} />
        </div>
        <div className="line-top-modal-content"></div>
        <div className="title-status">
          <h1>Selesai</h1>
        </div>
        <div className="content-info-pesanan-invoice">
          <div className="no-invoice">
            <h2>No.Invoice</h2>
            <span>{selectedTransaction.id}</span>
          </div>
          <div className="tanggal-pembelian">
            <h2>Tanggal Pembelian</h2>
            <h2>
              {new Date(selectedTransaction.created_at).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </h2>
          </div>
        </div>
        <div className="title-detail-riwayat">
          <h1>Detail Produk</h1>
          <div className="btn-riawayat-toko">
            <BsShop />
            {selectedTransaction.store && (
              <h2>{selectedTransaction.store.name}</h2>
            )}
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="content-info-pesanan-produk">
          <div className="produk-pesanan-info">
            <div className="img-produk">
              {selectedTransaction.product && (
                <img src={selectedTransaction.product.picturePath} alt="" />
              )}
            </div>
            <div className="info-produk">
              {selectedTransaction.product && (
                <h2>{selectedTransaction.product_name}</h2>
              )}
              {selectedTransaction.product && (
                <h2 style={{ color: "#727272" }}>
                  {selectedTransaction.quantity}x Rp{" "}
                  {formatPrice(selectedTransaction.product_price)}
                </h2>
              )}
            </div>
          </div>
          <div className="line-content-info-pesanan-produk"></div>
          <div className="produk-pesanan-info-total">
            <div className="total-produk-pesanan-info">
              <h1>Total Harga</h1>
              <h1 style={{ color: "#000" }}>
                Rp. {formatPrice(selectedTransaction.total)}
              </h1>
            </div>
            <button className="btn-beli-lagi-info">Beli Lagi</button>
          </div>
        </div>
        <div className="info-pengiriman-rincian-biaya">
          <div className="info-pengiriman-riwayat">
            <div className="title-status">
              <h1>Info Pengiriman</h1>
            </div>
            <div className="content-info-pesanan-invoice">
              <div className="info-pengiriman-user">
                <h2>Kurir</h2>
                <p style={{ marginLeft: "19px" }}>
                  : {selectedTransaction.courier?.title}
                </p>
              </div>
              <div className="tanggal-pembelian-user">
                <h2>No.Resi</h2>
                <p>:</p>
                <span>
                  122302439297319 <IoMdCopy style={{ cursor: "pointer" }} />
                </span>
              </div>
              <div className="tanggal-pembelian-user">
                <h2>Alamat</h2>
                <p>:</p>
                {selectedTransaction.user_address && (
                  <span className="alamat-user-pembelian">
                    {selectedTransaction.user_address.receiver_name} <br />{" "}
                    <p>
                      {selectedTransaction.user_address.phone_number}{" "}
                      {selectedTransaction.user_address.address_one} -{" "}
                      {selectedTransaction.user_address.regencies} -{" "}
                      {selectedTransaction.user_address.provinces} -{" "}
                      {selectedTransaction.user_address.zip_code}
                    </p>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="rincian-biaya-riwayat">
            <div className="title-status">
              <h1>Rincian Biaya</h1>
            </div>
            <div
              className="content-info-pesanan-invoice"
              style={{ padding: "26px 15px" }}
            >
              <div className="no-invoice">
                <h2>Metode Pembayaran</h2>
                <span>Midtrans</span>
              </div>
              <div className="no-invoice">
                <h2>Jumlah barang</h2>
                <span>({selectedTransaction.quantity} barang)</span>
              </div>
              <div className="no-invoice">
                {selectedTransaction.product && <h2>Harga Barang</h2>}
                <span>Rp {formatPrice(selectedTransaction.product_price)}</span>
              </div>
              <div className="no-invoice">
                {selectedTransaction.product && (
                  <h2>
                    Total Ongkos Kirim ({selectedTransaction.product.weight} kg)
                  </h2>
                )}
                <span>Rp {formatPrice(selectedTransaction.shipping_cost)}</span>
              </div>
              <div className="tanggal-pembelian">
                <h2 style={{ fontSize: "20px", color: "#000" }}>
                  Total Belanja
                </h2>
                <h2 style={{ fontSize: "20px", color: "#EF233C" }}>
                  Rp {formatPrice(selectedTransaction.total)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetailTransaksi;
