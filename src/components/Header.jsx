import React from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import '../css/btn.css';
import '../css/Main.css';
import es from '../img/espana.svg';
import en from '../img/estados-unidos.svg'
import logo from '../img/logo.png';

const Header = () => { 
  const idioma = localStorage.getItem('i18nextLng')
  const [t] = useTranslation("global")
  const URLactual = window.location;
  const handleClick = lang => {
    i18next.changeLanguage(lang)
  }
  return (
    <div className="flex-column flex-md-row align-items-center px-md-4 shadow-sm fondo header">
     <h5 className="my-0 mr-md-auto text-dark ml-md-4"><a href="/"><img class="logo" src={logo}  /></a></h5>
    
      <nav className="my-2 my-md-0 mr-md-1">
        <a className="p-2 text-dark pr-3" href="/pricing">{t("Header.plans_pricing")}</a>
        <a className="p-2 text-dark pr-3 help" href=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>{t("Header.help")}</a>
      </nav>
 
      <ul class="navbar-nav idioma mr-md-1 pr-2">
        <li class="nav-item dropdown language-dropdown">
          {
            idioma == "en"? <a class="nav-link dropdown-toggle d-flex align-items-center leng idioma text-dark" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <img class="ban" src={en} />
              <span class="profile-text font-weight-medium  d-md-block">{t("Header.en")}</span>
            </a> : <a class="nav-link dropdown-toggle d-flex align-items-center leng idioma text-dark" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
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

      {
        URLactual.href == "http://localhost:3004/" ? <a className="btn btn-outline-light text-dark mx-1 mr-md-3 line" href="/register">{t("Header.sign_up")}</a> : <a className="btn btn-outline-light mr-md-4 line text-dark" href="/">{t("Header.logeo")}</a>
      }

    </div>
  )
}
export default Header