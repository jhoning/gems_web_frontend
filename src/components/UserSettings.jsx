import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import HeaderT from './HeaderT'
import '../css/userSettings.css'
import {useGetUser} from '../hooks/useGetUser'

const UserSettings = () => {

  const [t] = useTranslation("global")
  const [datos, setDatos] = useState({ username: "", email: "", first_name: "", last_name: "", phone: "", address: "", profesionalID: "", country: "", tokenID: ""});
  useEffect(() => {
    peticion()
  }, [])

  
  const peticion = async() => {
    const token = localStorage.getItem('token').split('.')[1];
    const tokenData = JSON.parse(
      Buffer.from(token, 'base64')
        .toString()
    )
    const tokenID = tokenData.id
    console.log(tokenID)
    await axios.get(`http://localhost:4000/user/${tokenID}`)
      .then(resolve => setDatos({ ...datos, username: resolve.data.username, email: resolve.data.email, first_name: resolve.data.first_name, last_name: resolve.data.last_name, phone: resolve.data.phone, address: resolve.data.address, profesionalID: resolve.data.profesionalID, country: resolve.data.country, tokenID: tokenID }))
      .catch(Response => alert("error"))
  }

  const update = async () => {
    console.log(datos)
    await axios.patch(`http://localhost:4000/user/${datos.tokenID}`, { username: datos.username, email: datos.email, first_name: datos.first_name, last_name: datos.last_name, phone: datos.phone, address: datos.address, profesionalID: datos.profesionalID, country: datos.country})
    .then(resolve => alert("Datos actualizados de forma exitosa")).catch(Response => console.log(Response))  
    
  }

  return (
    <div>
      <HeaderT />
      <div className="container">
        <div className="col-12 altoCompleto">
          <div className="jumbotron p-2 mb-0 bg-light">
            <div className="col-12 bordeColor text-left px-3 ml-3">
              <h3 className="mb-2 mx-0">{t("userS.userS")}</h3>
            </div>
            <h5 className="mb-4 mt-3 ml-3">{t("userS.companyI")}</h5>
            <div className="row mx-3 mt-4">
              <div className="col-6">
                <div class="form-group">
                  <fieldset disabled="">
                    <label class="control-label bordeColor p-1 " for="disabledInput">{t("userS.emailA")}</label>
                    <input class="form-control" id="disabledInput" type="text" placeholder={datos.email} disabled="true"/>
                  </fieldset>
                </div>
              </div>
              <div className="col-6">
               {/*  <h5 className="bordeColor p-1">{t("userS.company")}</h5>
                <div className="col-sm-10">
                  <input type="text" className="form-control-plaintext" defaultValue="Personal" />
                </div> */}
                <div class="form-group">
                  <fieldset disabled="">
                    <label class="control-label bordeColor p-1 " for="disabledInput">{t("userS.company")}</label>
                    <input class="form-control" id="disabledInput" type="text" defaultValue="Personal" disabled="true"/>
                  </fieldset>
                </div>
              </div>
            </div>
            <h5 className="mb-4 mt-3">{t("userS.updateU")}</h5>
            <div className="row mx-3">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="FirstName">{t("userS.firstN")}</label>
                  <input type="text" name="first_name" className="form-control" placeholder={datos.first_name} onChange={ e => setDatos({...datos,first_name: e.target.value}) } />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="LastName">{t("userS.lastN")}</label>
                  <input type="text" name="last_name" className="form-control" placeholder={datos.last_name} onChange={ e => setDatos({...datos,last_name: e.target.value}) } />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Address">{t("userS.address")}</label>
                  <input type="text" name="address" className="form-control" placeholder={datos.address} onChange={ e => setDatos({...datos,address: e.target.value}) }/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="professional">{t("userS.professionalID")}</label>
                  <input type="text" name="profesionalID" className="form-control" placeholder={datos.profesionalID} onChange={ e => setDatos({...datos,profesionalID: e.target.value}) } />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Country">{t("userS.country")}</label>
                  <input type="text" name="country" className="form-control" placeholder={datos.country}  onChange={ e => setDatos({...datos,country: e.target.value}) } />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Phone">{t("userS.phone")}</label>
                  <input type="text" name="phone" className="form-control" placeholder={datos.phone}  onChange={ e => setDatos({...datos,phone: e.target.value}) }/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="NewEmail">{t("userS.changeE")}</label>
                  <input type="email" name="email" className="form-control" placeholder=""/*  onChange={this.handledChange} */ />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="ChangePassword">{t("userS.changeP")}</label>
                  <input type="password" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-4"></div>
              <div className="col-4"><a className="btn btn-primary btn-block" onClick={() => update()}>{t("userS.update")}</a></div>
              <div className="col-4"></div>
            </div>
          </div>
        </div>
      </div>
      {/*   <Footer   
    Terms={this.state.translate.Terms}
    Privacy= {this.state.translate.Privacy}
    Blog= {this.state.translate.Blog}
    ContactUs= {this.state.translate.ContactUs}  /> */}
    </div>
  )
}

export default UserSettings
