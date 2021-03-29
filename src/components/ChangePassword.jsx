import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router";
import axios from 'axios'


const ChangePassword = () => { 

  const [t] = useTranslation("global")
  let { token } = useParams(); 
  let [pass,setPass] = useState({
    password:"",
    confirmPassword:""
  })
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "reset": `${token}`
    }
  })
  
  const enviarNewPass = async() => {
    await authAxios.put('/auth/new-password',pass).then(res=> alert(`${t("Alerts.claveS")}`)).catch(err => alert(`${t("Alerts.claveF")}`))
  }
  
  return (
    <div className="app">
      <div className="card mx-auto my-8 formRecover wrapper fadeInDown">
        <div className="card-body pg">
          <div id="recover-row" className="row justify-content-center align-items-center">
            <div id="recover-column" className="col-md-12">
              <div id="recovern-box" className="col-md-12">
                <h3 className="mb-3">{t("userS.changeP")}</h3>
            
                  <div class="form-group clave">
                    <label>{t("userS.enterP")}</label>
                    <input type="text" name="pass" id="pass1" placeholder="" className="form-control" onChange={ e => setPass({confirmPassword:`${pass.confirmPassword}`,password: e.target.value}) }/>
                  </div>
                  <div class="form-group clave">
                    <label>{t("userS.repeatP")}</label>
                    <input type="text" name="pass" id="pass2" placeholder="" className="form-control" onChange={ e => setPass({password:`${pass.password}`,confirmPassword: e.target.value}) }/>
                  </div>
                  <div className="form-group text-center mt-3">
                    <input type="submit" className="boton btn btn-primary" value={t("userS.update")} onClick={()=> enviarNewPass()}/>
                    {/* <button onClick={()=>{console.log(token);console.log(pass)}}>ver token</button> */}
                  </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChangePassword
