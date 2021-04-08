import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';

const Code = () => { 

  const [t] = useTranslation("global")
  return (
    <div className="app">
      <div className="card mx-auto my-8 formRecover wrapper fadeInDown">
        <div className="card-body pg">
          <div id="recover-row" className="row justify-content-center align-items-center">
            <div id="recover-column" className="col-md-12">
              <div id="recovern-box" className="col-md-12">
                <h3 className="mb-3 t-l">{t("userS.code")}</h3>
                <p class="mensaje">{t("userS.cMess")}</p>
              
                  <div class="form-group clave">
                    <input type="text" name="email" id="email" placeholder={t("userS.cNumber")} className="form-control"/>
                  </div>
                  <div className="form-group text-center mt-3">
                    <button  className="boton btn btn-primary">{t("Header.submitt")}</button>
                  </div>
             
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
    
  )
}
export default Code
