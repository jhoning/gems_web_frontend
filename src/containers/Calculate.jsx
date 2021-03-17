import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/HeaderT'
import InputsCalculate from '../components/InputsCalculate'
import MenuTree from '../components/MenuTree'
import '../css/calculo.css'
import { useState,useEffect} from 'react'

const Calculate = () => {
  
  const [values,setValues] = useState({
    current:"",
    cable_width:"",
    pipe_diameter:"", 
    protection_device:"",
    voltaje_drop:"",
    circuit:{},
    
  })

  const [arr,setArr] = useState([])
  return (
    <div>
      <Header />
      <div className="container-fluid tbo">
        <div className="row ">
          <div className="col-3">
            <MenuTree />
          </div>
          <InputsCalculate values={values} setValues={setValues} setArr={setArr} arr={arr}/>
          <div className="col-5 p-0">
            <div className="jumbotron p-0 mb-0 calculoAltoMin mr-0">
            <h2 className="text-center">Report</h2>
              <table border="1"class="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th scope="col-4" >Project:</th>
              
                  </tr>
                  <tr>
                
                  </tr>
                </thead>
                <br />
                <tbody>


                </tbody>
              </table>
              <h2 className="text-center">Branch Circuits</h2>
              <table class="table table-bordered mx-0 table-sm">
                <thead>
                  <tr>
                    <th scope="col" className="px-2">Branch</th>
                    <th scope="col" className="px-2">Branc Type</th>
                    <th scope="col" className="px-2">Canalization</th>
                    <th scope="col" className="px-2">Fases</th>
                    <th scope="col" className="px-2">Ground</th>
                    <th scope="col" className="px-2">Breaker</th>
                    <th scope="col" className="px-2">Power</th>
                  </tr>
                </thead>
                <tbody>
                 
                   
                    {arr.map((item)=>{return   <tr>
                    <th scope="col" className="px-2">{parseInt(item.cable_width+2)}</th>
                    <th scope="col" className="px-2">{parseInt(item.current*5)}</th>
                    <th scope="col" className="px-2">{parseInt(item.pipe_diameter*22)}</th>
                    <th scope="col" className="px-2">{parseInt(item.protection_device+8)}</th>
                    <th scope="col" className="px-2">{parseInt(item.voltaje_drop+14)}</th>
                    <th scope="col" className="px-2">{parseInt(item.id+9)}</th>
                    <th scope="col" className="px-2">{parseInt(item.current+8)}</th>
                 
                 
                  </tr>})}
                 
              
                
                </tbody>
              </table>

              <table class="table table-bordered mx-0">
                <thead>
                  <tr>
                    <th scope="col" colspan="1" className="px-2">Branch</th>
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
