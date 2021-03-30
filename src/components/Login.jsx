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

  const submitHandler = e => {
    e.preventDefault();

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
                <form onSubmit={submitHandler}>
                  <div className="container">

                    <div class="form-group ">
                      <i class="fa fa-user"></i>
                      <input type="text" name="email" id="email" placeholder={t("Header.example")} className="form-control" onChange={e => setLogin({ ...login, email: e.target.value })} value={login.name} />

                      
                    </div>

                    <div className="form-group">
                      <i className="fa fa-lock"></i>
                      <input type="password" name="password" id="password" placeholder='***************' className="form-control password1" onChange={e => setLogin({ ...login, password: e.target.value })} />
                      <span class="fa fa-fw fa-eye password-icon show-password"></span>
                    </div>



                    <div className="form-group text-center mt-3">
                      <button className="boton btn btn-primary " onClick={() => logear()}>{t("Header.submitt")} </button>
                      <button className="boton btn btn-primary" onClick={() => console.log(login)}>{t("Header.submitt")} </button>
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
