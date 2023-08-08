import React, { useState } from "react";
import axios from "axios";
import "../../style/modall.css";
import apiurl from "../../utils/apiurl";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ModalVerifikasiEmail({ email, user_id, onClose }) {
  const [verificationData, setVerificationData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLanjutkan = () => {
    const verificationUrl = `https://belanja.penuhmakna.co.id/public/api/email/verify/${user_id}/${email}?expires=`;
    window.location.href = verificationUrl;
  };

  const handleResendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        apiurl() + "resend-verification-email",
        {
          email_pengguna: email,
          user_id: user_id,
        }
      );
      console.log("Email berhasil dikirim ulang:", response.data.message);
      console.log("Email verification sent:", response.data);
      console.log("User ID:", response.data.user_id);
      console.log("Verification URL:", response.data.verification_url);
      console.log("Email Pengguna:", response.data.email_pengguna);
      setVerificationData(response.data.data);
    } catch (error) {
      console.error("Failed to resend verification email:", error);
    }
  };

  const handleKembaliClick = () => {
    onClose(); // Close the verification modal
    navigate("/login"); // Navigate to the home page
  };

  return (
    <div className="verification-modal-overlay">
      <div className="verification-modal">
        <h2>Verifikasi Email</h2>
        <p>
          Verifikasi email Anda dengan mengklik link yang telah kami kirimkan
          ke:
        </p>
        <p>{email}</p>
        <div className="modal-buttons">
          <button
            className="btn-lanjutkan"
            onClick={handleResendVerificationEmail}
          >
            Lanjutkan
          </button>
          <button className="btn-kembali" onClick={handleKembaliClick}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalVerifikasiEmail;
