import axios from 'axios';
import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';
import {useHistory} from 'react-router'

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
    alert("Usuario logeado de forma exitosa")
    history.push("/t_board")})
   
    .catch(Response=>console.log("no loegado"))
   
  }
  
  const submitHandler = e => {
    e.preventDefault();
    
  }

  return (
    <div className="app">
      <div className="card mx-auto my-5 formContent wrapper fadeInDown">
        <div className="card-body ">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-12">
              <div id="login-box" className="col-md-12">
                <form onSubmit={submitHandler}>
                  <h3 className="text-center mb-4">{t("Header.logeo")}</h3>
                  <div className="form-group">
                    <label htmlFor="email" className="">{t("Header.email")}</label>
                    <input type="text" name="email" id="email" placeholder={t("Header.example")} className="form-control" onChange={ e => setLogin({...login,email: e.target.value}) } value={login.name}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="">{t("Header.password")}</label>
                    <input type="password" name="password" id="password" placeholder='***************' className="form-control" onChange={ e => setLogin({...login,password: e.target.value}) }/>
                  </div>
                  <div className="form-group text-center mt-3">
                    <input type="submit" className="boton btn btn-primary" value={t("Header.submitt")} onClick={()=>logear()}/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
