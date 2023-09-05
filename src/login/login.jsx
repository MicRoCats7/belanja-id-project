import bakcground from "../assets/bglogin.svg";
import icon from "../assets/Belanja.id.svg";
import React, { useState, useContext } from "react";
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
import ModalForgotPass from "../component/modal/modalForgotPass";
// import { SessionContext } from "../utils/googlelogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  // const { login } = useContext(SessionContext);
  const navigate = useNavigate();
  // const handleLogin = async () => {
  //   try {
  //     // Panggil API login menggunakan Google OAuth
  //     const response = await axios.get(
  //       "https://belanja.penuhmakna.co.id/public/api/auth/google/redirect"
  //     );

  //     // Jika login sukses, terima data pengguna dari response
  //     const userData = response.data.user;

  //     // Panggil fungsi login dari SessionContext dengan data pengguna
  //     login(userData);
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     // Handle error saat login gagal
  //   }
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      handleSuccessAlertOpen();
      console.log(response);
      localStorage.setItem("token", response.data.data.access_token);
      localStorage.setItem("user_id", response.data.data.user.id);
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 500);
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
                  onKeyPress={handleKeyPress}
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
              </span>
            </div>
            <div className="button">
              <button className="btn-masuk">Masuk</button>
            </div>
          </form>
          {/* <div className="daftar-selain">
            <div className="line-right"></div>
            <p>atau daftar dengan</p>
            <div className="line-left"></div>
          </div>
          <div className="login-google">
            <button className="masuk-google">
              <img src={imggoogle} className="login-icon" alt="icon" />
              <p className="textgl">Masuk Dengan Google</p>
            </button>
          </div> */}
          <div className="daftar-dengan">
            <ModalForgotPass />
          </div>
          <div className="daftar-dengan">
            <p className="text-hitam">Belum punya akun?</p>
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
          variant="filled"
          sx={{ width: "100%" }}
        >
          Kamu berhasil login!
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
          Login gagal. Silakan periksa kembali email dan password Anda.
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
export default Login;
