import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import '../css/btn.css';
import '../css/Main.css';
import es from '../img/espana.svg';
import en from '../img/estados-unidos.svg';
import logo from '../img/logo.png';
import {useHistory} from 'react-router';

const URLactual = window.location;
const token = localStorage.getItem('token')
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })  

const Header = () => {
  const history = useHistory();
  const [t] = useTranslation("global")
  const idioma = localStorage.getItem('i18nextLng')
  const handleClick = lang => {
    i18next.changeLanguage(lang)
  }
  const deslogear = () => {

      localStorage.removeItem('token');
      history.push("/") 
      
    
  }
  return (
    <div className="flex-column flex-md-row align-items-center px-md-4 shadow-sm fondo header1">
      <h5 className="my-0 mr-md-auto text-dark ml-md-4"><a href="/t_board"><img class="logo" src={logo}  /></a></h5>
      <nav className="my-1 my-md-0 mr-md-1">
      <ul class="navbar-nav idioma">
        <li class="nav-item dropdown language-dropdown">
          {
            idioma == "en"? <a class="nav-link dropdown-toggle d-flex align-items-center leng text-dark" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <img class="ban" src={en} />
              <span class="profile-text font-weight-medium d-none d-md-block">{t("Header.en")}</span>
            </a> : <a class="nav-link dropdown-toggle d-flex align-items-center leng text-dark" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <img class="ban" src={es} />
              <span class="text-dark">{t("Header.es")}</span>
            </a>
          }

          <div class="dropdown-menu dropdown-menu-left navbar-dropdown py-2" aria-labelledby="LanguageDropdown">
            <a class="dropdown-item" id="id_es" onClick={() => handleClick('es')}>
              <div class="flag-icon-holder">
                <img class="ban" src={es} />
                <span class="text-dark">{t("Header.es")}</span>
              </div>
            </a>
            <a class="dropdown-item" id="id_en" onClick={() => handleClick('en')}>
              <div class="flag-icon-holder">
                <img class="ban" src={en} />
                <span class="text-dark">{t("Header.en")}</span>
              </div>
            </a>
          </div>
        </li>
      </ul>
      </nav>
      <a className="text-dark anchoHelp help mr-2" href="">{t("Header.help")}</a>

      {URLactual == "http://localhost:3004/user_settings"? null: <a className="btn btn-outline-light text-dark mx-1 mr-md-2 line" href="/user_settings">{t("userS.userS")}</a>}
      
      {URLactual == "http://localhost:3004/t_board"?null:<a className="btn btn-outline-light text-dark mx-1 mr-md-2 line" href="/t_board">T-board</a>}
      <a className="btn btn-outline-light mr-md-2 line text-dark"  onClick={()=>deslogear()}>{ t("HeaderT.log_out")}</a>
        

    </div>
  )
}
export default Header