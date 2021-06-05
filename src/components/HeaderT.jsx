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
      <a className="text-dark anchoHelp help mr-1" href=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>{t("Header.help")}</a>

      {URLactual == "http://localhost:3004/user_settings"? null: <a className="btn btn-outline-light text-dark mx-1 mr-md-2 line usuario" href="/user_settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>{t("userS.userS")}</a>}
      
      {URLactual == "http://localhost:3004/t_board"?null:<a className="btn btn-outline-light text-dark mx-1 mr-md-2 line" href="/t_board">T-board</a>}
      <a className="btn btn-outline-light mr-md-2 line text-dark salir"  onClick={()=>deslogear()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> { t("HeaderT.log_out")}</a>
        

    </div>
  )
}
export default Header