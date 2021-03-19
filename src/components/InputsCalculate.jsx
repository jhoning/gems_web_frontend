import React from 'react'
import '../css/calculo.css'
import '../css/userSettings.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
const InputsCalculate = ({values,setValues,setArr,arr}) => {
  const token = localStorage.getItem('token')
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })  
  
  useEffect(() => {
    obtenerReportes();
  }, []);
  const [report,setReport] = useState({
    current: "",
    cable_width: "",
    pipe_diameter: "",
    protection_device: "",
    voltaje_drop: "",
    circuit: {},

  })
  const obtenerReportes = async() => {
    await authAxios.get('/report').then((resp)=>setArr(resp.data));
  } 

  const reportGenerate =  async() => {
    setArr([...arr,report])
    console.log(values)
    console.log(arr)
     await authAxios.post('/report',report).then(res => alert("generado el reporte exitosamente")).catch(err => console.log(err)) 
  }

  return (
    <div className="col-4 overflow-auto calculoAlto">
      <div className="container mb-1 ">
        <h3 className="text-center mb-0 p-0 mt-2 color">Special appliance 1</h3>
         <hr />
        <h4 className="text-left mb-3 mt-0 bordeColor color">Circuit settings</h4>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label">Load type</label>
          <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off">
              <option selected>Choose</option>
              <option value="1">Kitchen</option>
              <option value="2">Bedroom</option>
              <option value="3">Washroom</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">Power (W)</label>
          <div class="col-sm-7 mx-0">
            <input type="email" class="form-control" id="inputEmail3" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">Distance (M)</label>
          <div class="col-sm-7 mx-0">
            <input type="email" class="form-control" id="inputEmail3"  autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">Power factor</label>
          <div class="col-sm-7 mx-0">
            <input type="email" class="form-control" id="inputEmail3" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">Voltaje drop</label>
          <div class="col-sm-7 mx-0">
            <input type="email" class="form-control" id="inputEmail3" autocomplete="off"  />
          </div>
        </div>
        <div className="form-group row my-1 se">
          <label for="inputEmail3" class="col-sm-5 col-form-label">Aisolation</label>
          <div class="col-sm-7">
            <select class="custom-select custom-select"  autocomplete="off">
              <option selected>Choose</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">Temperature</label>
          <div class="col-sm-7 mx-0">
            <input type="email" class="form-control" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray" onClick={()=>{setReport({
             current:parseInt( Math.random()*99),
             cable_width:parseInt( Math.random()*99),
             pipe_diameter:parseInt( Math.random()*99),
             protection_device:parseInt( Math.random()*99),
             voltaje_drop:parseInt( Math.random()*99),
             circuit: {}
          })}}>Compute</button></div>
          <button className="btn btn-primary mt-2 gray" onClick={()=>console.log(report)}>algo</button>
        </div>
        <hr />
        <h3 className="text-left mb-1 bordeColor p-1 color">Results:</h3>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 " >Current (A)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3" placeholder="0"  autocomplete="off" onChange={ e => setValues({...values,current: e.target.value}) } value={report.current}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2" >Cable width</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,cable_width: e.target.value}) } value={report.cable_width}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Pipe diameter (inch)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,pipe_diameter: e.target.value}) } value={report.pipe_diameter}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0">Protection device (A)</label>
          <div class="col-sm-8 my-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,protection_device: e.target.value}) } value={report.voltaje_drop}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Voltaje drop</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,voltaje_drop: e.target.value}) } value={report.protection_device}/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2 gray" onClick={()=>reportGenerate()}>Report</button></div>
        </div>
      </div>
    </div>
  )
}

export default InputsCalculate
