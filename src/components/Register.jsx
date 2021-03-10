import React, { useState } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router'
import { useTranslation } from 'react-i18next';
import Header from './Header';
import '../css/Register.css'
import Footer from './Footer';
const Register = () => {
  const [t] = useTranslation("global")
  const history = useHistory()
  const [form, setForm] = useState({ username: "", email: "", password: "", first_name: "", last_name: "", profesionalID: "" })
  
  const registrar = async () => {
    
    await axios.post('http://localhost:4000/user', form)
    .then(resolve => {
        alert("Usuario Registrado de forma exitosa")
        history.push("/")
        setForm({ username: "", email: "", password: "", first_name: "", last_name: "", profesionalID: "" })
    })
    .catch(Response=>console.log(Response))
    
  }
  
  const submitHandler = e => {
    e.preventDefault();
    
  }

  return (
    <div className="app">
      <Header />
      <div className="card mx-auto mt-5 registerUser">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-12">
            <h3 className="text-center mb-4">{t("Header.ryc")}</h3>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="Username" className="form-label">{t("Header.username")}</label>
                <input className="form-control" name="username" type="text" /* placeholder="Enter Username" */ onChange={ e => setForm({...form,username: e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="Email" className="form-label">{t("Header.email")}</label>
                <input className="form-control" name="email" type="email" /* placeholder="Enter Email" */ onChange={ e => setForm({...form,email: e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="Password" className="form-label">{t("Header.password")}</label>
                <input className="form-control" name="password" type="password" /* placeholder="Enter Password" */ onChange={ e => setForm({...form,password: e.target.value})}  />
              </div>
              <div className="form-group">
                <label htmlFor="First name" className="form-label">{t("userS.firstN")}</label>
                <input className="form-control" name="first_name" type="text"/*  placeholder="Enter First name" */ onChange={ e => setForm({...form,first_name: e.target.value})}  />
              </div>
              <div className="form-group">
                <label htmlFor="last name" className="form-label">{t("userS.lastN")}</label>
                <input className="form-control" name="last_name" type="text" /* placeholder="Enter Last name" */ onChange={ e => setForm({...form,last_name: e.target.value})} />
              </div>
              <div className="form-group">
                <label htmlFor="professional ID" className="form-label">{t("userS.professionalID")}</label>
                <input className="form-control" name="profesionalID" type="text" /* placeholder="Enter Profesional ID" */ onChange={ e => setForm({...form,profesionalID: e.target.value})} />
              </div>
              <input type="submit" className="btn btn-outline-primary btn-lg btn-block" value={t("Header.register")} onClick={()=>registrar()}/>
              <small className="form-text text-muted">
                By creating a account, you agree to the <a href="">Terms of Service.</a>
                         For more information about T-board's privacity terms,
                         see the <a href="">Privacy Statement.</a>
              </small>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
   
  )
}

export default Register
