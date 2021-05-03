import React from 'react';
import { useState } from 'react'
import { useParams } from "react-router";
import Footer from '../components/Footer'
import Header from '../components/HeaderT'
import { useTranslation } from 'react-i18next';
import InputsCalculate from '../components/InputsCalculate';
import MenuTree from '../components/MenuTree'
import Report from '../components/Report';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import NavTree from '../components/NavTree';
const Calculate1 = () => {
  let { id1 } = useParams();
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
  const [consultaBoard,setConsultaBoard] = useState();
  const [circuitActual,setCircuitActual] = useState(null);
  const [estadoInputs,setEstadoInputs] = useState()
  const [numeroDeCircuits,setNumeroDeCircuits] = useState()
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
            <NavTree idCircuits={id1} setArr={setArr} setNumeroDeCircuits={setNumeroDeCircuits} setEstadoInputs={setEstadoInputs} setConsultaBoard={setConsultaBoard} setCircuitActual={setCircuitActual} circuitActual={circuitActual}/>
          </div>
          <InputsCalculate values={values} setValues={setValues} setEstadoInputs={setEstadoInputs} setArr={setArr} arr={arr} circuitActual={circuitActual} />
          <div className="w45 p-0 report" id="report">
            <a onClick={() => amplio()} class="point amp mt10">
              <i class="fa fa-expand mr5" aria-hidden="true"></i>
              {t("Calculate.amp")}
            </a>
            <div>
              <button onClick={()=>console.log(numeroDeCircuits)}>!!</button>
              <ReactToPrint
                trigger={() => <button class="pade btn btn-primary mt-2 gray">{t("Calculate.print")}</button>}
                content={() => componentRef.current}
              />
              <div class="calculo" ref={componentRef}>
                <Report arr={arr} numeroDeCircuits={numeroDeCircuits}/>
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