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

const Report = React.forwardRef(({mreport2,mountReport,arr,numeroDeCircuits,name,arregloDeIdCircuitos,nameTablero},) => {
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
  }, [numeroDeCircuits,mountReport,arregloDeIdCircuitos,mreport2])
  
  const consultarCircuit = async(id1)=> {
    await authAxios.get('/circuit/'+ id1).then(res => res.data.report.loadType != null? setEstado(estado => [...estado,{...res.data.report, name:res.data.name}]):null).catch(err => setEstado(estado => [...estado]))
  }
  return (
    <>
        <div className="jumbotron calculoAltoMin ">
      {/*     <button class="mitexto1" onClick={()=>console.log(estado)}>verrrr</button> */}
              <h2 className="text-center color mitexto1">{t("Calculate.report")}</h2>

            <table class="data-table table mb-0 tbl-server-info dataTable no-footer wh" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
              <thead class="bg-g mitexto1">
                <tr class="ligth ligth-data" role="row">
                  <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                    {t("Calculate.project")+": " +name}
                  </th>
                  <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                    {"Board: "+ nameTablero}
                  </th>
                </tr>
              </thead>
              <tbody class="ligth-body mitexto1">
                     
              </tbody>
            </table>

              <h2 className="text-center color mitexto1 mt-2">{t("Calculate.bCircuits")}</h2>
              <table class="data-table table mb-0 tbl-server-info dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead class="bg-g mitexto1">
                  <tr class="ligth ligth-data" role="row">
                    <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                      {t("Calculate.branch")}
                    </th>
                    <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                      {t("Calculate.bType")}
                    </th>
                    <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                      {t("Calculate.canalization")}
                    </th>
                    <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                      {t("Calculate.fases")}
                    </th>
                    <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                      {t("Calculate.ground")}
                    </th>
                    <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                      {t("Calculate.breaker")}
                    </th>
                    <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                      {t("Calculate.power")}
                    </th>
                  </tr>
                </thead>
                <tbody class="ligth-body">
                {
                      arregloDeIdCircuitos.map(item => 
                  <tr role="row" class="even">
                    <td class="mitexto1">{item.circuit.name}</td>
                    <td class="mitexto1">
                      {item.loadType == 0?t("InputsC.kitchen"):null}
                      {item.loadType == 1?t("InputsC.aCond"):null} 
                      {item.loadType == 2?'Motor':null}
                      {item.loadType == 3?'motor':null}
                    </td>
                    <td class="mitexto1">
                      {item.pipe_material == 0?item.pipe_diameter + '"' + t("Option.PVC"):null}
                      {item.pipe_material == 1?item.pipe_diameter + '"' + t("Option.aluminum"):null}
                      {item.pipe_material == 2?item.pipe_diameter + '"' + t("Option.steel"):null}
                    </td>
                    <td class="mitexto1">
                      {item.aisolation == 0? item.loadPhases + '# ' + item.cable_width + " AWG" + ' TW' + '-CU':null}
                      { item.aisolation == 1?item.loadPhases +  '# ' + item.cable_width + " AWG" +' THWN' + '-CU':null}
                      { item.aisolation == 2?item.loadPhases + '# ' + item.cable_width + " AWG" +' THHN' + '-CU':null}
                    </td>
                    <td class="mitexto1">{item.grounding_conductor} AWG</td>
                    <td class="mitexto1">{  item.loadPhases  + `x ${item.protection_device}` + "-A"}</td>
                    <td class="mitexto1">{  item.power}</td>
                  </tr>
                  )
                }
                </tbody>
              </table>

              <table class="data-table table mb-0 tbl-server-info dataTable no-footer wh mt-3" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
              <thead class="bg-g mitexto1">
                <tr class="ligth ligth-data" role="row">
                  <th class="sorting mitexto1" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" >
                    {t("Calculate.branch")}
                  </th>
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