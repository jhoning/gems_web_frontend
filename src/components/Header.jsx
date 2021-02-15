import React from 'react';
import { useTranslation } from 'react-i18next';
import '../css/btn.css'
const Header = ({handledHeader}) => {
    const [t,i18n] = useTranslation("global")
      
    const handleClick = lang => {
        i18n.changeLanguage(lang)
    }
    const traduc = {
          
        logeo: t("Header.logeo"),
        email: t("Header.email"),
        password: t("Header.password"),
        example:t("Header.example"),
        submit: t("Header.submitt"),
        
    }
  
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto">T-board</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="">{t("Header.plans_pricing")}</a>
                <a className="p-2 text-dark" href="">{t("Header.help")}</a>
            </nav>
            <button className="btn btn-primary  mx-1" id="id_es" onClick={()=> {handleClick('es');handledHeader(traduc);}}
onMouseDown={()=> {handleClick('es');handledHeader(traduc);}}>es</button>
            <button className="btn btn-primary " id="id_es" onClick={()=> {handleClick('en');handledHeader(traduc)}}>en</button>
            <a className="btn btn-outline-primary  mx-1" href="http://localhost:8002/register">{t("Header.sign_up")}</a>
            <button className="btn btn-outline-primary " href="http://localhost:8002/">{t("Header.sign_in")}</button>
         </div>
    );
}

export default Header;
