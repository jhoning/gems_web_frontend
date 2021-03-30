import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';
import mail from '../css/mail.png'
import axios from 'axios'
import Header from './Header';
import Footer from './Footer';
const MessageEmail = () => { 

  const [t] = useTranslation("global")

  return ( 
    <div className="app">
      <Header/>
      <div className="card mx-auto my-8 formMessage wrapper fadeInDown">
        <div className="card-body pg">
          <div id="message-row" className="row justify-content-center align-items-center">
            <div id="message-column" className="col-md-12">
              <div id="message-box" className="col-md-12">
                  <div class="centra">
                    <img class="imgMail mb-3" src={mail} />
                  </div>
              
                    <h3 className="mb-3 t-l text-center">{t("userS.verify")}</h3>
                    <p class="mensaje">{t("userS.message")}</p>

                  <div className="form-group text-center mt-3">
                    <button  className="boton btn btn-primary">{t("Header.access")}</button>
                  </div>
             
              </div>
            </div>
          </div> 
        </div>
      </div>
      <Footer/>
    </div>
    
  )
}
export default MessageEmail
