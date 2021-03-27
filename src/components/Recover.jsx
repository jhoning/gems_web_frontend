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
  
  ).then((res)=>console.log("bueno")).catch(err => console.log("error"))
  }
  return (
    <div className="app">
      <div className="card mx-auto my-8 formRecover wrapper fadeInDown">
        <div className="card-body pg">
          <div id="recover-row" className="row justify-content-center align-items-center">
            <div id="recover-column" className="col-md-12">
              <div id="recovern-box" className="col-md-12">
                <h3 className="text-center mb-4">Ingresa tu correo</h3>
                <p class="mensaje">Por favor ingrese su correo electrónico para recuperar su contraseña</p>
                <form >
                  <div class="form-group clave">
                    <input type="text" name="email" id="email" placeholder="ingrese correo" className="form-control"  onChange={ e => setEmail({email: e.target.value}) }/>
                  </div>
                  <div className="form-group text-center mt-3">
                    <button  className="boton btn btn-primary" onClick={()=>{changePassword()}}> enviar</button>
                  </div>
                </form>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
    
  )
}
export default Recover
