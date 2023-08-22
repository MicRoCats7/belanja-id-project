import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../../style/modall.css";
import { useEffect } from "react";
import axios from "axios";
import apiurl from "../../utils/apiurl";
import token from "../../utils/token";
import { MdOutlineClose } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";

function ModalDelToko({ onClose, product, onDelete }) {
  const [modal, setModal] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const handleDeleteItem = async (produkId) => {
    try {
      const response = await axios.delete(apiurl() + "products/" + produkId, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      if (response.status === 200) {
        handleSuccessAlertOpen();
        console.log("Item berhasil dihapus dari API");
        onDelete(product.id);
      } else {
      }
    } catch (error) {
      handleErrorAlertOpen();
      console.log("Gagal menghapus item dari API:", error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    if (successAlertOpen || errorAlertOpen) {
      setModal(false); // Tutup modal jika pesan sukses atau pesan error ditampilkan
    }
  }, [successAlertOpen, errorAlertOpen]);

  return (
    <>
      <button className="btn-hapus" onClick={toggleModal}>
        <BsTrash3 />
        Hapus
      </button>
      {modal && (
        <div className="modal-delete">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-delete">
            <div className="wrap-tulisan-email">
              <h3 className="hapus-produk-ini">
                Yakin Ingin Menghapus Produk Ini?
              </h3>
              <p>Produk yang sudah dihapus tidak bisa kembali lagi</p>
            </div>
            <div className="wrapper-del-cancel">
              <button
                className="btn-delete-popup"
                onClick={() => handleDeleteItem(product.id)}
              >
                Hapus
              </button>
              <button className="btn-cancel-product" onClick={toggleModal}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Berhasil Menghapus Produk
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Maaf, Gagal Menghapus Produk
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default ModalDelToko;
