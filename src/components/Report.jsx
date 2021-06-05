import React,{useEffect,useState} from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})

const Report = React.forwardRef(({mountReport,arr,numeroDeCircuits,name,arregloDeIdCircuitos,nameTablero},) => {
  const [t] = useTranslation("global")
  const [consultaCircuitos,setConsultaCircuitos] = useState([])
  const [estado,setEstado] = useState([])
  const [estado1,setEstado1] = useState([])
  const THW = ['TW','THWN','THHN']
  useEffect(() => {
    console.log(numeroDeCircuits)
    setEstado([])
    setEstado1([])
   
    if(numeroDeCircuits != undefined){
      for (let i = 0; i < numeroDeCircuits.length; i++) {
      
        consultarCircuit(numeroDeCircuits[i].id)
      }
    }
    
    
    console.log(estado)
  }, [numeroDeCircuits,mountReport,arregloDeIdCircuitos])
  
  const consultarCircuit = async(id1)=> {
    await authAxios.get('/circuit/'+ id1).then(res => res.data.report.loadType != null? setEstado(estado => [...estado,{...res.data.report, name:res.data.name}]):null).catch(err => setEstado(estado => [...estado]))
  }
  return (
    <>
        <div className="jumbotron calculoAltoMin ">
      {/*     <button class="mitexto1" onClick={()=>console.log(estado)}>verrrr</button> */}
              <h2 className="text-center color">{t("Calculate.report")}</h2>
              <table border="1" class="table table-bordered table-sm table-striped calculo">
                <thead class="table-secondary mitexto1"> 
                  <tr class="borde1">
                    <th scope="col-4" className="px-2 mitexto1">{t("Calculate.project")+": " +name}</th>
                    <th scope="col-4" className="px-2 mitexto1">{"Board: "+ nameTablero}</th>
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
                  
                 
                    {
                      arregloDeIdCircuitos.map(item => 
                        <tr>
                          <th class="mitexto1">{item.circuit.name}</th>
                          <th class="mitexto1">
                            {item.loadType == 0?'Kitchen':null}
                            {item.loadType == 1?'Air-Conditioned':null} 
                            {item.loadType == 2?'Motor':null}
                            {item.loadType == 3?'motor':null}
                          </th>
                          <th class="mitexto1">
                            {item.pipe_material == 0?item.pipe_diameter + '"' + ' PVC':null}
                            {item.pipe_material == 1?item.pipe_diameter + '"' + ' Aluminum':null}
                            {item.pipe_material == 2?item.pipe_diameter + '"' + ' Steel':null}
                          </th>
                          <th class="mitexto1">
                          {item.aisolation == 0?item.perPhase + 'x ' + item.cable_width + " AWG" + ' TW' + '-CU':null}
                          { item.aisolation == 1?item.perPhase +  'x ' + item.cable_width + " AWG" +' THWN' + '-CU':null}
                          { item.aisolation == 2?item.perPhase + + 'x ' + item.cable_width + " AWG" +' THHN' + '-CU':null}
                        {
                        
                    
                        /*  {item.aisolation == 0 && item.feeder_include_neutral_wire == "true"?item.perPhase + ' TW' + '-CU':null}
                            {item.aisolation == 0 && item.feeder_include_neutral_wire == "false" ?item.perPhase + 1 + ' TW' + '-CU':null}
                            {item.aisolation == 1 && item.feeder_include_neutral_wire == "true"  ?item.perPhase + 1 + ' THWN'+'-CU':null}
                            {item.aisolation == 1 && item.feeder_include_neutral_wire == "false"  ?item.perPhase  + ' THWN'+'-CU':null}
                            {item.aisolation == 2 && item.feeder_include_neutral_wire == "true" ?item.perPhase + 1 + ' THHN'+'-CU':null}
                            {item.aisolation == 2 && item.feeder_include_neutral_wire == "false" ?item.perPhase + ' THHN'+'-CU':null} */}
                            
                          </th>
                          <th class="mitexto1">{item.grounding_conductor} AWG</th>
                          <th class="mitexto1">{  item.perPhase + `x ${item.protection_device}` + "-A"}</th>
                          <th class="mitexto1">{  item.power}</th>
                        </tr>
            
                      )
                    }
               
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


         

            
                  



                </tbody>
              </table>

              <table class="table table-bordered mx-0 mitexto1">
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