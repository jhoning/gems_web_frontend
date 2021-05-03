import React from 'react';
import { useTranslation } from 'react-i18next';

const Report = React.forwardRef(({arr}) => {
  const [t] = useTranslation("global")
  return (
    <>
        <div className="jumbotron calculoAltoMin ">
              <h2 className="text-center color mitexto1">{t("Calculate.report")}</h2>
              <table border="1" class="mitexto1 table table-bordered table-sm table-striped calculo">
                <thead class="table-secondary"> 
                  <tr class="borde1">
                    <th scope="col-4" className="px-2 mitexto1">{t("Calculate.project")}</th>
                  </tr>
                  <tr>
                  </tr>
                </thead>
                <br />
                <tbody>


                </tbody>
              </table>
              <h2 className="text-center color mitexto1">{t("Calculate.bCircuits")}</h2>
              <table class="table table-bordered mx-0 table-sm">
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
                      <th scope="col" className="px-2 mitexto1">{parseFloat(item.cable_width + 2).toFixed(1)}</th>
                      <th scope="col" className="px-2 mitexto1">{parseFloat(item.current * 5).toFixed(1)}</th>
                      <th scope="col" className="px-2 mitexto1">{parseFloat(item.pipe_diameter * 22).toFixed(1)}</th>
                      <th scope="col" className="px-2 mitexto1">{parseFloat(item.protection_device + 8).toFixed(1)}</th>
                      <th scope="col" className="px-2 mitexto1">{parseFloat(item.voltaje_drop + 14).toFixed(1)}</th>
                      <th scope="col" className="px-2 mitexto1">{parseFloat(item.voltaje_drop + 9).toFixed(1)}</th>
                      <th scope="col" className="px-2 mitexto1">{parseFloat(item.current + 8).toFixed(1)}</th>


                    </tr>
                  })}



                </tbody>
              </table>

              <table class="table table-bordered mx-0">
                <thead class="table-secondary">
                  <tr class="borde1">
                    <th scope="col" colspan="1" className="px-2 mitexto1">{t("Calculate.branch")}</th>
                    <th scope="col" class="mitexto1" colspan="3"></th>
                  </tr>
                </thead>
                <tbody>


                </tbody>
              </table>

            </div>
    </>
  )
})

export default Report