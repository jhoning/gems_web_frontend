import React from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import '../css/btn.css';
import '../css/Main.css';
import es from '../css/espana.svg';
import en from '../css/estados-unidos.svg'
const Header = () => {
  const [t] = useTranslation("global")

  const handleClick = lang => {
    i18next.changeLanguage(lang)
  }
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 shadow-sm fondo">
      <h5 className="my-0 mr-md-auto text-light ml-md-4">T-board</h5>
      
      <nav className="my-2 my-md-0 mr-md-1">
        <a className="p-2 text-light" href="">{t("Header.plans_pricing")}</a>
        <a className="p-2 text-light" href="">{t("Header.help")}</a>
      </nav>

    <ul class="navbar-nav idioma mr-md-1">
      <li class="nav-item dropdown language-dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center leng text-light" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
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
                <span class="text-light">Spanish</span>
            </div>
          </a>
          <a class="dropdown-item" id="id_es" onClick={() => handleClick('en')}>
            <div class="flag-icon-holder">
                <img class="ban" src={en} />
                <span class="text-light">English</span>
            </div>
          </a>
        </div>
      </li>
      </ul>
      <a className="btn btn-outline-light text-light mx-1 mr-md-3 line" href="/register">{t("Header.sign_up")}</a>
      <a className="btn btn-outline-light mr-md-4 check text-light" href="/">{t("Header.sign_in")}</a>
    </div>
  )
}
export default Header