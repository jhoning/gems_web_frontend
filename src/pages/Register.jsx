import React, { Component } from 'react';
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/Register.css'



export default class Login extends Component {

    state= {
        form:{
            username:"",
            email:"",
            password:"",
            first_name:"",
            last_name:"",
            profesionalID:""
           
        }
    }
    
    handledChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })

        console.log(this.state.form)
    }

    Registrar = async() => {
        /* http://localhost:3000/user */
       await axios.post('http://localhost:4000/user', {username:this.state.form.username,email:this.state.form.email,password:this.state.form.password,first_name:this.state.form.first_name,last_name:this.state.form.last_name,profesionalID:this.state.form.profesionalID})
       .then(response=> { 
        return response.date
        })
        .then(reponse =>{
            
            const data = reponse;
            alert("Usuarios Registrado de forma exitosa!")
            window.location.href="./"
        })
        .catch(error =>{
            console.log(error);
        }
            
        )
    }

    render(){
        return(
        <div className="app">
            <Header />
            <div className="card mx-auto mt-5 registerUser">
               <div className="row justify-content-center align-items-center">
                    <div className="col-md-12">
                        <h3 className="text-center mb-4">Register your account</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Username" className="form-label">Username</label>
                                <input className="form-control" name="username" type="text"  placeholder="Enter Username"  onChange={this.handledChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input className="form-control"  name="email" type="email"  placeholder="Enter Email" onChange={this.handledChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input className="form-control" name="password" type="password"  placeholder="Enter Password" onChange={this.handledChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="First name" className="form-label">First name</label>
                                <input className="form-control" name="first_name" type="text"  placeholder="Enter First name" onChange={this.handledChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="last name" className="form-label">last name</label>
                                <input className="form-control" name="last_name" type="text"  placeholder="Enter Last name" onChange={this.handledChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="professional ID" className="form-label">professional ID</label>
                                <input className="form-control" name="profesionalID" type="text"  placeholder="Enter Profesional ID" onChange={this.handledChange} />
                            </div>
                            <a className="btn btn-primary col-12 my-1" type="submit" onClick={()=> this.Registrar()}>Create Account</a>
                            <small className="form-text text-muted">
                                 By creating a account, you agree to the <a href="">Terms of Service.</a> 
                                 For more information about T-board's privacity terms, 
                                 see the <a href="">Privacy Statement.</a>
                             </small>
                        </form>
                     </div>
                </div>
            </div>
            <div className="mt-3">
                <Footer />
            </div>
        </div>
        )
    }
}