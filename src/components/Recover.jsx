import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';

const Recover = () => { 

  const [t] = useTranslation("global")

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
                    <input type="text" name="email" id="email" placeholder="" className="form-control"/>
                  </div>
                  <div className="form-group text-center mt-3">
                    <input type="submit" className="boton btn btn-primary" value="Enviar" />
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
