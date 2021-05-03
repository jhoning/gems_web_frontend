import React,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';
const Report = React.forwardRef(({arr,numeroDeCircuits},) => {
  const [t] = useTranslation("global")
  useEffect(() => {
   
  }, [numeroDeCircuits])
  return (
    <>
        <div className="jumbotron calculoAltoMin ">
          <button onClick={()=>console.log(numeroDeCircuits)}>verrrr</button>
              <h2 className="text-center color">{t("Calculate.report")}</h2>
              <table border="1" class="table table-bordered table-sm table-striped calculo">
                <thead class="table-secondary"> 
                  <tr class="borde1">
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
                  <tr class="borde">
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


                  {
                    numeroDeCircuits != undefined?
                  numeroDeCircuits.map((item,i) => {
                    return <tr>
                      <th scope="col" className="px-2">{numeroDeCircuits[i].name +" "+ numeroDeCircuits[i].id}{/* {parseFloat(item.cable_width + 2).toFixed(1)} */}</th>
                      {/* 
                        branch:
                          es el nombre del circuito;
                        Luminaries:
                          el tipo de carga
                        canalization:
                          1/2,3/4,1,1 1/2,2,3,4,5,6 inch"
                          material de la tuberia: pvc, aluminio o acero;
                          fases:
                          return (neutralWire?cablePerphases:cablePherfases + 1) + aisolation.state + "- CU"
                        ground:
                          es un output falta crearlo;
                        breaker:
                          cablePerphases  `x +${protection_device}` + "-A"
                        power:
                         toInt(power.value) 


                      */} 
                      <th scope="col" className="px-2">
                        {numeroDeCircuits[i].loadType == 0? "Kitchen":null} 
                        {numeroDeCircuits[i].loadType == 1? "Bedroom":null}
                        {numeroDeCircuits[i].loadType == 2? "Washroom":null}{/* {parseFloat(item.current * 5).toFixed(1)} */}</th>
                      <th scope="col" className="px-2">  
                        {numeroDeCircuits[i].pipe_material == 0? "1/2 inch PVC":null} 
                        {numeroDeCircuits[i].pipe_material == 1? "1/2 inch Aluminum":null} 
                        {numeroDeCircuits[i].pipe_material == 2? "1/2 inch Steel":null} 
                      </th>
                      <th scope="col" className="px-2">{
                   /*    numeroDeCircuits[i].
                      (neutralWire?cablePerphases:cablePherfases + 1) + aisolation.state + "- CU" */}</th>
                      <th scope="col" className="px-2">{parseFloat(item.voltaje_drop + 14).toFixed(1)}#-Cobre</th>
                      <th scope="col" className="px-2">{   numeroDeCircuits[i].perPhase + `Prueba` + "-A"}</th>
                      <th scope="col" className="px-2">{numeroDeCircuits[i].power}</th>


                    </tr>
                  }):null}



                </tbody>
              </table>

              <table class="table table-bordered mx-0">
                <thead class="table-secondary">
                  <tr class="borde1">
                    <th scope="col" colspan="1" className="px-2">{t("Calculate.branch")}</th>
                    <th scope="col" colspan="3"></th>
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