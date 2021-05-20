import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/HeaderT'
import { useTranslation } from 'react-i18next';
import InputsCalculate from '../components/InputsCalculate'
import MenuTree from '../components/MenuTree'
import '../css/calculo.css'
import { useState, useEffect } from 'react'
import { useParams } from "react-router";

const Calculate = () => {
 
  
  let {id} = useParams();
  console.log(id)
  const [t] = useTranslation("global")
  const [values, setValues] = useState({
    current: "",
    cable_width: "",
    pipe_diameter: "",
    protection_device: "",
    voltaje_drop: "",
    circuit: {},

  });
  useEffect(()=>{},[])
  const [arr, setArr] = useState([])

  const amplio = () => {
    if (document.getElementById("report").style.width === '55%') {
      document.getElementById("reporte").style.width = '30%';
      document.getElementById("report").style.width = '45%';
      } else {
      document.getElementById("reporte").style.width = '20%';
      document.getElementById("report").style.width = '55%';

      }
  }
  return (
    <div class="gray">
      <Header />
      <div className="container-fluid tbo yep">
        <div className="row grid">
          <div className="dos gb">
            <MenuTree idCircuits={id} />
          </div>
          <InputsCalculate idProject={id} values={values} setValues={setValues} setArr={setArr} arr={arr} />
          <div className="w45 p-0 report" id="report">
          <a onClick={() => amplio()} class="point amp mt10">
            <i class="fa fa-expand mr5" aria-hidden="true"></i>
            {t("Calculate.amp")}
          </a>
          <div class="btn-toolbar f-r mt5" role="toolbar" aria-label="Botones">
            <img src={max} class="aumentar1 mr-2 ba" alt=""/>
            <img src={min} class="disminuir1 bam" alt=""/>
          </div>
            <div className="jumbotron calculoAltoMin ">
              <h2 className="text-center color">{t("Calculate.report")}</h2>
              <table border="1" class="table table-bordered table-sm table-striped calculo mitexto1">
                <thead class="table-secondary mitexto1">
                  <tr class="borde1 mitexto1">
                    <th scope="col-4 mitexto1" >{t("Calculate.project")}</th>
                  </tr>
                  <tr>

                  </tr>
                </thead>
                <br />
                <tbody>


                </tbody>
              </table>
              <h2 className="text-center color">{t("Calculate.bCircuits")}</h2>
              <table class="table table-bordered mx-0 table-sm calculo">
                <thead class="table-secondary">
                  <tr class="borde">
                    <th scope="col" className="px-2 mitexto1">{t("Calculate.branch")}</th>
                    <th scope="col" className="px-2 mitexto1">{t("Calculate.bType")}</th>
                    <th scope="col" className="px-2 mitexto1">{t("Calculate.canalization")}</th>
                    <th scope="col" className="px-2 mitexto1">{t("Calculate.fases")}</th>
                    <th scope="col" className="px-2 mitexto1">{t("Calculate.ground")}</th>
                    <th scope="col" className="px-2 mitexto1">{t("Calculate.breaker")}</th>
                    <th scope="col" className="px-2 mitexto1">{t("Calculate.power")}</th>
                  </tr>
                </thead>
                <tbody>


                  {arr.map((item) => {
                    return <tr>
<th scope="col" className="px-2 mitexto1">{parseInt(item.cable_width + 2)}</th>
                      <th scope="col" className="px-2 mitexto1">{item.current * 5}</th>
                      <th scope="col" className="px-2 mitexto1">{item.pipe_diameter * 22}</th>
                      <th scope="col" className="px-2 mitexto1">{item.protection_device + 8}</th>
                      <th scope="col" className="px-2 mitexto1">{item.voltaje_drop + 14}</th>
                      <th scope="col" className="px-2 mitexto1">{item.voltaje_drop + 9}</th>
                      <th scope="col" className="px-2 mitexto1">{item.current + 8}</th>

                      
                    </tr>
                  })}


 
                </tbody>
              </table>

              <table class="table table-bordered mx-0 calculo">
                <thead class="table-secondary">
                  <tr class="borde1">
                    <th scope="col" colspan="1" className="px-2 mitexto1">{t("Calculate.branch")}</th>
                    <th scope="col" colspan="3" class="mitexto1"></th>
                  </tr>
                </thead>
                <tbody>


                </tbody>
              </table>

            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Calculate
