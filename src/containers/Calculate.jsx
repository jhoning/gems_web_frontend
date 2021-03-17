import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/HeaderT'
import InputsCalculate from '../components/InputsCalculate'
import MenuTree from '../components/MenuTree'
import '../css/calculo.css'

const Calculate = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid tbo">
        <div className="row ">
          <div className="col-2 gb">
            <MenuTree />
          </div>
          <InputsCalculate />
          <div className="col-5 p-0">
            <div className="jumbotron p-0 mb-0 calculoAltoMin mr-0">
            <h3 className="text-center">Report</h3>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" >Project:</th>
                    <td scope="col" colspan="3"></td>
                  </tr>
                  <tr>
                    <th scope="col">Board:</th>
                    <td scope="col" colspan="3"></td>
                  </tr>
                  <tr>
                    <th scope="col">Board code:</th>
                    <td scope="col" colspan="3"></td>
                  </tr>
                  <tr>
                    <th scope="col">Board location:</th>
                    <td scope="col" colspan="3"></td>
                  </tr>
                </thead>
                <br />
                <tbody>


                </tbody>
              </table>
              <h3 className="text-center">Branch Circuits</h3>
              <table class="table table-bordered mx-0">
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
                  <tr>
                    <th scope="row">1</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                
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
