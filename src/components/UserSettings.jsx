import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import HeaderT from './HeaderT'
import '../css/userSettings.css'
import { useGetUser } from '../hooks/useGetUser'

const UserSettings = () => {

  const [t] = useTranslation("global")
  const [bandera,setBandera] = useState(false)
  const [paises, setPaises] = useState([]);
  const [datos, setDatos] = useState({ username: "", email: "", first_name: "", last_name: "", phone: "", address: "", profesionalID: "", country: "", tokenID: "" });
  useEffect(() => {
    peticion() 
    countrys()
  }, [bandera])


  const peticion = async () => {
    const token = localStorage.getItem('token').split('.')[1];
    const tokenData = JSON.parse(
      Buffer.from(token, 'base64')
        .toString()
    )
    const tokenID = tokenData.id
    console.log(tokenID)
    await axios.get(`http://localhost:4000/user/${tokenID}`)
      .then(resolve => setDatos({ ...datos, username: resolve.data.username, email: resolve.data.email, first_name: resolve.data.first_name, last_name: resolve.data.last_name, phone: resolve.data.phone, address: resolve.data.address, profesionalID: resolve.data.profesionalID, country: resolve.data.country, tokenID: tokenID }))
      .catch(Response => alert(`${t("Alerts.error")}`))
  }

  const update = async () => {
    console.log(datos)
    await axios.patch(`http://localhost:4000/user/${datos.tokenID}`, { username: datos.username, email: datos.email, first_name: datos.first_name, last_name: datos.last_name, phone: datos.phone, address: datos.address, profesionalID: datos.profesionalID, country: datos.country })
      .then(resolve => alert(`${t("Alerts.exist")}`)).catch(Response => console.log(Response))

  }
  const countrys = async () => {
    await axios.get(`http://localhost:4000/country`).then(res => setPaises(res.data)).catch(err => console.log(err))
  }
  return (
    <div>
      <HeaderT />
      <div className="container">
        <div className="altoCompleto alto">
          <div className="col-12 p0 con mb-0 bglight set">
            
            <div className="bordeColor text-left widget-heading">
              <h5 className="mb-2 mx-0">{t("userS.userS")}</h5>
            </div>

            <div class="white">
            <label class="mt-2 p">{t("userS.companyI")}</label>
            <div className="row mt-2">
              <div className="col-6">
                <div class="form-group">
                  <fieldset disabled="">
                    <label class="control-label bordeColor p-1 " for="disabledInput">{t("userS.emailA")}</label>
                    <span class="control-label bordeColor p-1 block" for="disabledInput">{datos.email}</span>
                    {/* <input class="form-control in" id="disabledInput" type="text" placeholder={datos.email} disabled="true" /> */}
                  </fieldset>
                </div>
              </div>
              <div className="col-6">

                <div class="form-group">
                  <fieldset disabled="">
                    <label class="control-label bordeColor p-1 " for="disabledInput">{t("userS.company")}</label>
                    <span class="control-label bordeColor p-1 block" defaultValue="Personal" for="disabledInput">{datos.company}</span>
                     {/* <input class="form-control in" id="disabledInput" type="text" defaultValue="Personal" disabled="true" />  */}
                  </fieldset>
                </div>
              </div>
            </div>
            </div>

            <div class="conte">
            <h6 className="mb-3 mt-2">{t("userS.updateU")}</h6>
            <div className="row ml">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="FirstName">{t("userS.firstN")}</label>
                  <input type="text" name="first_name" className="form-control in" placeholder={datos.first_name} onChange={e => setDatos({ ...datos, first_name: e.target.value })} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="LastName">{t("userS.lastN")}</label>
                  <input type="text" name="last_name" className="form-control in" placeholder={datos.last_name} onChange={e => setDatos({ ...datos, last_name: e.target.value })} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="FirstName">{t("userS.company")}</label>
                  <input type="text" name="first_name" className="form-control in" placeholder={datos.company} onChange={e => setDatos({ ...datos, first_name: e.target.value })} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Address">{t("userS.address")}</label>
                  <input type="text" name="address" className="form-control in" placeholder={datos.address} onChange={e => setDatos({ ...datos, address: e.target.value })} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="professional">{t("userS.professionalID")}</label>
                  <input type="text" name="profesionalID" className="form-control in" placeholder={datos.profesionalID} onChange={e => setDatos({ ...datos, profesionalID: e.target.value })} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Country">{t("userS.country")}</label>
                  {/* <input type="text" name="country" className="form-control in" placeholder={datos.country}  onChange={ e => setDatos({...datos,country: e.target.value}) } /> */}
                  <select class="form-select pais block" aria-label="Default select example"  >
                    <option selected  onChange={ e => setDatos({...datos,country: e.target.value}) }>Open this select menu</option>
                   {/*  <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                    {paises.map(item => {
                      return  <option value={item.name}>{item.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Phone">{t("userS.phone")}</label>
                  <input type="text" name="phone" className="form-control in" placeholder={datos.phone} onChange={e => setDatos({ ...datos, phone: e.target.value })} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="NewEmail">{t("userS.changeE")}</label>
                  <input type="email" name="email" className="form-control in" placeholder=""/*  onChange={this.handledChange} */ />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="ChangePassword">{t("userS.changeP")}</label>
                  <input type="password" className="form-control in" placeholder="" />
                </div>
              </div>
              <div className="col-4"></div>
              <div className="col-4"></div>
              <div className="col-4">
                <a className="btn btn-primary btn-block mt10" onClick={() => {update();bandera?setBandera(false):setBandera(true)}}>{t("userS.update")}</a></div>
              <div className="col-4"></div>
            </div>
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
