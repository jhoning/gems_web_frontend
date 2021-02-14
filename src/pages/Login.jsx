import React, { Component } from 'react';
import axios from 'axios'
import Header from '../components/Header'
import { useTranslation } from 'react-i18next';
import ReactDOM from 'react-dom';
import '../css/login_estilos.css'

//dentro de esta variable va la url a la base datos


export default class Login extends Component {

    state= {
        form:{
            email:"",
            password:""
        },
        transtale:{
            logeo:"Sing in to T-board",
            email:"Email",
            password:"Password",
            submit:"Submit",
            example:"Example123@gmail.com"
        }
    }
    
    handledChange =  e => {
         this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })

        console.log(this.state.form)
    }

    iniciarSesion = async() => {
        /* http://localhost:3000/user */
       await axios.post('http://localhost:4000/auth/login', {email:this.state.form.email,password:this.state.form.password})
       .then(response => {
           return response.data
        })
        .then(response => {
            const token = response.token
            localStorage.setItem('token', token);
            alert("Usuario logeado de forma exitosa")
            window.location.href="./t-board"
        })
        .catch(error => {
            alert("Usuario no existente por favor registrece o verifique sus datos")
      })
    }
    
    handledHeader = async (e) => {
         const traduc = {...e}   
         this.setState({
            transtale:{
                ...traduc
            }
        })
      
      console.log(this.state.transtale)
    }
    
    render(){
        return(
        <div className="app">
            <Header handledHeader={this.handledHeader}/>
            <div className="card mx-auto my-5 loginCard">
                <div className="card-body ">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-12">
                            <div id="login-box" className="col-md-12">
                                <form>
                                    <h3 className="text-center mb-5">{this.state.transtale.logeo}</h3>
                                    <div className="form-group">
                                        <label htmlFor="email" className="">{this.state.transtale.email}</label>
                                        <input type="text" name="email" id="email" placeholder={this.state.transtale.example} className="form-control" onChange={this.handledChange}></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="">{this.state.transtale.password}</label>
                                        <input type="password" name="password" id="password" placeholder='***************' className="form-control" onChange={this.handledChange}></input>
                                    </div> 
                                    <div className="form-group text-center mt-4">
                                        <a className="btn btn-outline-primary btn-lg btn-block"  onClick={()=> this.iniciarSesion()}>{this.state.transtale.submit}</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}