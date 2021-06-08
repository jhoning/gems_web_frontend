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

const InputsCalculate = ({setMreport,setMreport2, setMreport1,mreport1,mreport,setEstadoInputs,setCircuitActual,setNumeroDeCircuits,mountReport,setMountReport,setNameTablero,reportActual,nameTablero,mount1,setMount1,circuitName,setCircuitName,values,setValues,setArr,arr,circuitActual,circuitActual1,estadoInputs, name,setNameProject, id}) => {
  const [respuesta,setRespuesta] = useState({
    current: 0,
    cable_width: "0",
    pipe_diameter: "0",
    protection_device: 0,
    voltage_drop: 0,
    grounding_conductor:0
})
const [report,setReport] = useState({
  loadType:0,
  power: 0,
  distance:0,
  powerFactor: 0,
  voltageDrop: 0,
  aisolation:0,
  temperature:21,
  loadPhases:0,
  perPhase:0,
  feeder_include_neutral_wire:true,
  pipe_material:0,
  system_voltage:0,
})
const [reportAux, setReportAux] = useState()
  const [t] = useTranslation("global")
  const token = localStorage.getItem('token')
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })  
  const [projectData,setProjectData]=useState()
  useEffect(() => {
    dataProject()
   
     obtenerReportes(); 
     setReport({...estadoInputs})
     setReportAux({...estadoInputs})
     console.log({
       loadType:report.loadType,
       power: report.power,
       distance: report.distance,
       powerFactor: report.powerFactor,
       voltageDrop: report.voltageDrop,
       aisolation:report.aisolation,
       temperature:report.temperature,
       loadPhases:report.loadPhases,
       perPhase:report.perPhase,
       feeder_include_neutral_wire:report.feeder_include_neutral_wire,
       pipe_material:report.pipe_material,
       system_voltage:report.system_voltage})
     setRespuesta({
       voltage_drop:estadoInputs.voltaje_drop,
       current:estadoInputs.current,
       cable_width:estadoInputs.cable_width,
       pipe_diameter:estadoInputs.pipe_diameter,
       protection_device:estadoInputs.protection_device,
       grounding_conductor:estadoInputs.grounding_conductor,
  
     })
     console.log('comparacion de estdos:')
     console.log(JSON.stringify( report ) === JSON.stringify( reportAux ))
     if(mreport1){
      enviarDatos(circuitActual)
      modificarReporte();
      reportGenerate()
      setMreport1(false)
      setMreport(false)
      setMreport2(res => !res)
     
     }
     
  }, [estadoInputs,mount1,mountReport,mreport1]);
  const consultarCircuit = async()=> {
    await authAxios.get('/circuit/'+ circuitActual1).then(res=>{res.data.report != null?setEstadoInputs(res.data.report):setEstadoInputs({
      loadType:0,
      power: 0,
      distance: "0",
      powerFactor: 0,
      voltageDrop: "0",
      aisolation:"0",
      temperature:0,
      loadPhases:"0",
      perPhase:"1",
      feeder_include_neutral_wire:"true",
      pipe_material:0,
      system_voltage:"0",
      voltaje_drop:0,
      current:0,
      cable_width:0,
      pipe_diameter:0,
      protection_device:0,
      grounding_conductor:0,});setCircuitName(res.data.name);setMount1(mount1?false:true)}).catch(err => err)
  }
  const dataProject = async()=> {
    await authAxios.get('/project/'+ id).then(res => {setProjectData(res.data);console.log(res.data)})
  }
  const obtenerReportes = async() => {
    await authAxios.get('/report').then((resp)=>{setArr(resp.data);console.log("algo23",resp.data)});

  }  
  const enviarDatos = async(id1) => {
    await authAxios.post('/report/listForm',{
    loadType:report.loadType,
    power: report.power,
    distance: report.distance,
    powerFactor: parseFloat(report.powerFactor) ,
    voltageDrop: report.voltageDrop,
    aisolation:report.aisolation,
    temperature:report.temperature,
    loadPhases:report.loadPhases,
    perPhase:report.perPhase,
    feeder_include_neutral_wire:report.feeder_include_neutral_wire,
    pipe_material:report.pipe_material,
    system_voltage:report.system_voltage}).then(res=>{setRespuesta({...res.data });console.log('ListForm',res)}).catch(err=>alertCamp())
  }
  const cambiarNombreProject = async()=> {
    await authAxios.patch('/project/'+id,{name:name}).then(res=>{console.log(res)}).catch(err => console.log(err))
  }
  const actualizarCircuit = async()=>{
    await authAxios.get('/circuit/'+circuitActual).then(res => res.data.board_padre).then(res=> actualizarCircuit2(res))
    
      /* await authAxios.patch('/circuit/'+circuitActual,{id:circuitActual,...report,board_padre:{
       id:boardPadre.id,
       name:boardPadre.name
     }
     
    }).then(res => console.log(res)); */
  }

  const cambiarNombreCircuito = async ()=> {
    await authAxios.patch('/circuit/'+circuitActual1,{name:circuitName,board_padre:{id:circuitActual}}).then( res =>{setMount1(mount1?false:true);console.log(res)} ).catch(err => {setMount1(mount1?false:true);console.log('cambiar nombre err',err)})
  }
  const cambiarNombreTablero = async ()=> {
    await authAxios.patch('/board/'+circuitActual,{name:nameTablero,project:projectData}).then( res =>{console.log(res);setMount1(mount1?false:true);} ).catch(err => {setMount1(mount1?false:true);console.log('cambiar nombre err',err)})
  }

  const actualizarCircuit2 = async(res)=>{
   
      setTimeout(async()=>{      
         await authAxios.patch('/circuit/'+circuitActual,{id:circuitActual,...report,board_padre:{
        id:res.id,
        name:res.name
      }
      
     }).then(res => console.log(res)); },1000)

  }
  
  const modificarReporte = async()=>{
    await authAxios.patch('/report/'+reportActual,{ 
      loadType:report.loadType,
      power: report.power,
      distance: report.distance,
      powerFactor: report.powerFactor,
      voltageDrop: report.voltageDrop,
      aisolation:report.aisolation,
      temperature:report.temperature,
      loadPhases:report.loadPhases,
      perPhase:report.perPhase,
      feeder_include_neutral_wire:report.feeder_include_neutral_wire,
      pipe_material:report.pipe_material,
      system_voltage:report.system_voltage,
      cable_width: respuesta.cable_width,
      current:respuesta.current,
      pipe_diameter:respuesta.pipe_diameter,
      protection_device:respuesta.protection_device,
      voltage_drop:respuesta.voltage_drop,
      grounding_conductor: respuesta.grounding_conductor
      ,circuit:{
       id:circuitActual1,
       name:circuitName}
    }).then(res =>{ setMountReport(mountReport?false:true);consultarCircuit();setCircuitActual(res => res)})
  }

  const reportGenerate =  async() => {
    console.log(respuesta)
    console.log(values)
    console.log(arr)
    await authAxios.post('/report',{ 
      loadType:report.loadType,
      power: report.power,
      distance: report.distance,
      powerFactor: report.powerFactor,
      voltageDrop: report.voltageDrop,
      aisolation:report.aisolation,
      temperature:report.temperature,
      loadPhases:report.loadPhases,
      perPhase:report.perPhase,
      feeder_include_neutral_wire:report.feeder_include_neutral_wire,
      pipe_material:report.pipe_material,
      system_voltage:report.system_voltage,
      cable_width: respuesta.cable_width,
      current:respuesta.current,
      pipe_diameter:respuesta.pipe_diameter,
      protection_device:respuesta.protection_device,
      voltage_drop:respuesta.voltage_drop,
      grounding_conductor: respuesta.grounding_conductor
      ,circuit:{
       id:circuitActual1,
       name:circuitName
    }
    }).then(res=> {setMountReport(mountReport?false:true);consultarCircuit();setCircuitActual(res => res)}).catch(()=> {
 
  

    }

    )
    
   /*  setArr(item => [...item,{
      id:circuitActual,
     
      loadType:report.loadType,
      power: report.power,
      distance: report.distance,
      powerFactor: report.powerFactor,
      voltageDrop: report.voltageDrop,
      aisolation:report.aisolation,
      temperature:report.temperature,
      loadPhases:report.loadPhases,
      perPhase:report.perPhase,
      feeder_include_neutral_wire:report.feeder_include_neutral_wire,
      pipe_material:report.pipe_material,
      system_voltage:report.system_voltage,
      ...respuesta,circuit:{
        id:circuitActual1, name:circuitName,}
    }]) */
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

  const alertCamp = () => {
    Swal.fire({
      title: `${t("Alerts.check")}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${t("Option.accept")}`
    })
  } 

  const alert1 = () => {
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
/*   const alertreport = () => {
    Swal.fire({
      title: `${t("Alerts.mReport")}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${t("Option.accept")}`,
      cancelButtonText: `${t("Option.cancel")}`
    })
  } */

  const handlePipe_material = (e) => {
    
    setReport({...report,pipe_material:parseInt(e.target.value)});
    console.log(report)
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleLoadType = (e) => {
    setReport({...report,loadType:parseInt(e.target.value)});
    console.log(report)
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleSystem_voltage = (e) => {
    setReport({...report,system_voltage:parseInt(e.target.value)});
    console.log(report)
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleAisolation = (e) => {
    setReport({...report,aisolation:parseInt(e.target.value)});
    console.log(report)
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleLoadPhases = (e) => {
    setReport({...report,loadPhases:parseInt(e.target.value)});
    console.log(report)
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handlePower = (e) => {
    /* if(e.target.value > 8000){
      setReport({...report,power:8000});
    } else {
      
    } */
 
    setReport({...report,power:parseInt(e.target.value)});
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
 
  const handleDistance = (e) => {
    setReport({...report,distance:parseInt(e.target.value)});
    console.log(report)
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleVoltageDrop = (e) => {
    setReport({...report,voltageDrop:parseInt(e.target.value)});
    console.log(report)
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handlePowerFactor = (e) => {
      
      setReport({...report,powerFactor: e.target.value});
      if( JSON.stringify( report ) === JSON.stringify( reportAux )){
        setMreport(true)
      }
      
    
  }
  const handlePerPhases = (e) => {
    if(e.target.value < 0 ){
      setReport({...report,perPhase:parseInt(1)});
    } else {
      setReport({...report,perPhase:parseInt(e.target.value)});
    } 
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleTemperature = (e) => {
   
    setReport({...report,temperature:parseInt(e.target.value)});
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleFeeder_include_neutral_wire = (e) => {
    setReport({...report, feeder_include_neutral_wire:e.target.value});
    if( JSON.stringify( report ) === JSON.stringify( reportAux )){
      setMreport(true)
    }
  }
  const handleKeyDownBoard = (event) => {
    if (event.key === 'Enter') {
      cambiarNombreTablero()
      console.log('do validate')
    }
  }
  const handleKeyDownCircuit = (event) => {
    if (event.key === 'Enter') {
      cambiarNombreCircuito()
      console.log('do validate')
    }
  }
 

  return (<>
    <div className="w30 overflow-auto calculoAlto" id="reporte">
     {/*  <button onClick={()=>{   console.log(mreport)}}>ver report actak</button>  */}
    {/*   <button onClick={()=>{console.log(report {
      loadType:report.loadType,
      power: report.power,
      distance: report.distance,
      powerFactor: report.powerFactor,
      voltageDrop: report.voltageDrop,
      aisolation:report.aisolation,
      temperature:report.temperature,
      loadPhases:report.loadPhases,
      perPhase:report.perPhase,
      feeder_include_neutral_wire:report.feeder_include_neutral_wire,
      pipe_material:report.pipe_material,
      system_voltage:report.system_voltage} )}}>ver result</button> */}
      <div  autocomplete="off">
        <div class="font-controls btn-toolbar f-r mt5" role="toolbar" aria-label="Botones">
          <div class="font-control aumentar no-seleccionable" id="font-up">A<sup>+</sup></div>
          <div class="font-control disminuir no-seleccionable" id="font-down">A<sup>-</sup></div>
        </div>
        <div class="db">
       {/*    <button class="mr-2" onClick={() => alert()}>Alerta cambios</button>
          <button onClick={() => alertreport()}>Alerta reporte</button> */}
        </div>
    
    
      <div className="container mb-1 ml-0">
        <h4 className="text-left mb-3 p-0 mt-2 color">{t("InputsC.sAppliance")}</h4>
        <div className="row">
      
          <div class="input-group col-12" style={{width:'150px'}}>
            <label htmlFor="" className='mx-3 mt-1'>{t("Board.nBoard")}</label>  
            <input className='form-control' type="text"  value={nameTablero} onKeyDown={(e) =>handleKeyDownBoard(e)} onChange={e => setNameTablero(e.target.value)}  aria-describedby="sizing-addon2"/>
            <button className='btn btn-primary ml-2 gray' onClick={()=>{cambiarNombreTablero()}}>
              <i className="pi pi-pencil mt-1 ml-1" id="sizing-addon2" ></i>
            </button>
          </div>

          <div class="input-group col-12 mt-2" style={{width:'150px'}}>
            <label htmlFor="" className='mx-3 mt-1'>{t("Board.nCir")}</label>
            <input className='form-control' type="text"  value={circuitName} onKeyDown={(e) =>handleKeyDownCircuit(e)}  onChange={e => setCircuitName(e.target.value)}  aria-describedby="sizing-addon2"/>
            <button className='btn btn-primary ml-2 gray' onClick={()=>{cambiarNombreCircuito()}}> 
              <i className="pi pi-pencil mt-1 ml-1" id="sizing-addon2" ></i>
            </button>
        </div>
        </div>
        <hr />
      {/* //////////////////////////////////////////////////////////////////////////////// */}
        <h4 className="text-left mb-2 mt-0 bordeColor color">{t("InputsC.cSettings")}</h4>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label mitexto">{t("InputsC.loadType")}</label>
          <div class="col-sm-7 span4" id="selDiv">
            <select name="id_tipo_contacto" id="id_tipo_contacto" class="custom-select custom-select mitexto SelectOptions"  autocomplete="off" onChange={handleLoadType} value={report != null?report.loadType:null}>
              <option selected  class="mitexto">{t("InputsC.choose")}</option>
              <option value="0" class="mitexto">{t("InputsC.kitchen")}</option>
              <option value="1" class="mitexto">{t("InputsC.aCond")}</option>
              <option value="2" class="mitexto">Motor</option>
            </select>
          </div>
        </div>

        <div id="2" class="formulario none mt-1 p15 bgg">
          <label for="inputEmail3" class="col-sm-5 col-form-label mitexto f-l p0">{t("InputsC.choose")}</label>
          <div class="col-sm-7 span4 f-l m4 mu">
            <select class="custom-select custom-select mitexto"  autocomplete="off" onChange={handleLoadPhases} value={report != null?report.loadPhases:null}>
              <option selected value="1" class="mitexto">{t("Option.cM")}</option>
              <option value="2" class="mitexto">{t("Option.sV")}</option>
            </select>
          </div>
        </div>
        
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.powerW")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number"  class="form-control mitexto" id="inputEmail3" autocomplete="off" value={report != null?report.power:null} autocomplete="nope" onChange={handlePower} />
          </div>
        </div>
        <div class="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.loadP")}</label>
          <div class="col-sm-7 mx-0">
          <select class="custom-select custom-select mitexto"  autocomplete="off" onChange={handleLoadPhases} value={report != null?report.loadPhases:null}>
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
            <input type="number" class="form-control mitexto" id="inputEmail3" autocomplete="off" value={report != null?report.perPhase:null} onChange={handlePerPhases}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.distance")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number" class="form-control mitexto" id="inputEmail3"  autocomplete="off" value={report != null?report.distance:null} onChange={handleDistance}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.powerF")}</label>
          <div class="col-sm-7 mx-0">
            <input type="number" step=".1" min="0" max="100" class="form-control mitexto" id="inputEmail3" value={report != null?report.powerFactor:null} autocomplete="off" onChange={handlePowerFactor} />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.voltage")} (%)</label>
          <div class="col-sm-7 mx-0">
            <input type="number" class="form-control mitexto" id="inputEmail3" autocomplete="off" onChange={handleVoltageDrop} value={report != null?report.voltageDrop:null} />
          </div>
        </div>
        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.sVoltage")} (V)</label>
        <div class="col-sm-7">
            <select class="custom-select custom-select mitexto"  autocomplete="off" value={report != null?report.system_voltage:null}onChange={handleSystem_voltage}>
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
            <select class="custom-select custom-select mitexto"  autocomplete="off" value={report != null?report.aisolation:null} onChange={handleAisolation}>
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
          <input type="number" class="form-control mitexto" id="inputEmail3"  autocomplete="off" value={report != null?report.temperature:null} onChange={handleTemperature}/>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.neutral")}</label>
        <div class="col-sm-7">
            <select class="custom-select custom-select mitexto"  autocomplete="off" value={report != null?report.feeder_include_neutral_wire:true} onChange={handleFeeder_include_neutral_wire}>
              <option class="mitexto" value={true} selected data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.yes")}>{t("Option.yes")}</option>
              <option class="mitexto" value={false} data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.no")}>{t("Option.no")}</option>
            </select>
          </div>
        </div>

        <div class="form-group row my-1">
        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0 mitexto">{t("InputsC.conduit")}</label>
          <div class="col-sm-7 mx-0">
            <select class="custom-select custom-select"  autocomplete="off" value={report != null?report.pipe_material:0} onChange={handlePipe_material}>
              <option value="0" selected class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.PVC")}>{t("Option.PVC")}</option>
              <option value="1" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.aluminum")}>{t("Option.aluminum")}</option>
              <option value="2" class="mitexto" data-bs-toggle="tooltip" data-bs-placement="right" title={t("Option.steel")}>{t("Option.steel")}</option>

            </select>
          </div>
        </div>

        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray mitexto" onClick={()=>enviarDatos(circuitActual)}>{t("InputsC.compute")}</button></div>
        </div> 
        <div className="col-4">
            {/* <button className="btn btn-primary mt-2 gray" onClick={()=>console.log(report)}>algo</button> */}
          </div>
        <hr />
        <h4 className="text-left mb-1 bordeColor p-1 color">{t("InputsC.results")}</h4>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 mitexto" >{t("InputsC.current")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3" placeholder="0"  autocomplete="off" onChange={ e => setValues({...values,current: e.target.value}) } value={parseFloat(respuesta.current).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 mitexto" >{t("InputsC.cable")}(AWG)</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,cable_width: e.target.value}) } value={parseInt(respuesta.cable_width)}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mitexto">{t("InputsC.pipeD")}</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,pipe_diameter: e.target.value}) } value={respuesta.pipe_diameter}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0 mitexto">{t("InputsC.protectionD")}</label>
          <div class="col-sm-8 my-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,protection_device: e.target.value}) } value={parseFloat(respuesta.protection_device).toFixed(2)}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0 mitexto">{t("Calculate.gCond")}(AWG)</label>
          <div class="col-sm-8 my-0">
            <input type="text" class="form-control text-right mt-2 mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,grounding_conductor: e.target.value}) } value={respuesta.grounding_conductor}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mitexto">{t("InputsC.voltage")}(%)</label>
          <div class="col-sm-8 mx-0">
            <input type="text" class="form-control text-right mitexto" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,voltaje_drop: e.target.value}) } value={parseFloat(respuesta.voltage_drop).toFixed(2)}/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray mitexto" onClick={()=>{modificarReporte();reportGenerate(); setMreport(false)/* actualizarCircuit() *//* actualizarCircuit2() */ }}>{t("Calculate.report")}</button></div>
        </div>
      </div>
      </div>
    </div>
  </>
  )
}

export default InputsCalculate
