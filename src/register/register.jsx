import bgregist from "../assets/bgregist.svg";
import main from "../assets/bgmain.svg";
import { useForm } from "react-hook-form";
import imggoogle from "../assets/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bakcground from "../assets/bglogin.svg";
import icon from "../assets/Belanja.id.svg";
import "../style/register.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import apiurl from "../utils/apiurl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ModalVerifikasiEmail from "../component/modal/modalVerifikasiEmail";
import ModalVerifReg from "../component/modal/modalVerifRegis";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const onSubmit = async (data) => {
    // e.preventDefault()
    console.log(data);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("name", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone || "Nomor kamu Belum Terdaftar");

    try {
      setLoading(true);
      const response = await axios.post(apiurl() + "register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleSuccessAlertOpen();
      setShowVerificationModal(true);
      console.log("showVerificationModal:", showVerificationModal);
      console.log(response);
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("user_id", response.data.data.user.id);
      setEmail(response.data.data.user.email);
      setUserId(response.data.data.user.id);
      setIsRegistered(response.data.data);
      setLoading(false);
      setTimeout(() => {
        // navigate("/login");
      }, 2000);
    } catch (error) {
      handleErrorAlertOpen();
      setLoading(false);
      console.log(error);
    }
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />);

  const handleToggle = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon(FaEye);
    } else {
      setPasswordType("password");
      setPasswordIcon(FaEyeSlash);
    }
  };

  const handleSuccessAlertOpen = () => {
    setSuccessAlertOpen(true);
  };

  const handleErrorAlertOpen = () => {
    setErrorAlertOpen(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  console.log(successAlertOpen);

  return (
    <div className="register">
      <div className="bg-regist">
        <div className="logo">
          <img src={icon} className="register-icon" alt="icon" />
        </div>
        <div className="background-icon">
          <img src={bgregist} className="register-icon" alt="bg login" />
        </div>
      </div>
      <div className="kanan">
        <div className="text-regis">
          <h1>Ayo Buat Akun</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form-regist">
            <div className="cont-form-name">
              <h3>Nama</h3>
              <div className="form-name">
                <input
                  type="text"
                  id="username"
                  name="email"
                  placeholder="Username"
                  {...register("username", { required: true })}
                  className="input-form-nama"
                  onKeyPress={handleKeyPress}
                />
              </div>
              <span className="validate">
                {errors.username?.type === "required" && (
                  <p role="alert">Harap isi nama</p>
                )}
              </span>
            </div>
            <div className="con-form-email-regis">
              <h3>Email</h3>
              <div className="form-mail-regis">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[\w-\.]+@gmail\.com$/,
                      message: "Email harus berakhiran @gmail.com",
                    },
                  })}
                  className="input-form-email-regis"
                  onKeyPress={handleKeyPress}
                />
              </div>
              <span className="validate">
                {errors.email?.type === "required" && (
                  <p role="alert">Harap isi email dahulu</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p role="alert">{errors.email.message}</p>
                )}
              </span>
            </div>
            <div className="con-form-password-regis">
              <h3>Password</h3>
              <div className="form-password-regis">
                <input
                  type={passwordType}
                  id="password"
                  name="Password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password harus terdiri dari minimal 8 karakter",
                    },
                  })}
                  className="input-form-password-regis"
                  func={setPassword}
                  onKeyPress={handleKeyPress}
                />
                <button className="icon-span" onClick={handleToggle}>
                  {passwordIcon}
                </button>
              </div>
              <span className="validate">
                {errors.password?.type === "required" && (
                  <p role="alert">Harap isi password dahulu</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p role="alert">{errors.password.message}</p>
                )}
              </span>
            </div>
            <div className="button">
              <button className="btn-masukk">Masuk</button>
            </div>
          </form>
          {/* <div className="register-selain">
            <div className="line-right"></div>
            <p>atau daftar dengan</p>
            <div className="line-left"></div>
          </div>
          <div className="regis-google">
            <button className="regis-google">
              <img src={imggoogle} className="login-icon" alt="icon" />
              <p className="textgl">Masuk Dengan Google</p>
            </button>
          </div> */}
          <div className="register-dengan">
            <p className="text-hitam">Sudah punya akun?</p>
            <Link to="/Login">
              <p className="text-merah">Masuk</p>
            </Link>
          </div>
        </div>
      </div>
      {showVerificationModal && (
        <ModalVerifReg
          email={email}
          user={user_id}
          onClose={() => setShowVerificationModal(false)}
        />
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-icon"></div>
        </div>
      )}
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={3000}
        variant="filled"
        onClose={() => setSuccessAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Alhamdulillah daftar sukses
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={3000}
        variant="filled"
        onClose={() => setErrorAlertOpen(false)}
      >
        <MuiAlert
          onClose={() => setErrorAlertOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          daftar gagal. Silakan periksa kembali nama, email, dan password Anda.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
export default Register;
