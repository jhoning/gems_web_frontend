import React from 'react'
import '../css/calculo.css'
import { useTranslation } from 'react-i18next';
import '../css/userSettings.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
const InputsCalculate = ({values,setValues,setArr,arr}) => {
  const [t] = useTranslation("global")
  const token = localStorage.getItem('token')
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })  
  
  useEffect(() => {
    obtenerReportes();
  }, []);
  const [report,setReport] = useState({
    current: "",
    cable_width: "",
    pipe_diameter: "",
    protection_device: "",
    voltaje_drop: "",
    circuit: {},

  })
  const obtenerReportes = async() => {
    await authAxios.get('/report').then((resp)=>setArr(resp.data));
  } 

  const reportGenerate =  async() => {
    setArr([...arr,report])
    console.log(values)
    console.log(arr)
     await authAxios.post('/report',report).catch(err => console.log(err)) 
  }

  const amp = () => {
    if (document.getElementById("reporte").style.width == '40%') {
      document.getElementById("reporte").style.width = '30%';
      document.getElementById("report").style.width = '45%';

      } else {
      document.getElementById("reporte").style.width = '40%';
      document.getElementById("report").style.width = '35%';

      }
  }

  return (
    <div className="w30 overflow-auto calculoAlto" id="reporte">
    <button className="btn btn-primary " onClick={() => amp()}> Ver </button>

      <div className="container mb-1 ">
        <h3 className="text-center mb-0 p-0 mt-2 color">{t("InputsC.sAppliance")}</h3>
         <hr />
        <h4 className="text-left mb-3 mt-0 bordeColor color">{t("InputsC.cSettings")}</h4>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label">{t("InputsC.loadType")}</label>
          <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off">
              <option selected>{t("InputsC.choose")}</option>
              <option value="1">{t("InputsC.kitchen")}</option>
              <option value="2">{t("InputsC.bedroom")}</option>
              <option value="3">{t("InputsC.washroom")}</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.powerW")}</label>
          <div class="col-sm-7 mx-0">
            <input type="text" class="form-control" id="inputEmail3" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.loadP")}</label>
          <div class="col-sm-7 mx-0">
          <select class="custom-select custom-select"  autocomplete="off">
              <option selected>{t("InputsC.choose")}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.cablesP")}</label>
          <div class="col-sm-7 mx-0">
            <input type="text" class="form-control" id="inputEmail3" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.distance")}</label>
          <div class="col-sm-7 mx-0">
            <input type="text" class="form-control" id="inputEmail3"  autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.powerF")}</label>
          <div class="col-sm-7 mx-0">
            <input type="text" class="form-control" id="inputEmail3" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.voltaje")} (%)</label>
          <div class="col-sm-7 mx-0">
            <input type="text" class="form-control" id="inputEmail3" autocomplete="off"  />
          </div>
        </div>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label">{t("InputsC.aisolation")}</label>
          <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off">
              <option selected>{t("InputsC.choose")}</option>
              <option value="1" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.tw")}>TW</option>
              <option value="2" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.thwn")}>THWN</option>
              <option value="3" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.thhn")}>THHN</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.temperature")} (°C)</label>
          <div class="col-sm-7 mx-0">
          <input type="text" class="form-control" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.neutral")}</label>
          <div class="col-sm-7 mx-0">
          <input type="text" class="form-control" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.conduit")}</label>
          <div class="col-sm-7 mx-0">
          <input type="text" class="form-control" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>

        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray" onClick={()=>{setReport({
    current:parseFloat( Math.random()*99).toFixed(1),
    cable_width:parseFloat( Math.random()*99).toFixed(1),
    pipe_diameter:parseFloat( Math.random()*99).toFixed(1),
    protection_device:parseFloat( Math.random()*99).toFixed(1),
    voltaje_drop:parseFloat( Math.random()*99).toFixed(1),
             circuit: {}
          })}}>{t("InputsC.compute")}</button></div>
        </div>
        <div className="col-4">
            {/* <button className="btn btn-primary mt-2 gray" onClick={()=>console.log(report)}>algo</button> */}
          </div>
        <hr />
        <h3 className="text-left mb-1 bordeColor p-1 color">{t("InputsC.results")}</h3>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 " >{t("InputsC.current")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3" placeholder="0"  autocomplete="off" onChange={ e => setValues({...values,current: e.target.value}) } value={report.current}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2" >{t("InputsC.cable")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,cable_width: e.target.value}) } value={report.cable_width}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">{t("InputsC.pipeD")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,pipe_diameter: e.target.value}) } value={report.pipe_diameter}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0">{t("InputsC.protectionD")}</label>
          <div class="col-sm-8 my-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,protection_device: e.target.value}) } value={report.voltaje_drop}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">{t("InputsC.voltaje")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,voltaje_drop: e.target.value}) } value={report.protection_device}/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray" onClick={()=>{reportGenerate();console.log(report)}}>{t("Calculate.report")}</button></div>
        </div>
      </div>
    </div>
  )
}

export default InputsCalculate
