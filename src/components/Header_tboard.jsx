import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios'
const Header_tboard = ({handledHeaderT}) => {
    

  
    const [t,i18n] = useTranslation("global")
    
    const handleClick = lang => {
        i18n.changeLanguage(lang)
       
    
    }
    
    const e = {
          
        projects: t("HeaderT.projects"),
        projectsM: t("HeaderT.projectsM"),
        projectsS: t("HeaderT.projectsS"),
        projectsNews: t("HeaderT.projectsNews"),
        search_projects: t("HeaderT.search_projects"),
        userS: t("userS.userS"),
        companyI: t("userS.companyI"),
        emailA: t("userS.emailA"),
        company: t("userS.company"),
        updateU: t("userS.updateU"),
        firstN: t("userS.firstN"),
        lastN: t("userS.lastN"),
        address: t("userS.address"),
        professionalID: t("userS.professionalID"),
        country: t("userS.country"),
        phone: t("userS.phone"),
        changeE: t("userS.changeE"),
        changeP: t("userS.changeP"),
        update: t("userS.update")
        
    }   
    
    const deslogear = () => {
        /* http://localhost:3000/user */
       axios.post('http://localhost:4000/auth/logout')
      
       localStorage.clear()
       alert("Se ha deslogeado de forma exitosa")
       window.location.href="./"
    } 
    
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto">T-board</h5>
            <nav className="my-2 my-md-0 mr-md-3">
            <button className="btn btn-primary mx-1" id="id_es" onClick={()=> {handleClick('es');handledHeaderT(e);}}>es</button>
            <a className="btn btn-primary" id="id_es" onClick={()=> {handleClick('en');handledHeaderT(e)}} >en</a>
                <a className="p-2 text-dark" href="">{t("Header.help")}</a>
            </nav>
            <a className="btn btn-outline-primary mx-1"  onClick={()=>{deslogear()}}>{ t("HeaderT.log_out")}</a>
            <a className="btn btn-outline-primary mr-2" href="/user_settings">{t("userS.userS")}</a>
        </div>
    );
}

export default Header_tboard;
