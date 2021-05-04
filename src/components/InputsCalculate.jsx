import React from 'react'
import '../css/calculo.css'
import { useTranslation } from 'react-i18next';
import '../css/userSettings.css'
import '../css/sweetalert2.min.css'
import max from '../img/ampliar-texto.png';
import min from '../img/disminuir.png';
import {useState,useEffect} from 'react'
import axios from 'axios'
const Swal = require('sweetalert2')

const InputsCalculate = ({values,setValues,setArr,arr}) => {
  const [respuesta,setRespuesta] = useState({
    current: "0",
    cable_width: "0",
    pipe_diameter: "0",
    protection_device: "0",
    voltage_drop: "0"
})
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
    loadType:"",
    power: 0,
    distance: "",
    powerFactor: 0,
    voltageDrop: "",
    aisolation:"",
    temperature:21,
    loadPhases:"",
    perPhase:"",
    feeder_include_neutral_wire:true,
    pipe_material:"",
    system_voltage:"",
  })
  const obtenerReportes = async() => {
    await authAxios.get('/report').then((resp)=>setArr(resp.data));
  }  
  const enviarDatos = async() => {
    await authAxios.post('/report/listForm',report).then(res=>{setRespuesta(res.data);console.log(res)}).catch(err=>console.log(err))
  }
  const reportGenerate =  async() => {
    setArr([...arr,respuesta])
    console.log(values)
    console.log(arr)
     await authAxios.post('/report',respuesta).catch(err => console.log(err)) 
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

  const alert = () => {
    Swal.fire({
      title: `${t("Alerts.mCal")}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${t("Option.accept")}`,
      cancelButtonText: `${t("Option.cancel")}`
    })
  }
  const alertreport = () => {
    Swal.fire({
      title: '¿Desea agregarlos al reporte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${t("Option.accept")}`,
      cancelButtonText: `${t("Option.cancel")}`
    })
  }

  const handlePipe_material = (e) => {
    
    setReport({...report,pipe_material:parseInt(e.target.value)});
    console.log(report)
  }
  const handleLoadType = (e) => {
    setReport({...report,loadType:parseInt(e.target.value)});
    console.log(report)
  }
  const handleSystem_voltage = (e) => {
    setReport({...report,system_voltage:parseInt(e.target.value)});
    console.log(report)
  }
  const handleAisolation = (e) => {
    setReport({...report,aisolation:parseInt(e.target.value)});
    console.log(report)
  }
  const handleLoadPhases = (e) => {
    setReport({...report,loadPhases:parseInt(e.target.value)});
    console.log(report)
  }
  const handlePower = (e) => {
    /* if(e.target.value > 8000){
      setReport({...report,power:8000});
    } else {
      
    } */
 
    setReport({...report,power:parseInt(e.target.value)});
  }

  const handleDistance = (e) => {
    setReport({...report,distance:parseInt(e.target.value)});
    console.log(report)
  }
  const handleVoltageDrop = (e) => {
    setReport({...report,voltageDrop:parseInt(e.target.value)});
    console.log(report)
  }
  const handlePowerFactor = (e) => {
    if(e.target.value > 1 || e.target.value < 0 ){
      setReport(e.target.value < 1?{...report,powerFactor: parseFloat(0).toFixed(1)}:{...report,powerFactor:parseFloat(1).toFixed(1)});
    } else {
      setReport({...report,powerFactor:parseFloat(e.target.value).toFixed(1)});
    } 
  }
  const handlePerPhases = (e) => {
    if(e.target.value < 0 ){
      setReport({...report,perPhase:parseInt(1)});
    } else {
      setReport({...report,perPhase:parseInt(e.target.value)});
    } 
  }
  const handleTemperature = (e) => {
   
      setReport({...report,temperature:parseInt(e.target.value)});
   
  }
  const handleFeeder_include_neutral_wire = (e) => {
    setReport({...report, feeder_include_neutral_wire:e.target.value});
  }

  

  return (
    <div className="w30 overflow-auto calculoAlto" id="reporte">
      <div  autocomplete="off">
        <a onClick={() => amp()} class="point amp1">
        <i class="fa fa-expand mr5" aria-hidden="true"></i>
        {t("Calculate.amp")}
        </a>

        <div class="btn-toolbar f-r mt5" role="toolbar" aria-label="Botones">
          <img src={max} class="aumentar mr-2 ba" alt=""/>
          <img src={min} class="restablecer bam" alt=""/>
        </div>
        <div class="db">
          <button class="mr-2" onClick={() => alert()}>Alerta cambios</button>
          <button onClick={() => alertreport()}>Alerta reporte</button>
        </div>
    
    
      <div className="container mb-1 ">
        <h3 className="text-left mb-0 p-0 mt-2 color">{t("InputsC.sAppliance")}</h3>
         <hr />
        <h4 className="text-left mb-2 mt-0 bordeColor color">{t("InputsC.cSettings")}</h4>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label mitexto">{t("InputsC.loadType")}</label>
          <div class="col-sm-7">
            <select class="custom-select mitexto"  autocomplete="off" onChange={handleLoadType}>
              <option selected class="mitexto">{t("InputsC.choose")}</option>
              <option value="0" class="mitexto">{t("InputsC.kitchen")}</option>
              <option value="1" class="mitexto">{t("InputsC.bedroom")}</option>
              <option value="2" class="mitexto">{t("InputsC.washroom")}</option>
            </select>
          </div>
        </div>

        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label mitexto">Motor</label>
          <div class="col-sm-7">
            <select name="SelectOptions" id="SelectOptions" class="custom-select mitexto" required autocomplete="off">
                <option selected class="mitexto">{t("InputsC.choose")}</option>
                <option value="Div1" class="mitexto">Div 1</option>
                <option value="Div2" class="mitexto">Div 2</option>
            </select>
          </div>
        </div>

        <div class="DivPai form-group row my-1 se">
            <div class="Div1">
              <div class="col-sm-5"></div>
              <input type="number" placeholder="Contenido 1" class="form-control ml50 mitexto" autocomplete="off"  autocomplete="nope" />
            </div>
    
            <div class="Div2">
              <div class="col-sm-5"></div>
              <input type="number" placeholder="Contenido 2" class="form-control ml50 mitexto" autocomplete="off"  autocomplete="nope" />
            </div>
        </div>
        
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.powerW")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number"  class="form-control mitexto" id="inputEmail3" autocomplete="off" value={report.power} autocomplete="nope" onChange={handlePower}/>
          </div>
        </div>
        <div class="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.loadP")}</label>
          <div class="col-sm-7 mx-0">
          <select class="custom-select custom-select"  autocomplete="off" onChange={handleLoadPhases}>
              <option selected class="mitexto">{t("InputsC.choose")}</option>
              <option value="1" class="mitexto">1</option>
              <option value="2" class="mitexto">2</option>
              <option value="3" class="mitexto">3</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.cablesP")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number" class="form-control mitexto" id="inputEmail3" autocomplete="off" value={report.perPhases} onChange={handlePerPhases}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.distance")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number" class="form-control mitexto" id="inputEmail3"  autocomplete="off" onChange={handleDistance}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.powerF")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number" step=".1" min="0" max="1" class="form-control mitexto" id="inputEmail3" value={report.powerFactor} autocomplete="off" onChange={handlePowerFactor} />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.voltage")} (%)</label>
          <div class="col-sm-7 mx-0">
            <input type="number" class="form-control mitexto" id="inputEmail3" autocomplete="off" onChange={handleVoltageDrop} />
          </div>
        </div>
        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.sVoltage")} (V)</label>
        <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off" onChange={handleSystem_voltage}>
              <option selected class="mitexto">{t("InputsC.choose")}</option>
              <option value="120" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title="120">120</option>
              <option value="208" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title="208">208</option>
              <option value="220" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title="220">220</option>
            </select>
          </div>
        </div>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label mitexto">{t("InputsC.aisolation")}</label>
          <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off" onChange={handleAisolation}>
              <option selected class="mitexto">{t("InputsC.choose")}</option>
              <option value="0" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.tw")}>TW</option>
              <option value="1" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.thwn")}>THWN</option>
              <option value="2" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.thhn")}>THHN</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.temperature")} (°C)</label>
          <div class="col-sm-7 mx-0">
          <input type="number" class="form-control mitexto" id="inputEmail3"  autocomplete="off" value={report.temperature} onChange={handleTemperature}/>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.neutral")}</label>
        <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off" onChange={handleFeeder_include_neutral_wire}>
              <option class="mitexto" value={true} selected data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.yes")}>{t("Option.yes")}</option>
              <option class="mitexto" value={false} data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.no")}>{t("Option.no")}</option>
            </select>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.conduit")}</label>
          <div class="col-sm-7 mx-0">
            <select class="custom-select custom-select"  autocomplete="off" onChange={handlePipe_material}>
            <option selected class="mitexto">{t("InputsC.choose")}</option>
              <option value="0" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.PVC")}>{t("Option.PVC")}</option>
              <option value="1" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.aluminum")}>{t("Option.aluminum")}</option>
              <option value="2" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.steel")}>{t("Option.steel")}</option>

            </select>
          </div>
        </div>

        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4 mitexto"><button className="btn btn-primary mt-2 gray mitexto" onClick={()=>enviarDatos()}>{t("InputsC.compute")}</button></div>
        </div> 
        <div className="col-4">
            {/* <button className="btn btn-primary mt-2 gray" onClick={()=>console.log(report)}>algo</button> */}
          </div>
        <hr />
        <h3 className="text-left mb-1 bordeColor p-1 color">{t("InputsC.results")}</h3>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 mitexto" >{t("InputsC.current")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2 mitexto mitexto" id="inputEmail3" placeholder="0"  autocomplete="off" onChange={ e => setValues({...values,current: e.target.value}) } value={parseFloat(respuesta.current).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 mitexto" >{t("InputsC.cable")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,cable_width: e.target.value}) } value={parseFloat(respuesta.cable_width).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mitexto">{t("InputsC.pipeD")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,pipe_diameter: e.target.value}) } value={parseFloat(respuesta.pipe_diameter).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0 mitexto">{t("InputsC.protectionD")}</label>
          <div class="col-sm-8 my-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,protection_device: e.target.value}) } value={parseFloat(respuesta.protection_device).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mitexto">{t("InputsC.voltage")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,voltaje_drop: e.target.value}) } value={parseFloat(respuesta.voltage_drop).toFixed(2)}/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray mitexto" onClick={()=>{reportGenerate();console.log(report)}}>{t("Calculate.report")}</button></div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default InputsCalculate
