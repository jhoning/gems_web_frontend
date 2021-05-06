import React from 'react'
import '../css/calculo.css'
import { useTranslation } from 'react-i18next';
import '../css/userSettings.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
const InputsCalculate = ({values,setValues,setArr,arr,circuitActual,estadoInputs}) => {
  const [boardPadre,setBoardPadre] = useState()
  const [respuesta,setRespuesta] = useState({
    current: 0,
    cable_width: "0",
    pipe_diameter: "0",
    protection_device: 0,
    voltage_drop: 0,
})
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
  const [t] = useTranslation("global")
  const token = localStorage.getItem('token')
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })  
  
  useEffect(() => {
   
    setReport({...estadoInputs,powerFactor:0})
    console.log({
      loadType:report.loadType,
      power: report.power,
      distance: report.distance,
      powerFactor: 0.1,
      voltageDrop: report.voltageDrop,
      aisolation:report.aisolation,
      temperature:21,
      loadPhases:report.loadPhases,
      perPhase:report.perPhase,
      feeder_include_neutral_wire:report.feeder_include_neutral_wire,
      pipe_material:report.pipe_material,
      system_voltage:report.system_voltage})
     obtenerReportes(); 
  }, [estadoInputs]);
 
  const obtenerReportes = async() => {
    await authAxios.get('/report').then((resp)=>setArr(resp.data));
  }  
  const enviarDatos = async(id1) => {
    await authAxios.post('/report/listForm',{
    loadType:report.loadType,
    power: report.power,
    distance: report.distance,
    powerFactor: report.powerFactor,
    voltageDrop: report.voltageDrop,
    aisolation:report.aisolation,
    temperature:21,
    loadPhases:report.loadPhases,
    perPhase:report.perPhase,
    feeder_include_neutral_wire:report.feeder_include_neutral_wire,
    pipe_material:report.pipe_material,
    system_voltage:report.system_voltage}).then(res=>{setRespuesta({...res.data });console.log(respuesta)}).catch(err=>console.log(err))
  }
  const actualizarCircuit = async()=>{
    await authAxios.get('/circuit/'+circuitActual).then(res => res.data.board_padre).then(res=> actualizarCircuit2(res))
    
      /* await authAxios.patch('/circuit/'+circuitActual,{id:circuitActual,...report,board_padre:{
       id:boardPadre.id,
       name:boardPadre.name
     }
     
    }).then(res => console.log(res)); */
  }
  const actualizarCircuit2 = async(res)=>{
   
      setTimeout(async()=>{      
         await authAxios.patch('/circuit/'+circuitActual,{id:circuitActual,...report,board_padre:{
        id:res.id,
        name:res.name
      }
      
     }).then(res => console.log(res)); },1000)

  }
  const reportGenerate =  async() => {
    setArr([...arr,respuesta])
    console.log(values)
    console.log(arr)
     await authAxios.post('/report',{ loadType:report.loadType,
      power: report.power,
      distance: report.distance,
      powerFactor: report.powerFactor,
      voltageDrop: report.voltageDrop,
      aisolation:report.aisolation,
      temperature:21,
      loadPhases:report.loadPhases,
      perPhase:report.perPhase,
      feeder_include_neutral_wire:report.feeder_include_neutral_wire,
      pipe_material:report.pipe_material,
      system_voltage:report.system_voltage,...respuesta,circuit:{
       id:circuitActual
     }}).then(res=> console.log('exito!!!')).catch(err => console.log(err)) 
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
      <button onClick={()=>{console.log({
      loadType:report.loadType,
      power: report.power,
      distance: report.distance,
      powerFactor: 0.1,
      voltageDrop: report.voltageDrop,
      aisolation:report.aisolation,
      temperature:21,
      loadPhases:report.loadPhases,
      perPhase:report.perPhase,
      feeder_include_neutral_wire:report.feeder_include_neutral_wire,
      pipe_material:report.pipe_material,
      system_voltage:report.system_voltage})}}>ver result</button>
      <div  autocomplete="off">
        <a onClick={() => amp()} class="point amp1">
        <i class="fa fa-expand mr5" aria-hidden="true"></i>
        {t("Calculate.amp")}
        </a>
    {/* <button className="btn btn-primary " onClick={() => amp()}> Ver </button> */}

      <div className="container mb-1 ">
        <h3 className="text-center mb-0 p-0 mt-2 color">{t("InputsC.sAppliance")}</h3>
   
   

         <hr />
        <h4 className="text-left mb-3 mt-0 bordeColor color">{t("InputsC.cSettings")}</h4>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label">{t("InputsC.loadType")}</label>
          <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off" onChange={handleLoadType} value={report != null?report.loadType:null}>
              <option selected>{t("InputsC.choose")}</option>
              <option value="0">{t("InputsC.kitchen")}</option>
              <option value="1">{t("InputsC.bedroom")}</option>
              <option value="2">{t("InputsC.washroom")}</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.powerW")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number"  class="form-control" id="inputEmail3" autocomplete="off" value={report != null?report.power:null} autocomplete="nope" onChange={handlePower} />
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.loadP")}</label>
          <div class="col-sm-7 mx-0">
          <select class="custom-select custom-select"  autocomplete="off" onChange={handleLoadPhases} value={report != null?report.loadPhases:null}>
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
            <input type="number" class="form-control" id="inputEmail3" autocomplete="off" value={report != null?report.perPhase:null} onChange={handlePerPhases}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.distance")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number" class="form-control" id="inputEmail3"  autocomplete="off" value={report != null?report.distance:null} onChange={handleDistance}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.powerF")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number" step=".1" min="0" max="1" class="form-control" id="inputEmail3" value={report != null?report.powerFactor:null} autocomplete="off" onChange={handlePowerFactor} />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.voltage")} (%)</label>
          <div class="col-sm-7 mx-0">
            <input type="number" class="form-control" id="inputEmail3" autocomplete="off" onChange={handleVoltageDrop} value={report != null?report.voltageDrop:null} />
          </div>
        </div>
        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.sVoltage")} (V)</label>
        <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off" value={report != null?report.system_voltage:null}onChange={handleSystem_voltage}>
              <option selected>{t("InputsC.choose")}</option>
              <option value="120" data-bs-toggle="tooltip" data-bs-placement="right" title="120">120</option>
              <option value="208" data-bs-toggle="tooltip" data-bs-placement="right" title="208">208</option>
              <option value="220" data-bs-toggle="tooltip" data-bs-placement="right" title="220">220</option>
            </select>
          </div>
        </div>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label">{t("InputsC.aisolation")}</label>
          <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off" value={report != null?report.aisolation:null} onChange={handleAisolation}>
              <option selected>{t("InputsC.choose")}</option>
              <option value="0" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.tw")}>TW</option>
              <option value="1" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.thwn")}>THWN</option>
              <option value="2" data-bs-toggle="tooltip" data-bs-placement="right" title={t("InputsC.thhn")}>THHN</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.temperature")} (°C)</label>
          <div class="col-sm-7 mx-0">
          <input type="number" class="form-control" id="inputEmail3"  autocomplete="off" value={report != null?report.temperature:null} onChange={handleTemperature}/>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.neutral")}</label>
        <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off" value={report != null?report.feeder_include_neutral_wire:true} onChange={handleFeeder_include_neutral_wire}>
              <option value={true} selected data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.yes")}>{t("Option.yes")}</option>
              <option value={false} data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.no")}>{t("Option.no")}</option>
            </select>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">{t("InputsC.conduit")}</label>
          <div class="col-sm-7 mx-0">
            <select class="custom-select custom-select"  autocomplete="off" value={report != null?report.pipe_material:null} onChange={handlePipe_material}>
            <option selected>{t("InputsC.choose")}</option>
              <option value="0" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.PVC")}>{t("Option.PVC")}</option>
              <option value="1" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.aluminum")}>{t("Option.aluminum")}</option>
              <option value="2" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.steel")}>{t("Option.steel")}</option>

            </select>
          </div>
        </div>

        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray" onClick={()=>enviarDatos(circuitActual)}>{t("InputsC.compute")}</button></div>
        </div> 
        <div className="col-4">
            {/* <button className="btn btn-primary mt-2 gray" onClick={()=>console.log(report)}>algo</button> */}
          </div>
        <hr />
        <h3 className="text-left mb-1 bordeColor p-1 color">{t("InputsC.results")}</h3>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 " >{t("InputsC.current")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3" placeholder="0"  autocomplete="off" onChange={ e => setValues({...values,current: e.target.value}) } value={parseFloat(respuesta.current).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2" >{t("InputsC.cable")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,cable_width: e.target.value}) } value={parseFloat(respuesta.cable_width).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">{t("InputsC.pipeD")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,pipe_diameter: e.target.value}) } value={parseFloat(respuesta.pipe_diameter).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0">{t("InputsC.protectionD")}</label>
          <div class="col-sm-8 my-0">
            <input type="text" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,protection_device: e.target.value}) } value={parseFloat(respuesta.protection_device).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">{t("InputsC.voltage")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,voltaje_drop: e.target.value}) } value={parseFloat(respuesta.voltage_drop).toFixed(2)}/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray" onClick={()=>{reportGenerate();console.log(report);/* actualizarCircuit() */;/* actualizarCircuit2() */ }}>{t("Calculate.report")}</button></div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default InputsCalculate
