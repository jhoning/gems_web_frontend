import axios from 'axios';
import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { PrimeIcons } from 'primereact/api';
import { useEffect } from 'react/cjs/react.development';

const Login = () => {

  
  const history = useHistory();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [t] = useTranslation("global")
  useEffect(()=>{
    puntero()
  },[])
  const logear = async () => {

    await axios.post('http://localhost:4000/auth/login', { email: login.email, password: login.password })
      .then(resolve => {

        console.log(resolve)
        const token = resolve.data.token
        localStorage.setItem('token', token);
        history.push("/t_board")
      })

      .catch(Response => alert(`${t("Alerts.login")}`))

  }

  /* const verificar = () => {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');
    const regexPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    const campos = {
      password: false,
    }
    const validarFormulario = (e) => {
      switch (e.target.name) {
       
        case "password":
          validarCampo(expresiones.password, e.target, 'password');
          validarPassword2();
        break;
      
      }
    }
    const validarCampo = (expresion, input, campo) => {
      if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
      } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
      }
    }
  } */

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
  return (
    <div className="app">
      <div className="card mx-auto my-8 formContent wrapper fadeInDown">
        <div className="card-body pgl">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-12 mb1">
              <div id="login-box" className="col-md-12">
                <h3 className="text-center mb-4">{t("Header.logeo")}</h3>
                <form onSubmit={submitHandler} id="formulario">
                  <div className="container">

                    <div class="form-group ">
                      <i class="fa fa-user"></i>
                      <input type="text" name="email" id="email" placeholder={t("Header.example")} className="form-control" onChange={e => {setLogin({ ...login, email: e.target.value });validar(login.password)}} value={login.name} />

                      
                    </div>

                    <div className="form-group has-danger">
                      <i className="fa fa-lock"></i>
                      <input type="password" name="password" id="password" placeholder='***************' className="form-control password1 " onChange={e => {setLogin({ ...login, password: e.target.value });validar(login.password)}} />
                      <span class="fa fa-fw fa-eye password-icon show-password"></span>
                      <div class="valid-feedback">Success!</div>
                      <div class="invalid-feedback">La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.</div>
                    
                    </div>



                    <div className="form-group text-center mt-3">
                      <button className="boton btn btn-primary " onClick={() => logear()}>{t("Header.submitt")} </button>

                    </div>
                  </div>

                </form>
              </div>
            </div>
            <span>
              {t("userS.mAccount")}
              <a class="underlineHover ml9" href="/register">{t("Header.register")}</a>
            </span>
          </div>
        </div>
        <div id="formFooter">
          <a class="underlineHover" href="/Recover">{t("Header.forgotP")}</a>
        </div>
      </div>

    </div>

  )
}
export default Login
