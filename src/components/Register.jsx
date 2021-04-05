import React, { useState } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router'
import { useTranslation } from 'react-i18next';
import Header from './Header';
import '../css/Register.css'
import Footer from './Footer'
import { useEffect } from 'react/cjs/react.development';
const Register = () => {
  const [t] = useTranslation("global")
  const history = useHistory()
  const [form, setForm] = useState({ username: "", email: "", password: "", first_name: "", last_name: "", profesionalID: "" })
  useEffect(()=>{
    puntero()
  },[])

  const registrar = async () => {
    
    await axios.post('http://localhost:4000/user', form)
    .then(resolve => {
        alert(`${t("Alerts.register")}`)
        history.push("/")
        setForm({ username: "", email: "", password: "", first_name: "", last_name: "", profesionalID: "" })
    })
    .catch(Response=>console.log(Response))
    
  }
  
  const submitHandler = e => {
    e.preventDefault();
    
  }

  const validar = (valor)=>{
    const expresion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    console.log(expresion.test(valor))
    if( expresion.test(valor)){
  
      document.querySelector('#password').classList.add("is-valid") 
      document.querySelector('#password').classList.remove("is-invalid") 
    }else {
      document.querySelector('#password').classList.add("is-invalid") 
      document.querySelector('#password').classList.remove("is-valid") 
    }
   

  }

  const puntero = ()=> {
    window.addEventListener("load", function() {

      // icono para mostrar contraseña
      let showPassword = document.querySelector('.show-password');
       showPassword.addEventListener('click', () => {

          // elementos input de tipo clave
          let password1 = document.querySelector('.password1');
       

          if ( password1.type === "text" ) {
              password1.type = "password"
           
              showPassword.classList.remove('fa-eye-slash');
          } else {
              password1.type = "text"
       
              showPassword.classList.toggle("fa-eye-slash");
          }

      })

  });
  }

   const validarMail = (valor) => {
    const expresionMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log(expresionMail.test(valor))
    if (expresionMail.test(valor)) {

      document.querySelector('#email').classList.add("is-valid")
      document.querySelector('#email').classList.remove("is-invalid")
    } else {
      document.querySelector('#email').classList.add("is-invalid")
      document.querySelector('#email').classList.remove("is-valid")
    }
  } 

  return (
    <div className="app"> 
      <Header />
      <div className="card mx-auto mt-5 formContentReg wrapper fadeInDown">
        <div className="row justify-content-center reg align-items-center">
          <div className="col-md-12">
            <h3 className="text-center mb-3">{t("Header.ryc")}</h3>
            <form onSubmit={submitHandler}>

            <div className="col-md-12 p display">
              <div className="form-group col-md-6 p margen">
                <input className="form-control" name="first_name" type="text" placeholder={t("userS.firstN")} onChange={ e => setForm({...form,first_name: e.target.value})}  />
              </div>
              <div className="form-group col-md-6 p">
                <input className="form-control" name="last_name" type="text" placeholder={t("userS.lastN")} onChange={ e => setForm({...form,last_name: e.target.value})} />
              </div>
            </div>
            
            <div className="col-md-12 p display">
              <div className="form-group col-md-6 p margen">
                <input className="form-control" name="username" type="text" placeholder={t("Header.username")} onChange={ e => setForm({...form,username: e.target.value})} />
              </div>
              <div className="form-group col-md-6 p ">
                <input className="form-control" id="email" name="email" type="email" placeholder={t("Header.email")} onChange={ e => {setForm({...form,email: e.target.value}); validarMail(form.email)}} />
                {/* <div class="valid-feedback">{t("userS.eMes")}</div> */}
                <div class="invalid-feedback inRegis">{t("userS.eInvalid")}</div>
              </div>
            </div>
              
            <div className="col-md-12 p display">
              <div className="form-group col-md-6 p margen">
                <input className="form-control password1" id="password" name="password" type="password" placeholder={t("Header.password")} onChange={ e => {setForm({...form,password: e.target.value}); validar(form.password)}}  />
                <span class="fa fa-fw fa-eye password-icon show-password eye regEye"></span>
                {/* <div class="valid-feedback">{t("userS.sMes")}</div> */}
                <div class="invalid-feedback invalidR">{t("userS.invalid")}</div>
              </div>
              <div className="col-md-6 p0">
                <select class="custom-select custom-select p5"  autocomplete="off">
                  <option selected>+58</option>
                  <option selected>+1</option>
                </select>
                <input className="form-control w31" name="profesionalID" type="text" placeholder={t("userS.phone")} />
                </div>
              </div>

            <div className="col-md-12 p display">
              <div className="form-group col-md-6 p margen">
                <input className="form-control" name="profesionalID" type="text" placeholder={t("userS.professionalID")} onChange={ e => setForm({...form,profesionalID: e.target.value})} />
              </div>
            </div>
              

              <input type="submit" className="botonReg btn btn-primary" value={t("Header.register")} onClick={()=>registrar()}/>
              <small className="form-text text-muted">
              {t("userS.fText1")} <a href="">{t("userS.terms")}</a> {t("userS.fText2")} <a href="">{t("userS.pState")}</a>
              </small>
            </form>
          </div>
        </div>
        <div id="formFooter">
          <span class="f13">
            {t("userS.goLogin")}
            <a class="underlineHover ml9" href="/">{t("Header.logeo")}</a>
          </span>
        </div>
      </div>
      <Footer />
    </div>
   
  )
}

export default Register
