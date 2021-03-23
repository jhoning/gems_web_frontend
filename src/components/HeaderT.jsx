import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import '../css/btn.css';
import '../css/Main.css';
import es from '../css/espana.svg';
import en from '../css/estados-unidos.svg';
import {useHistory} from 'react-router';


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

  const handleClick = lang => {
    i18next.changeLanguage(lang)
  }
  const deslogear = () => {

      localStorage.removeItem('token');
      history.push("/")
      
    
  }
  return (
    <div className="d-flex flex-column flex-md-row align-items-center px-md-4 shadow-sm fondo">
      <h5 className="my-0 mr-md-auto text-dark ml-md-4">T-board</h5>
      <nav className="my-2 my-md-0 mr-md-1">
        <ul class="navbar-nav idioma mr-md-1">
      <li class="nav-item dropdown language-dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center leng text-dark" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
          <div class="d-inline-flex mr-0 mr-md-3">
            <div class="flag-icon-holder"><i class="flag-icon flag-icon-us"></i>
            </div>
          </div>
            <img class="ban" src={en} />
            <span class="profile-text font-weight-medium d-none d-md-block">English</span>
        </a>
        <div class="dropdown-menu dropdown-menu-left navbar-dropdown py-2" aria-labelledby="LanguageDropdown">
          <a class="dropdown-item" id="id_es" onClick={() => handleClick('es')}>
            <div class="flag-icon-holder">
                <img class="ban" src={es} />
                <span class="text-dark">{t("Header.es")}</span>
            </div>
          </a>
          <a class="dropdown-item" id="id_es" onClick={() => handleClick('en')}>
            <div class="flag-icon-holder">
                <img class="ban" src={en} />
                <span class="text-dark">{t("Header.en")}</span>
            </div>
          </a>
        </div>
      </li>
      </ul>
      </nav>
      <a className="p-2 text-dark anchoHelp mr-md-3" href="">{t("Header.help")}</a>

      <a className="btn btn-outline-light text-dark mx-1 mr-md-3 line" href="/user_settings">{t("userS.userS")}</a>
      <a className="btn btn-outline-light text-dark mx-1 mr-md-3 line" href="/t_board">T-board</a>
      <a className="btn btn-outline-light mr-md-4 line text-dark"  onClick={()=>deslogear()}>{ t("HeaderT.log_out")}</a>
        
    </div>
  )
}
export default Header