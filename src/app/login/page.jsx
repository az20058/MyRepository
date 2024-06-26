"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";

export default function Login(){
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const router = useRouter();
  const emailRef = useRef();
  const pwRef = useRef();
  const signEmail = useRef();
  const signPw = useRef();
  const signPhone = useRef();
  const signUsername = useRef();
  const signBirth = useRef();

  const timeToShowLogin = 400;
  const timeToHiddenLogin = 200;
  const timeToShowSignUp = 100;
  const timeToHiddenSignUp = 400;
  const timeToHiddenAll = 500;

  const changeToLogin = () => {
      document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
      document.querySelector('.cont_form_login').style.display = "block";
      document.querySelector('.cont_form_sign_up').style.opacity = "0";

      setTimeout(() => {
        document.querySelector('.cont_form_login').style.opacity = "1";
      }, timeToShowLogin);

      setTimeout(() => {
        document.querySelector('.cont_form_sign_up').style.display = "none";
      }, timeToHiddenLogin);  
  };

  const changeToSignUp = () => {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(() => {
      document.querySelector('.cont_form_sign_up').style.opacity = "1";
    }, timeToShowSignUp);

    setTimeout(() => {
      document.querySelector('.cont_form_login').style.display = "none";
    }, timeToHiddenSignUp);
  };

  const hiddenLoginAndSignUp = () => {
    document.querySelector('.cont_forms').className = "cont_forms";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(() => {
      document.querySelector('.cont_form_sign_up').style.display = "none";
      document.querySelector('.cont_form_login').style.display = "none";
    }, timeToHiddenAll);
  };

  async function processLogin(){
    await axios.post(('http://localhost:8080/login'),null,{
      params: {
        username: emailRef.current.value,
        password: pwRef.current.value
      }
    })
    .then(res=>{
      axios.get('http://localhost:8080/userDto', {
        headers: {
          Authorization: res.headers.get('Authorization')
        }
      })
        .then(res=>{
          cookie.set("isLogin", "true");
          cookie.set("username", res.data.split(' ')[0]);
        })
        .catch(err=>{
          console.error("userDto error", err);
        })
      router.push(`/`);
    })
    .catch(err=>{
      console.error("login error", err);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      // window.location.reload();
    })
  }

  async function processSignup(){
    console.log(signBirth.current.value);
    await axios.get(`http://localhost:8080/find/login/${signUsername.current.value}`)
    .then(res=>{
      console.log(res.data);
      if(res.data){
        alert("이미 존재하는 아이디입니다.");
        window.location.reload();
      }
    })
    
    await axios.post(('http://localhost:8080/user'),{
        username: signUsername.current.value,
        password: signPw.current.value,
        email: signEmail.current.value,
        phone: signPhone.current.value,
        birth: signBirth.current.value,    
    })
    .then(res=>{
        alert("회원가입이 완료되었습니다.");
        window.location.reload();
    })
    .catch(err=>{
        console.error("post email error", err);
    })
  }

  return (
    <div className="cotn_principal">
      <div className="cont_centrar">
        <div className="cont_login">
          <div className="cont_info_log_sign_up">
            <div className="col_md_login">
              <div className="cont_ba_opcitiy">
                <h2>로그인</h2>
                <button className="btn_login" onClick={() => { changeToLogin(); }}>LOGIN</button>
              </div>
            </div>
            <div className={"col_md_sign_up"}>
              <div className="cont_ba_opcitiy">
                <h2>회원 가입</h2>
                <button className="btn_sign_up" onClick={() => { changeToSignUp(); }}>SIGN UP</button>
              </div>
            </div>
          </div>
          <div className="cont_back_info">
            <div className="cont_img_back_grey">
              <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
            </div>
          </div>
          <div className="cont_forms">
            <div className="cont_img_back_">
              <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
            </div>
            <div className={showLoginForm ? "cont_form_login active" : "cont_form_login"}>
              <a href="#" onClick={() => { hiddenLoginAndSignUp(); }}><i className="material-icons">&#xE5C4;</i></a>
              <h2>로그인</h2>
              <input type="text" placeholder="ID" ref={emailRef}/>
              <input type="password" placeholder="Password" ref={pwRef}/>
              <button className="btn_login" onClick={processLogin}>LOGIN</button>
            </div>
            <div className={showSignUpForm ? "cont_form_sign_up active" : "cont_form_sign_up"}>
              <a href="#" onClick={() => { hiddenLoginAndSignUp(); }}><i className="material-icons">&#xE5C4;</i></a>
              <h2>회원 가입</h2>
              <input type="text" placeholder="ID" ref={signUsername}/>
              <input type="password" placeholder="Password" ref={signPw}/>
              <input type="text" placeholder="email" ref={signEmail}/>
              <input type="text" placeholder="phone number" ref={signPhone}/>
              <input type="text" placeholder="Birth ex)20000802" ref={signBirth}/>
              <button className="btn_sign_up" onClick={processSignup}>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}