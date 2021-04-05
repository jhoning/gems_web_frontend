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
  return (
    <div>
      <Header />
      <div className="container-fluid tbo">
        <div className="row ">
          <div className="col-2 gb">
            <MenuTree idCircuits={id} />
          </div>
          <InputsCalculate values={values} setValues={setValues} setArr={setArr} arr={arr} />
          <div className="col-5 p-0 report">
            <div className="jumbotron calculoAltoMin ">
              <h2 className="text-center color">{t("Calculate.report")}</h2>
              <table border="1" class="table table-bordered table-sm table-striped">
                <thead class="table-secondary">
                  <tr>
                    <th scope="col-4" >{t("Calculate.project")}</th>
                  </tr>
                  <tr>

                  </tr>
                </thead>
                <br />
                <tbody>


                </tbody>
              </table>
              <h2 className="text-center color">{t("Calculate.bCircuits")}</h2>
              <table class="table table-bordered mx-0 table-sm">
                <thead class="table-secondary">
                  <tr>
                    <th scope="col" className="px-2">{t("Calculate.branch")}</th>
                    <th scope="col" className="px-2">{t("Calculate.bType")}</th>
                    <th scope="col" className="px-2">{t("Calculate.canalization")}</th>
                    <th scope="col" className="px-2">{t("Calculate.fases")}</th>
                    <th scope="col" className="px-2">{t("Calculate.ground")}</th>
                    <th scope="col" className="px-2">{t("Calculate.breaker")}</th>
                    <th scope="col" className="px-2">{t("Calculate.power")}</th>
                  </tr>
                </thead>
                <tbody>


                  {arr.map((item) => {
                    return <tr>
<th scope="col" className="px-2">{parseInt(item.cable_width + 2)}</th>
                      <th scope="col" className="px-2">{parseInt(item.current * 5)}</th>
                      <th scope="col" className="px-2">{parseInt(item.pipe_diameter * 22)}</th>
                      <th scope="col" className="px-2">{parseInt(item.protection_device + 8)}</th>
                      <th scope="col" className="px-2">{parseInt(item.voltaje_drop + 14)}</th>
                      <th scope="col" className="px-2">{parseInt(item.voltaje_drop + 9)}</th>
                      <th scope="col" className="px-2">{parseInt(item.current + 8)}</th>

                      
                    </tr>
                  })}



                </tbody>
              </table>

              <table class="table table-bordered mx-0">
                <thead class="table-secondary">
                  <tr>
                    <th scope="col" colspan="1" className="px-2">{t("Calculate.branch")}</th>
                    <th scope="col" colspan="3"></th>
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
