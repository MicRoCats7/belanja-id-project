import bakcground from "../assets/bglogin.svg";
import icon from "../assets/Belanja.id.svg";
import React, { useState } from "react";
import "../style/login.css";
import bglogin from "../assets/shipping.svg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import main from "../assets/bgmain.svg";
import { useForm } from "react-hook-form";
import imggoogle from "../assets/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import apiurl from "../utils/apiurl";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Proses login menggunakan API kustom
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      setLoading(true);
      const response = await axios.post(apiurl() + "login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      localStorage.setItem("token", response.data.data.access_token);
      handleSuccessAlertOpen();
      setLoading(false);
      navigate("/");
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

  console.log(successAlertOpen);

  return (
    <div className="loginn">
      <div className="bg-login">
        <div className="logo">
          <img src={icon} className="login-icon" alt="icon" />
        </div>
        <div className="background-icon">
          <img src={bglogin} className="login-icon" alt="bg login" />
        </div>
      </div>
      <div className="right">
        <div className="text-log">
          <h1>Silahkan Masuk</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form-login">
            <div className="con-form-email">
              <h3>Email</h3>
              <div className="form-email">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="input-form-email"
                />
              </div>
              <span className="validate">
                {errors.email?.type === "required" && (
                  <p role="alert">Harap isi email dahulu</p>
                )}
              </span>
            </div>
            <div className="con-form-password-login">
              <h3>Password</h3>
              <div className="form-password-login">
                <input
                  type={passwordType}
                  id="password"
                  name="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="input-form-password"
                  func={setPassword}
                />
                <button className="icon-span" onClick={handleToggle}>
                  {passwordIcon}
                </button>
              </div>
              <span className="validate">
                {errors.password?.type === "required" && (
                  <p role="alert">Harap isi password dahulu</p>
                )}
              </span>
            </div>
            <div className="button">
              <button className="btn-masuk">Masuk</button>
            </div>
          </form>
          <div className="daftar-selain">
            <div className="line-right"></div>
            <p>atau daftar dengan</p>
            <div className="line-left"></div>
          </div>
          <div className="login-google">
            <button className="masuk-google">
              <img src={imggoogle} className="login-icon" alt="icon" />
              <p className="textgl">Masuk Dengan Google</p>
            </button>
          </div>
          <div className="daftar-dengan">
            <p className="text-hitam">belum punya akun?</p>
            <Link to="/register">
              <p className="text-merah">Daftar</p>
            </Link>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-icon"></div>
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
          sx={{ width: "100%" }}
        >
          Alhamdulillah login sukses
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
          sx={{ width: "100%" }}
        >
          Login gagal. Silakan periksa kembali email dan password Anda.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
export default Login;
