import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';
import axios from 'axios'
const Recover = () => { 

  const [t] = useTranslation("global")
  const [email,setEmail] = useState()
  const changePassword = async() => {
    await axios.put('http://localhost:4000/auth/forgot-password',
      email
  
  ).then((res)=>alert("Se ha enviado correo de verificacion")).catch(err => alert("este correo no esta registrado"))
  }
  return (
    <div className="app">
      <div className="card mx-auto my-8 formRecover wrapper fadeInDown">
        <div className="card-body pg">
          <div id="recover-row" className="row justify-content-center align-items-center">
            <div id="recover-column" className="col-md-12">
              <div id="recovern-box" className="col-md-12">
                <h3 className="mb-3 t-l">{t("userS.rPass")}</h3>
                <p class="mensaje">{t("userS.mRecover")}</p>
              
                  <div class="form-group clave">
                    <input type="text" name="email" id="email" placeholder={t("userS.emailA")} className="form-control"  onChange={ e => setEmail({email: e.target.value}) }/>
                  </div>
                  <div className="form-group text-center mt-3">
                    <button  className="boton btn btn-primary" onClick={()=>{changePassword();console.log(email)}}> enviar</button>
                  </div>
             
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
    
  )
}
export default Recover
