import React from 'react';
import { useTranslation } from 'react-i18next';
import {useState,useEffect} from 'react';
import axios from 'axios';
import "../css/t-board_estilos.css"
const T_board = () => {
  
  const [t] = useTranslation("global")
  const [name1,setName1] = useState([])
  const [nameProject,setNameProject] = useState()
  const [bandera,setBandera] = useState(false)
  const token = localStorage.getItem('token')
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })  
  useEffect( () => {
    
    getProjectByID()

   
  },[bandera])
  const getProjectByID = async() => {
    
    const algo = await authAxios.get(`/project`).then(resolve => setName1(resolve.data));
    console.log(name1)
  }
  const crearProject = async ()=> {
    await authAxios.post('/project',{name:nameProject}).then(resp => {alert("proyecto agregado con exito");setBandera(bandera?false:true);setNameProject("")}).catch(err => alert("ha ocurrido un error"))
  }
  return (
  <div className="container-fluid tbo">
    <div className=" mb-3">
        <div className="row" > 
            <nav className="col-2 col-md-2 col-sm-2 gris sidebar altoCompleto mx-0">
                <div className="sidebar-sticky sideBar text-center" >
                    <ul className="nav flex-column text-left">
                    
                    <li className="nav-item"><a href="" className="nav-link text-white">{t("HeaderT.projects")}</a></li>
                    <li className="nav-item"><a href="" className="nav-link text-white">{t("HeaderT.projectsM")}</a></li>
                    <li className="nav-item"><a href="" className="nav-link text-white">{t("HeaderT.projectsS")}</a></li>
                   
                    </ul>
                    <input type="text" name="text" placeholder="Indique el id proyecto" className="form-control" value={nameProject} onChange={ e => { setNameProject(e.target.value)} }/>
                     <button className="btn btn-primary mt-3 new" onClick={()=> crearProject()}>{t("HeaderT.projectsNews")}</button>
                </div>
            </nav>
            <div className="col-10 altoCompleto vt">
                <div className="jumbotron p-2 mb-0">
                    <div className="container mb-1">
                        <div className="row">
                          <div className="col-3"></div>
                            <div className="col-6">
                              <input className="form-control mr-sm-2" type="text" placeholder={t("HeaderT.search_projects")}></input>
                              </div>
                          <div className="col-3"></div>
                        </div>
                    </div>
                    <ul className="list-group mx-3">
                        {
                            name1.map((item)=>{
                                return   <li className="list-group-item d-flex justify-content-between align-items-center">
                              <a href="">{item.name}</a> 
                               <button className="btn btn-primary mx-0 text-right">edit</button>
                              
                            </li>
                            })
                        }
                    </ul> 
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}



export default T_board
