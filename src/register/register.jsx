import bgregist from '../assets/bgregist.svg';
import main from '../assets/bgmain.svg';
import { useForm } from "react-hook-form";
import imggoogle from '../assets/google.svg';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import bakcground from '../assets/bglogin.svg';
import icon from '../assets/Belanja.id.svg';
import '../style/register.css';
import React, { useState } from 'react';

function Register(){
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash/>);

  const handleToggle = () =>{
    if(passwordType === 'password'){
      setPasswordType('text');
      setPasswordIcon(FaEye);
    } else {
      setPasswordType('password');
      setPasswordIcon(FaEyeSlash);
    }

  }
    
    return(
        <div className="register">
        <div className="bg-regist">
          <div className="logo">
            <img src={icon} className="login-icon" alt="icon" />
          </div>
          <div className="background-icon">
            <img src={bgregist} className="login-icon" alt="bg login" />
          </div>
        </div>
        <div className="kanan">
          <div className="text-regis">
            <h1>Ayo Buat Akun</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form-regist'>
            <div className="cont-form-name">
                <div className='form-name'>
                  <input type="text" id="nama" name="email" placeholder="nama" {...register("nama", {required:true})} className='input-form-nama'/>
                </div>
                <span className='validate'>{errors.nama?.type === 'required' && <p role="alert">harap isi nama</p>}</span>
              </div>
              <div className="con-form-email">
                <div className='form-mail'>
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
                <button className='btn-masukk'>Masuk</button>
              </div>
            </form>
            <div className='daftar-selain'>
              <div className='line-right'></div>
              <p>atau daftar dengan</p>
              <div className='line-left'></div>
            </div>
              <div className="regis-google">
                <button className='regis-google'>
                <img src={imggoogle} className="login-icon" alt="icon" />
                <p className='textgl'>Masuk Dengan Google</p>
                </button>
              </div>
              <div className='daftar-dengan'>
                <p className='text-hitam'>sudah punya akun?</p>
                <Link to="/Login">
                <p className='text-merah'>Masuk</p>
                </Link>
              </div>
          </div>
        </div>
        </div>
    );
}
export default Register;