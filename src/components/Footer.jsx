import React from 'react';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const [t] = useTranslation("global")
  return (
    <div className="container-fluid p-0 foot">
      <div className="d-flex flex-column flex-md-row align-items-center ">
        
        <h5 className="my-0 mr-md-auto"></h5>
        <nav className="my-md-0 mr-md-3">
          <a className="p-2 text-dark board" >&copy;T-board</a>
          <a className="p-2 text-dark" >{t("HeaderT.Terms")}</a>
          <a className="p-2 text-dark" >{t("HeaderT.Privacy")}</a>
          <a className="p-2 text-dark" >{t("HeaderT.Blog")}</a>
          <a className="p-2 text-dark" >{t("HeaderT.ContactUs")}</a>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
