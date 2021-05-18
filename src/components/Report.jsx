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

const Report = React.forwardRef(({arr,numeroDeCircuits,name},) => {
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
  }, [numeroDeCircuits])
  
  const consultarCircuit = async(id1)=> {
    await authAxios.get('/circuit/'+ id1).then(res => res.data.report.loadType != null? setEstado(estado => [...estado,{...res.data.report, name:res.data.name}]):null).catch(err => setEstado(estado => [...estado]))
  }
  return (
    <>
        <div className="jumbotron calculoAltoMin ">
          <button onClick={()=>console.log(estado)}>verrrr</button>
              <h2 className="text-center color">{t("Calculate.report")}</h2>
              <table border="1" class="table table-bordered table-sm table-striped calculo">
                <thead class="table-secondary"> 
                  <tr class="borde1">
                    <th scope="col-4" className="px-2 mitexto1">{t("Calculate.project")+": " +name}</th>
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
                  
                <tr>
                      <th scope="col" className="px-2"> noombre{
               
                      /* numeroDeCircuits != []?numeroDeCircuits[i].name +" "+ numeroDeCircuits[i].id:null */}{/* {parseFloat(item.cable_width + 2).toFixed(1)} */}</th>
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
                      Kitchen"
                      </th>
                      <th scope="col" className="px-2">  
                        232323 +  inch PVC
                      
                      </th>
                      <th scope="col" className="px-2">
                      13 THW steel-CU</th>
               
                      <th scope="col" className="px-2">{parseFloat( 14).toFixed(1)}#-Cobre</th>
                      <th scope="col" className="px-2">{  2 + `3232` + "-A"}</th>
                      <th scope="col" className="px-2">{3232}</th>


                    </tr>
                <tr>
                      <th scope="col" className="px-2"> noombre{
               
                      /* numeroDeCircuits != []?numeroDeCircuits[i].name +" "+ numeroDeCircuits[i].id:null */}{/* {parseFloat(item.cable_width + 2).toFixed(1)} */}</th>
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
                      Kitchen"
                      </th>
                      <th scope="col" className="px-2">  
                        232323 +  inch PVC
                      
                      </th>
                      <th scope="col" className="px-2">
                      13 THW steel-CU</th>
               
                      <th scope="col" className="px-2">{parseFloat( 14).toFixed(1)}#-Cobre</th>
                      <th scope="col" className="px-2">{  2 + `3232` + "-A"}</th>
                      <th scope="col" className="px-2">{3232}</th>


                    </tr>
                <tr>
                      <th scope="col" className="px-2"> noombre{
               
                      /* numeroDeCircuits != []?numeroDeCircuits[i].name +" "+ numeroDeCircuits[i].id:null */}{/* {parseFloat(item.cable_width + 2).toFixed(1)} */}</th>
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
                      Kitchen"
                      </th>
                      <th scope="col" className="px-2">  
                        232323 +  inch PVC
                      
                      </th>
                      <th scope="col" className="px-2">
                      13 THW steel-CU</th>
               
                      <th scope="col" className="px-2">{parseFloat( 14).toFixed(1)}#-Cobre</th>
                      <th scope="col" className="px-2">{  2 + `3232` + "-A"}</th>
                      <th scope="col" className="px-2">{3232}</th>


                    </tr>
                <tr>
                      <th scope="col" className="px-2"> noombre{
               
                      /* numeroDeCircuits != []?numeroDeCircuits[i].name +" "+ numeroDeCircuits[i].id:null */}{/* {parseFloat(item.cable_width + 2).toFixed(1)} */}</th>
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
                      Kitchen"
                      </th>
                      <th scope="col" className="px-2">  
                        232323 +  inch PVC
                      
                      </th>
                      <th scope="col" className="px-2">
                      13 THW steel-CU</th>
               
                      <th scope="col" className="px-2">{parseFloat( 14).toFixed(1)}#-Cobre</th>
                      <th scope="col" className="px-2">{  2 + `3232` + "-A"}</th>
                      <th scope="col" className="px-2">{3232}</th>


                    </tr>
                <tr>
                      <th scope="col" className="px-2"> noombre{
               
                      /* numeroDeCircuits != []?numeroDeCircuits[i].name +" "+ numeroDeCircuits[i].id:null */}{/* {parseFloat(item.cable_width + 2).toFixed(1)} */}</th>
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
                      Kitchen"
                      </th>
                      <th scope="col" className="px-2">  
                        232323 +  inch PVC
                      
                      </th>
                      <th scope="col" className="px-2">
                      13 THW steel-CU</th>
               
                      <th scope="col" className="px-2">{parseFloat( 14).toFixed(1)}#-Cobre</th>
                      <th scope="col" className="px-2">{  2 + `3232` + "-A"}</th>
                      <th scope="col" className="px-2">{3232}</th>


                    </tr>
                <tr>
                      <th scope="col" className="px-2"> noombre{
               
                      /* numeroDeCircuits != []?numeroDeCircuits[i].name +" "+ numeroDeCircuits[i].id:null */}{/* {parseFloat(item.cable_width + 2).toFixed(1)} */}</th>
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
                      Kitchen"
                      </th>
                      <th scope="col" className="px-2">  
                        232323 +  inch PVC
                      
                      </th>
                      <th scope="col" className="px-2">
                      13 THW steel-CU</th>
               
                      <th scope="col" className="px-2">{parseFloat( 14).toFixed(1)}#-Cobre</th>
                      <th scope="col" className="px-2">{  2 + `3232` + "-A"}</th>
                      <th scope="col" className="px-2">{3232}</th>


                    </tr>
            

            
                  



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