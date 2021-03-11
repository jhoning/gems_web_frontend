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
          <div className="col-3">
            <MenuTree />
          </div>
          <InputsCalculate />
          <div className="col-5">
            <div className="jumbotron p-2 mb-0 calculoAltoMin">

              
              
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Calculate
