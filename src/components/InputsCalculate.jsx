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

  const obtenerReportes = async() => {
    await authAxios.get('/report').then((resp)=>setArr(resp.data));
  } 

  const reportGenerate =  async() => {
    setArr([...arr,1])
    console.log(values)
    console.log(arr)
     await authAxios.post('/report',values).then(res => alert("generado el reporte exitosamente")).catch(err => console.log(err)) 
  }

  return (
    <div className="col-4 my-0 overflow-auto calculoAlto mb-1 ">
      <div className="container mb-1 ">
        <h3 className="text-center mb-0 p-0">Special appliance 1</h3>
         <hr />
        <h3 className="text-left mb-4 mt-0 bordeColor p-1">Circuit settings</h3>
        <div className="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label">Load type</label>
          <div class="col-sm-8">
            <select class="custom-select custom-select"  autocomplete="off">
              <option selected>Choose</option>
              <option value="1">Kitchen</option>
              <option value="2">Bedroom</option>
              <option value="3">Washroom</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Power (W)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control" id="inputEmail3" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Distance (M)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control" id="inputEmail3"  autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Power factor</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control" id="inputEmail3" autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Voltaje drop</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control" id="inputEmail3" autocomplete="off"  />
          </div>
        </div>
        <div className="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label">Aisolation</label>
          <div class="col-sm-8">
            <select class="custom-select custom-select"  autocomplete="off">
              <option selected>Choose</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Temperature</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2" onClick={()=>console.log(arr)}>Compute</button></div>
        </div>
        <hr />
        <h3 className="text-left mb-4 bordeColor p-1">Results:</h3>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 " >Current (A)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3" placeholder="0"  autocomplete="off" onChange={ e => setValues({...values,current: e.target.value}) } value={values.current}/>
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2" >Cable width</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,cable_width: e.target.value}) } value={values.cable_width}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Pipe diameter (inch)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,pipe_diameter: e.target.value}) } value={values.pipe_diameter}/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0">Protection device (A)</label>
          <div class="col-sm-8 my-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,protection_device: e.target.value}) } value={values.protection_device}/>
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Voltaje drop</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right" id="inputEmail3"  autocomplete="off" onChange={ e => setValues({...values,voltaje_drop: e.target.value}) } value={values.voltaje_drop}/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2" onClick={()=>reportGenerate()}>Report</button></div>
        </div>
      </div>
    </div>
  )
}

export default InputsCalculate
