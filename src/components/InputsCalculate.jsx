import React from 'react'
import '../css/calculo.css'
import '../css/userSettings.css'

const InputsCalculate = () => {
  return (
    <div className="col-5 my-0 overflow-auto calculoAlto mb-1 ">
      <div className="container mb-1 ">
        <h3 className="text-center mb-0 p-0 mt-2">Special appliance 1</h3>
         <hr />
        <h4 className="text-left mb-3 mt-0 bordeColor">Circuit settings</h4>
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
            <input type="email" class="form-control" id="inputEmail3" autocomplete="off" />
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
          <div className="col-4"><button className="btn btn-primary mt-2">Compute</button></div>
        </div>
        <hr />
        <h3 className="text-left mb-4 bordeColor p-1">Results:</h3>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2 ">Current (A)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3" placeholder="0"  autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0 mt-2">Cable width</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Pipe diameter (inch)</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>
        <div class="form-group row my-0">
          <label for="inputEmail3" class="col-sm-4 col-form-label my-0">Protection device (A)</label>
          <div class="col-sm-8 my-0">
            <input type="email" class="form-control text-right mt-2" id="inputEmail3"  autocomplete="off" />
          </div>
        </div>
        <div class="form-group row my-1">
          <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Voltaje drop</label>
          <div class="col-sm-8 mx-0">
            <input type="email" class="form-control text-right" id="inputEmail3"  autocomplete="off"/>
          </div>
        </div>
        <div className="row mx-1">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4"><button className="btn btn-primary mt-2">Report</button></div>
        </div>
      </div>
    </div>
  )
}

export default InputsCalculate
