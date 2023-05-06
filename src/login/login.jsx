
import bakcground from '../assets/bglogin.svg';
import icon from '../assets/Belanja.id.svg';
import React, { useEffect, useState } from 'react';
import '../style/login.css';
import bglogin from '../assets/shipping.svg';
import main from '../assets/bgmain.svg';
import { useForm } from "react-hook-form";
import imggoogle from '../assets/google.svg';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import apiurl from '../utils/apiurl';
import axios from 'axios';


function Login() {
  const [email ,setEmail] = useState("")
  const [password ,setPassword] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    // e.preventDefault()
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password',data.password);
    await axios({
      method: "post",
      url: apiurl() + 'login',
      data: formData,
      headers: { 
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log (response)
        localStorage.setItem('token', response.data.data.access_token);
      })
      .catch((error) => {
      })
  };
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash/>);
  

  const handleToggle = (e) =>{
    e.preventDefault()
    if(passwordType === 'password'){
      setPasswordType('text');
      setPasswordIcon(FaEye);
    } else {
      setPasswordType('password');
      setPasswordIcon(FaEyeSlash);
    }

  }

  return (
    <div className="login">
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
        <form onSubmit={handleSubmit(onSubmit)} className='form-login'>
          <div className="con-form-email">
            <div className='form-email'>
              <input type="text" id="email" name="email" placeholder="email" {...register("email", {required:true})} className='input-form-email'/>
            </div>
            <span className='validate'>{errors.email?.type === 'required' && <p role="alert">harap isi email dahulu</p>}</span>
          </div>
          <div className="con-form-password">
            <div className='form-password'>
                <input type={passwordType} id="password" name="password" placeholder="password"{...register("password", {required:true})} className='input-form-password'/>
                <button className='icon-span' onClick={handleToggle}>
                  {passwordIcon}
                </button>
            </div>
            <span className='validate'>{errors.password?.type === 'required' && <p role="alert">harap isi password dahulu</p>}</span>
          </div>
          <div className="button">
            <button className='btn-masuk'>Masuk</button>
          </div>
        </form>
        <div className='daftar-selain'>
          <div className='line-right'></div>
          <p>atau daftar dengan</p>
          <div className='line-left'></div>
        </div>
          <div className="login-google">
            <button className='masuk-google'>
            <img src={imggoogle} className="login-icon" alt="icon" />
            <p className='textgl'>Masuk Dengan Google</p>
            </button>
          </div>
          <div className='daftar-dengan'>
            <p className='text-hitam'>belum punya akun?</p>
            <Link to="/register">
            <p className='text-merah'>Daftar</p>
            </Link>
          </div>
      </div>
    </div>
    </div>
  );
}
export default Login;

  