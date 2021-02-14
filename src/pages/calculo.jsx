import React, { Component } from 'react'
import '../css/calculo.css'
import '../css/userSettings.css'

import Header_tboard from '../components/Header_tboard'
import Footer from '../components/Footer'
export default class calculo extends Component {
    render() {
        return (
            <div>
                <Header_tboard/>
                <div className="container-fluid mx-0 my-0">
                    <div className="row my-0 py-0">
                        <div class="nav-side-menu col-2 mt-5">
                            <div class="menu-list">
                                <ul id="menu-content" class="menu-content collapse out">
                                    <li  data-toggle="collapse" data-target="#products" class="collapsed ">
                                        <a href="#"> Tab 1</a>
                                    </li>
                                    <ul class="sub-menu collapse" id="products">
                                        <li><a href="#">Project 1</a></li>
                                        <li><a href="#">Project 2</a></li>
                                        <li><a href="#">Project 3</a></li>
                                    
                                    </ul>
                                    <li data-toggle="collapse" data-target="#service" class="collapsed">
                                    <a href="#"> Tab 2</a>
                                    </li>  
                                    <ul class="sub-menu collapse" id="service">
                                        <li>Project 1</li>
                                        <li>Project 2</li>
                                        <li>Project 3</li>
                                    </ul>
                                    <li data-toggle="collapse" data-target="#new" class="collapsed">
                                        <a href="#">Tab 3</a>
                                    </li>
                                    <ul class="sub-menu collapse" id="new">
                                        <li>Project 1</li>
                                        <li>Project 2</li>
                                        <li>Project 3</li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                            <div className="col-4 my-0">
                                <div className="container mb-1">
                                    <h3 className="text-left mb-4 bordeColor p-1">Special appliance 1</h3>
                                    <div className="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label">Load Type</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select custom-select">
                                                <option selected>Choose</option>
                                                <option value="1">Kitchen</option>
                                                <option value="2">Bedroom</option>
                                                <option value="3">Washroom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row my-0">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Power Watts</label>
                                        <div class="col-sm-8 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Distance (M)</label>
                                        <div class="col-sm-8 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3"/>
                                        </div>
                                    </div>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Power factor</label>
                                        <div class="col-sm-8 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Voltaje Drop</label>
                                        <div class="col-sm-8 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Current(A)</label>
                                        <div class="col-sm-8 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" placeholder="0" />
                                        </div>
                                    </div>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Cable width</label>
                                        <div class="col-sm-8 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-6 col-form-label mx-0">Pipe diameter (inches)</label>
                                        <div class="col-sm-6 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-5 col-form-label mx-0">Protection device(A)</label>
                                        <div class="col-sm-7 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <div class="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label mx-0">Voltaje Drop</label>
                                        <div class="col-sm-8 mx-0">
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <h3 className="text-left mb-4 bordeColor p-1">Circuit settings</h3>
                                    <div className="form-group row my-1">
                                        <label for="inputEmail3" class="col-sm-4 col-form-label">Aisolation</label>
                                        <div class="col-sm-8">
                                            <select class="custom-select custom-select">
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
                                            <input type="email" class="form-control" id="inputEmail3" />
                                        </div>
                                    </div>
                                    <div className="row mx-1">
                                        <div className="col-4"></div>
                                        <div className="col-4"></div>
                                        <div className="col-4 btn btn-primary"><button className="btn btn-primary"> Compute</button></div>
                                    </div>
                                </div>
                          </div>
                        <div className="col-6">
                            <div className="jumbotron p-2 mb-0 calculoAlto">
                                   <div className="container">
                                       <h1>Report</h1>
                                   </div>
                            </div>
                        </div>
                    </div>
                    
                 </div>
                 <Footer/>
            </div>
        )
    }
}
