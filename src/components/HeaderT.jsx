import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import '../css/btn.css'


const Header = () => {
  const [t] = useTranslation("global")

  const handleClick = lang => {
    i18next.changeLanguage(lang)
  }
  const deslogear = async() => {
    await axios.post('http://localhost:4000/auth/logout').then((result) => {
      localStorage.clear()
      alert("Se ha deslogeado de forma exitosa")
    }).catch((err) => {
      alert("ia del lado del backed tambien, porque responde co un error 404")
    });
      
    
  }
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto">T-board</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <button className="btn btn-primary mx-1" id="id_es" onClick={() => handleClick('es')}>es</button>
        <a className="btn btn-primary" id="id_es" onClick={() => handleClick('en')} >en</a>
        <a className="p-2 text-dark anchoHelp" href="">{t("Header.help")}</a>
      </nav>
      <a className="btn btn-outline-primary mx-1 anchoButtonLogout"  onClick={()=>{deslogear()}}>{ t("HeaderT.log_out")}</a>
      <a className="btn btn-outline-primary mr-2 anchoButtonSettings" href="/user_settings">{t("userS.userS")}</a>
      <a className="btn btn-outline-primary mr-2 anchoButtonLogout" href="/calculate">Calculate</a>
    </div>
  )
}
export default Header