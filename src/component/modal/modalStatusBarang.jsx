import React from "react";
import { MdOutlineClose } from "react-icons/md";

function ModalStatusBarang({ selectedStatusData, onClose }) {
  const dummyStatusData = {
    id: 123,
    timeline: [
      {
        id: 1,
        timestamp: "2023-08-08T10:00:00Z",
        description: "Pesanan diterima dan sedang diproses.",
      },
      {
        id: 2,
        timestamp: "2023-08-08T11:30:00Z",
        description: "Pesanan sedang dalam proses pengiriman.",
      },
      {
        id: 3,
        timestamp: "2023-08-08T14:45:00Z",
        description: "Pesanan berhasil dikirimkan.",
      },
      {
        id: 4,
        timestamp: "2023-08-08T15:30:00Z",
        description:
          "Pesanan diterima dan sedang diproses kembali karena ada perubahan pesanan.",
      },
      {
        id: 5,
        timestamp: "2023-08-08T16:00:00Z",
        description: "Pesanan sedang dalam proses perubahan pesanan.",
      },
      {
        id: 6,
        timestamp: "2023-08-08T17:15:00Z",
        description: "Perubahan pesanan berhasil disetujui.",
      },
      {
        id: 7,
        timestamp: "2023-08-08T18:30:00Z",
        description:
          "Pesanan berhasil dikirimkan setelah perubahan pesanan selesai.",
      },
    ],
  };
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="top-popup-content">
          <h2>Status Barang</h2>
          <MdOutlineClose
            onClick={onClose}
            fontSize={30}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="timeline">
          {dummyStatusData.timeline.map((statusItem) => (
            <div key={statusItem.id} className="timeline-item">
              <div className="timeline-item-content">
                <p>
                  {new Date(statusItem.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>{statusItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalStatusBarang;
