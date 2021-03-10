import React from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import '../css/btn.css'
const Header = () => {
  const [t] = useTranslation("global")

  const handleClick = lang => {
    i18next.changeLanguage(lang)
  }
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 className="my-0 mr-md-auto">T-board</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="">{t("Header.plans_pricing")}</a>
        <a className="p-2 text-dark" href="">{t("Header.help")}</a>
      </nav>
      <button className="btn btn-primary  mx-1" id="id_es" onClick={() => handleClick('es')}
      >es</button>
      <button className="btn btn-primary" id="id_es" onClick={() => handleClick('en')}>en</button>
      <a className="btn btn-outline-primary anchoButton mx-1" href="/register">{t("Header.sign_up")}</a>
      <a className="btn btn-outline-primary anchoButton" href="/">{t("Header.sign_in")}</a>
    </div>
  )
}
export default Header