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
  const [paises, setPaises] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "", first_name: "", last_name: "", profesionalID: "",phone: "", idioma: "es" })
  useEffect(()=>{
    countrys()
    puntero()
  },[])
  const countrys = async () => {
    await axios.get(`http://localhost:4000/country`).then(res => {setPaises(res.data)}).catch(err => console.log(err))
  }
  const registrar = async () => {
    console.log(form)
    await axios.post('http://localhost:4000/auth/register', form)
    .then(resolve => {
        alert(`${t("Alerts.register")}`)
        history.push("/")
        setForm({ username: "", email: "", password: "", first_name: "", last_name: "", profesionalID: "", phone: "", idioma: "es" })
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
              showPassword.classList.remove('fa-eye');  
              showPassword.classList.toggle('fa-eye-slash');
          } else {
              password1.type = "text"
       
              showPassword.classList.toggle("fa-eye");
              showPassword.classList.remove('fa-eye-slash');
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
      <div className="card mx-auto formContentReg wrapper fadeInDown">
        <div className="row justify-content-center reg align-items-center">
          <div className="col-md-12 p-0">
            <h3 className="text-center mb-3">{t("Header.ryc")}</h3>
            <form onSubmit={submitHandler}>

            <div className="col-md-12 p display">
              <div class="form__div col-md-6 p margen">
                <input type="text" name="first_name" class="form__input" placeholder=" " onChange={ e => setForm({...form,first_name: e.target.value})} />
                <label for="" class="form__label">{t("userS.firstN")}</label>
              </div>

              <div class="form__div col-md-6 p">
                <input type="text" name="last_name" class="form__input" placeholder=" " onChange={ e => setForm({...form,last_name: e.target.value})} />
                <label for="" class="form__label">{t("userS.lastN")}</label>
              </div>
            </div>
            
            <div className="col-md-12 p display">
              <div class="form__div col-md-6 p margen">
                <input type="text" name="username" class="form__input" placeholder=" " onChange={ e => setForm({...form,username: e.target.value})} />
                <label for="" class="form__label">{t("Header.username")}</label>
              </div>

              <div class="form__div col-md-6 p">
                <input type="email" id="email" name="email" class="form__input" placeholder=" " onChange={ e => {setForm({...form,email: e.target.value}); validarMail(e.target.value)}} />
                <label for="" class="form__label">{t("Header.email")}</label>
                <div class="invalid-feedback inRegis">{t("userS.eInvalid")}</div>
              </div>
            </div>
              
            <div className="col-md-12 p display">
              <div class="form__div col-md-6 p margen">
                <input type="password" id="password" name="password" class="pass form__input form-control password1" placeholder=" " onChange={ e => {setForm({...form,password: e.target.value}); validar(form.password)}} />
                <label for="" class="form__label">{t("Header.password")}</label>
                <span class="fa fa-fw fa-eye-slash password-icon show-password eye regEye"></span>
                <div class="invalid-feedback invalidR">{t("userS.invalid")}</div>
            </div>

              <div className="col-md-6 p0 df phone">
                <div class="col-md-3">
                  <select class="custom-select custom-select f-l mt0 form__input h4"  autocomplete="off">
                    {
                      paises.map(item=> <option selected>{item.code + item.prefix}</option>)
                    }
                  </select>
                  <label for="" class="form__label">Cod.</label>
                </div>
                
                <div class="col-md-10 ml-7">
                  <div class="form__div p">
                    <input type="text" name="profesionalID" class="form__input" placeholder=" " onChange={ e => setForm({...form,phone: e.target.value})} />
                    <label for="" class="form__label">{t("userS.phone")}</label>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="col-md-12 p display">
              <div class="form__div col-md-6 p">
                <input type="text" name="profesionalID" class="form__input" placeholder=" " onChange={ e => setForm({...form,profesionalID: e.target.value})} />
                <label for="" class="form__label">{t("userS.professionalID")}</label>
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
