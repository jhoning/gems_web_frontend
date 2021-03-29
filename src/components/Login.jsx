import axios from 'axios';
import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';
import {useHistory} from 'react-router';

const Login = () => { 

  const history = useHistory();
  const [login, setLogin] = useState({email:"",password:""});
  const [t] = useTranslation("global")
 
  const logear = async () => { 

    await axios.post('http://localhost:4000/auth/login', {email: login.email,password: login.password})
    .then(resolve => {
      
    console.log(resolve)
    const token = resolve.data.token
    localStorage.setItem('token', token);
    history.push("/t_board")})
   
    .catch(Response=>alert(`${t("Alerts.login")}`))
   
  }
  
  const submitHandler = e => {
    e.preventDefault();
    
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
                  <div class="form-group">
                    <i class="fa fa-user"></i>
                    <input type="text" name="email" id="email" placeholder={t("Header.example")} className="form-control" onChange={ e => setLogin({...login,email: e.target.value}) } value={login.name}/>
                  </div>
                  <div className="form-group">
                    <i class="fa fa-lock"></i>
                    <input type="password" name="password" id="password" placeholder='***************' className="form-control" onChange={ e => setLogin({...login,password: e.target.value}) }/>
                  </div>
                  <div className="form-group text-center mt-3">
                    <input type="submit" className="boton btn btn-primary" value={t("Header.submitt")} onClick={()=>logear()}/>
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
