import React, { Component } from 'react'
import Header_tboard from '../components/Header_tboard';
import Footer from '../components/Footer'
import '../css/userSettings.css'
import axios,{path} from 'axios';
export default class UserSettings extends Component {
    
    state = {
        data:{

        },
        token:"",
        translate:{
            userS: "User Settings",
            companyI: "Company information",
            emailA: "Email address",
            company: "Company",
            updateU: "Update user settings",
            firstN: "First name",
            lastN: "Last name",
            address: "Address",
            professionalID: "Professional ID",
            country: "Country",
            phone: "Phone",
            changeE: "Change Email",
            changeP: "Change Password",
            update: "Update",
            Terms: "Terms",
            Privacy: "Privacy",
            Blog: "Blog",
            ContactUs: "ContactUs"
        }
    }
  
    
    componentDidMount() {
        const token = localStorage.getItem('token').split('.')[1];
        
        const tokenData = JSON.parse(
                              Buffer.from(token,'base64')
                              .toString()
        )
        const tokenID = tokenData.id
            
            axios.get(`http://localhost:4000/user/${tokenID}`).then(resolve =>{
            this.setState({data:{username:resolve.data.username,email:resolve.data.email,first_name:resolve.data.first_name,last_name:resolve.data.last_name,phone:resolve.data.phone,address:resolve.data.address,profesionalID:resolve.data.profesionalID,country:resolve.data.country},token:tokenID,});
            console.log(resolve);
            console.log(this.state);
         })
        
      
    }
    
    handledChange = async e => {
        await this.setState({
            data:{
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })

        console.log(this.state.data)
    }
    update = async() => {
        /* http://localhost:3000/user */
       
         console.log(this.state.transtale)
       await axios.patch(`http://localhost:4000/user/${this.state.token}`, {username:this.state.data.username,email:this.state.data.email,first_name:this.state.data.first_name,last_name:this.state.data.last_name,phone:this.state.data.phone,address:this.state.data.address,profesionalID:this.state.data.profesionalID,country:this.state.data.country},{Authorization: `Bearer ${localStorage.getItem('token')}`})
       .then(alert("Sus datos fueron actualizados exitosamente")).catch(console.log("error"))  
       
       console.log(this.state.data);
    }
    handledHeaderT = (e) => {
        const traduc = {...e}   
        this.setState({translate:{...e}})
     
     console.log(traduc)
    }
    render() {
        
        return (
        <div>
            <Header_tboard handledHeaderT={this.handledHeaderT} />
            <div className="container">
                <div className="col-12 altoCompleto">
                    <div className="jumbotron p-2 mb-0 bg-light">
                        <div className="col-12 bordeColor text-left px-0">
                            <h3 className="mb-4 mx-0">{this.state.translate.userS}</h3>
                        </div>
                        <h5 className="mb-4 mt-3">{this.state.translate.companyI}</h5>
                        <div className="row mx-3 mt-4">
                            <div className="col-6">
                                <legend className="bordeColor">{this.state.translate.emailA}</legend>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control-plaintext" defaultValue={this.state.data.email}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <legend className="bordeColor">{this.state.translate.company}</legend>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control-plaintext" defaultValue="Personal"/>
                                </div>
                            </div>
                        </div>
                        <h5 className="mb-4 mt-3">{this.state.translate.updateU}</h5>
                        <div className="row mx-3">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="FirstName">{this.state.translate.firstN}</label>
                                    <input type="text" name="first_name" className="form-control"  placeholder={this.state.data.first_name} onChange={this.handledChange}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="LastName">{this.state.translate.lastN}</label>
                                    <input type="text" name="last_name" className="form-control" placeholder={this.state.data.last_name} onChange={this.handledChange}/>
                                 </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="Address">{this.state.translate.address}</label>
                                    <input type="text" name="address" className="form-control" placeholder={this.state.data.address} onChange={this.handledChange}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="professional">{this.state.translate.professionalID}</label>
                                    <input type="text" name="profesionalID" className="form-control" placeholder={this.state.data.ProfessionalID} onChange={this.handledChange} />
                                 </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="Country">{this.state.translate.country}</label>
                                    <input type="text" name="country" className="form-control" placeholder={this.state.data.country} onChange={this.handledChange}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="Phone">{this.state.translate.phone}</label>
                                    <input type="text" name="phone" className="form-control" placeholder={this.state.data.phone} onChange={this.handledChange}/>
                                 </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="NewEmail">{this.state.translate.changeE}</label>
                                    <input type="email" name="email" className="form-control" placeholder="" onChange={this.handledChange}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="ChangePassword">{this.state.translate.changeP}</label>
                                    <input type="password" className="form-control" placeholder=""/>
                                </div>
                            </div>
                            <div className="col-4"></div>
                            <div className="col-4"><a className="btn btn-primary btn-block" onClick={()=> this.update()}>{this.state.translate.update}</a></div>
                            <div className="col-4"></div>
                         </div>
                    </div>
                </div>
            </div>
            <Footer   
            Terms={this.state.translate.Terms}
            Privacy= {this.state.translate.Privacy}
            Blog= {this.state.translate.Blog}
            ContactUs= {this.state.translate.ContactUs}  />
        </div>    
        )
    }
}
