import React, { useState } from 'react'
import '../css/login_estilos.css'
import { useTranslation } from 'react-i18next';

const ChangePassword = () => { 

  const [t] = useTranslation("global")

  return (
    <div className="app">
      <div className="card mx-auto my-8 formRecover wrapper fadeInDown">
        <div className="card-body pg">
          <div id="recover-row" className="row justify-content-center align-items-center">
            <div id="recover-column" className="col-md-12">
              <div id="recovern-box" className="col-md-12">
                <h3 className="text-center mb-4">Cambie su contraseña</h3>
                <form >
                  <div class="form-group clave">
                    <label>Ingrese su contraseña nueva</label>
                    <input type="text"  name="email" id="email" placeholder="" className="form-control"/>
                  </div>
                  <div class="form-group clave">
                    <label>Repita su nueva contraseña</label>
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
export default ChangePassword
