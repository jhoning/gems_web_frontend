import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router";
import axios from 'axios'
import { useHistory } from 'react-router';
import { useEffect } from 'react/cjs/react.development';

const ChangePassword = () => { 

  const history = useHistory();
  const [t] = useTranslation("global")
  useEffect(()=>{
    puntero()
  },[])
  let { token } = useParams(); 
  let [pass,setPass] = useState({
    password:"",
    confirmPassword:""
  })
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "reset": `${token}`
    }
  })
  
  const enviarNewPass = async() => {
    await authAxios.put('/auth/new-password',pass).then(res=> {alert(`${t("Alerts.claveS")}`); history.push("/")}).catch(err => alert(`${t("Alerts.claveF")}`))
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

  const validar2 = (valor)=>{
    const expresion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    console.log(expresion.test(valor))
    if( expresion.test(valor)){
  
      document.querySelector('#password2').classList.add("is-valid") 
      document.querySelector('#password2').classList.remove("is-invalid") 
    }else {
      document.querySelector('#password2').classList.add("is-invalid") 
      document.querySelector('#password2').classList.remove("is-valid") 
    }
   

  }

  const puntero = ()=> {
    window.addEventListener("load", function() {

      // icono para mostrar contraseña
      let showPassword = document.querySelector('.show-password');
      let showPassword2 = document.querySelector('.show-password2');
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

      showPassword2.addEventListener('click', () => {

        // elementos input de tipo clave
        let password2 = document.querySelector('.password2');

        if ( password2.type === "text" ) {
            password2.type = "password"
         
            showPassword.classList.remove('fa-eye-slash');
        } else {
            password2.type = "text"
     
            showPassword.classList.toggle("fa-eye-slash");
        }

    })

  });
  }

  return (
    <div className="app">
      <div className="card mx-auto my-8 formRecover wrapper fadeInDown">
        <div className="card-body pg">
          <div id="recover-row" className="row justify-content-center align-items-center">
            <div id="recover-column" className="col-md-12">
              <div id="recovern-box" className="col-md-12">
                <h3 className="mb-3">{t("userS.changeP")}</h3>
            
                  <div class="form-group clave">
                    <label>{t("userS.enterP")}</label>
                    <input type="password" name="pass" id="password" placeholder="" className="form-control password1" onChange={ e => {setPass({confirmPassword:`${pass.confirmPassword}`,password: e.target.value}); validar(pass.password) }}/>
                    <span class="fa fa-fw fa-eye password-icon show-password"></span>
                      <div class="valid-feedback">{t("userS.sMes")}</div>
                      <div class="invalid-feedback">{t("userS.invalid")}</div>
                  </div>
                  <div class="form-group clave">
                    <label>{t("userS.repeatP")}</label>
                    <input type="password" name="pass" id="password2" placeholder="" className="form-control password2" onChange={ e => {setPass({password:`${pass.password}`,confirmPassword: e.target.value}); validar2(pass.password) }}/>
                    <span class="fa fa-fw fa-eye password-icon show-password2"></span>
                      <div class="valid-feedback">{t("userS.sMes")}</div>
                      <div class="invalid-feedback">{t("userS.invalid")}</div>
                  </div>
                  <div className="form-group text-center mt-3">
                    <input type="submit" className="boton btn btn-primary" value={t("userS.update")} onClick={()=> enviarNewPass()}/>
                  </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChangePassword
