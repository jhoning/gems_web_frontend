import React from 'react';
import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import Footer from '../components/Footer'
import Header from '../components/HeaderT'
import { useTranslation } from 'react-i18next';
import InputsCalculate from '../components/InputsCalculate';
import MenuTree from '../components/MenuTree'
import Report from '../components/Report';
import { useRef } from 'react';
import max from '../img/ampliar-texto.png';
import min from '../img/disminuir.png';
import ReactToPrint from 'react-to-print';
import TreeNav from '../components/TreeNav';
import axios from 'axios';
const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})
const Calculate1 = () => {
  let { id1 ,name } = useParams();
  console.log(id1);
  const [t] = useTranslation("global")
  const [values, setValues] = useState({
    current: "",
    cable_width: "",
    pipe_diameter: "",
    protection_device: "",
    voltaje_drop: "",
    circuit: {},
  });
  const [arr, setArr] = useState([]);
  const componentRef = useRef();
  const [nameProject,setNameProject] = useState(name)
  const [consultaBoard,setConsultaBoard] = useState();
  const [circuitActual,setCircuitActual] = useState(null);
  const [circuitActual1,setCircuitActual1] = useState(null);
  const [estadoInputs,setEstadoInputs] = useState({
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
    system_voltage:"0",});
  const [numeroDeCircuits,setNumeroDeCircuits] = useState([]);
  const [consultaReportes,setConsultaReportes] = useState();
  const [arregloIdReportes,setArrgloIdReportes] = useState([]);
  const [arregloDeIdCircuitos,setArregloDeIdCircuitos] = useState([])

  useEffect(() => {
    setTimeout(console.log('Arreglo de Reportes',arr),2000)
    setArregloDeIdCircuitos([])
    console.log(arr)
    
      for (let i = 0; i < numeroDeCircuits.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if(numeroDeCircuits[i].id == arr[j].circuit.id){
            setArregloDeIdCircuitos(res => [...res,arr[j]])
          }
          
        }
        
      }
   
    
  /*    setConsultaReportes(aux) */
   
   console.log('este es una consulta',consultaReportes)
    
 
  }, [numeroDeCircuits,circuitActual,arr])

  
  const reporteConsulta = async(id1)=>{
    await authAxios.get('/circuit/'+id1).then(res =>setArrgloIdReportes([...arregloIdReportes,res.data])).catch(err => console.log(err))
  }

  const amplio = () => {
    if (document.getElementById("report").style.width === '55%') {
      document.getElementById("reporte").style.width = '30%';
      document.getElementById("report").style.width = '45%';
    } else {
      document.getElementById("reporte").style.width = '20%';
      document.getElementById("report").style.width = '55%';

    } 
  }

  console.log(circuitActual)
  return (
    <div>
      <Header />
      <div className="container-fluid tbo yep">
        <div className="row grid">
          <div className="col-2 gb">
            {/* <MenuTree idCircuits={id1} /> */}
            <button onClick={()=>{console.log(arregloDeIdCircuitos)}}>ver reportes</button>
            <TreeNav idCircuits={id1} setArr={setArr} circuitActual1={circuitActual1} setCircuitActual1={setCircuitActual1} setNumeroDeCircuits={setNumeroDeCircuits} setEstadoInputs={setEstadoInputs} setConsultaBoard={setConsultaBoard} setCircuitActual={setCircuitActual} circuitActual={circuitActual}  />
          </div>
          <InputsCalculate values={values} setValues={setValues} circuitActual1={circuitActual1} estadoInputs={estadoInputs} setEstadoInputs={setEstadoInputs} setArr={setArr} arr={arr} circuitActual={circuitActual} name={nameProject} setNameProject={setNameProject} id={id1}/>
          <div className="w45 p-0 report" id="report">
            <a onClick={() => amplio()} class="point amp mr70 mt10">
              <i class="fa fa-expand mr5" aria-hidden="true"></i>
              {t("Calculate.amp")}
            </a>
            <div class="btn-toolbar f-r mt10 mr12" role="toolbar" aria-label="Botones">
              <img src={max} class="aumentar1 mr-2 ba" alt=""/>
              <img src={min} class="restablecer1 bam" alt=""/>
            </div>
            <div>
              <button onClick={()=>console.log(numeroDeCircuits)}>!!</button>
              <ReactToPrint
                trigger={() => <button class="pade btn btn-primary mt-2 gray mitexto1">{t("Calculate.print")}</button>}
                content={() => componentRef.current}
              />
              <div class="calculo" ref={componentRef}>
                <Report arr={arr} arregloDeIdCircuitos={arregloDeIdCircuitos} numeroDeCircuits={numeroDeCircuits} numeroReportes={arregloIdReportes} name={nameProject}/>
              </div>

            </div>
            {/* <button className="btn btn-primary " onClick={() => amplio()}> Ver </button> */}


          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Calculate1