import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';
import "../css/t-board_estilos.css"
const T_board = () => {
  const [inputActivo, setInputActivo] = useState(false)
  const [aux,setAux] = useState({name3: ""})
  const handleClickInput = async () => {
    setInputActivo(true);
  }

  const [t] = useTranslation("global")
  const [name1, setName1] = useState([])
  const [nameProject, setNameProject] = useState()
  const [bandera, setBandera] = useState(false)
  const [bandera3, setBandera3] = useState(true)
  const [bandera1, setBandera1] = useState(true)
  const token = localStorage.getItem('token')
  const [aux1,setAux1] = useState()
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })
  useEffect(() => {
   
    getProjectByID()
   
  }, [bandera,bandera1,bandera3])
  
  const getProjectByID = async () => {

    const algo = await authAxios.get(`/project`).then(resolve => setName1(resolve.data)).catch(err => setName1(null));
    console.log(name1)
  }
  const crearProject = async () => {
    await authAxios.post('/project', { name: nameProject }).then(resp => { setBandera(bandera ? false : true); setNameProject("") }).catch(err => alert(`${t("Alerts.error")}`))
  }

  const cambiarNombre = async(id,value)=>{
    await authAxios.patch('/project/'+id,value).then(res => {alert("nombre cambiado"); setBandera(bandera? false:true)})
   
  } 
  
  const delete1 = async(id)=>{
    console.log(id)
     await authAxios.delete('/project/'+id).then(res =>  {alert(`${t("Alerts.delete")}`);setBandera1(bandera1? false:true); console.log(name1)});

    }
  const cambiarName = async(id)=>{
    await authAxios.patch('/project/'+id, aux1).then(res =>console.log(res))

  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      crearProject()
      console.log('do validate')
    }
  }

  const handleKeyDown1 = (event,id) => {
    console.log(id)
    if (event.key === 'Enter') {
      cambiarName(id)
     
    }
  }

  return (
    <div className="container-fluid tbo wey">
      <div className=" mb-3">
        <div className="row" >
        <nav class="sidebar sidebar-offcanvas w2" id="sidebar">
           <ul class="nav">
             <li class="nav-item profile">
               <div class="profile-desc">
                 <div class="profile-pic">
                   <div class="count-indicator">
                     <span class="count bg-success"></span>
                     </div>
                       </div>
                           </div>
                           </li>
                             
                                 <li class="nav-item menu-items">
                                   <div class="nav-link" data-toggle="collapse">
                                     <span class="menu-icon">
                                       <i class="mdi mdi-laptop"></i>
                                       </span>
                                       <span class="menu-title">{t("HeaderT.projects")}</span>
                                       <i class="menu-arrow"></i>
                                       </div>
                                       </li>
                                       <li class="nav-item menu-items">
                                         <div class="nav-link" data-toggle="collapse">
                                           <span class="menu-icon"><i class="mdi mdi-playlist-play"></i></span>
                                           <span class="menu-title">{t("HeaderT.projectsM")}</span>
                                           <i class="menu-arrow"></i>
                                           </div>
                                          </li>
                                          <li class="nav-item menu-items">
                                            <div class="nav-link" data-toggle="collapse">
                                              <span class="menu-icon"><i class="mdi mdi-table-large"></i></span>
                                              <span class="menu-title">{t("HeaderT.projectsS")}</span>
                                              <i class="menu-arrow"></i></div>
                                          </li></ul>
                                          <div className="nav-link">
                <input type="text" name="text" placeholder={t("HeaderT.idPass")} className="form-control new" value={nameProject}  onKeyDown={(e) =>handleKeyDown(e)} onChange={e => { setNameProject(e.target.value) }}  />
              </div>
              <button className="btn btn-primary mt-2 mr9" onClick={() => {crearProject();console.log(name1)}}>{t("HeaderT.projectsNews")}</button>
                                          </nav>
                                            <div className="w9 altoCompleto vt">
                                              <div className="jumbotron p-2 mb-0">
                                                <div className="container mb-1">
                                                  <div className="row mb-2">
                                                    <div className="col-3"></div>
                                                    <div className="col-6">
                                                      <input className="form-control wh" type="text" placeholder={t("HeaderT.search_projects")}></input>
                                                    </div>
                                                    <div className="col-3"></div>
                                                  </div>
                                                </div>
                                                <ul className="list-group mx-3 cpan">
                                                  {
                                                  
                                                    name1 == null? null : name1.map((item,i) => {
                                                    
                                                      return <li className="list-group-item d-flex justify-content-between align-items-center"> 
                                                      <a class="col-md-10" id={item.id+"a"}href={`http://localhost:3004/calculate/${item.id}/${item.name}`}>{item.name}</a> 
                                                      <input type="text" class="edit" style={{ display: "none",height: "35px" }} id={item.id+"i"} onChange={e => { setAux1({ ...aux1, name: e.target.value });console.log(aux1)}} onKeyDown={(e) =>handleKeyDown1(e,item.id)}/>
                                                        <div class="col-md-1 controls">
                                              
                                                        <a href={`http://localhost:3004/calculate/${item.id}/${item.name}`}>
                                                          <i class="fa fa-edit" 
                                                        ></i>
                                                        </a>
                                                      
                                                        <a>
                                                          <i class="fa fa-trash" onClick={() => delete1(item.id)}></i>
                                                        </a>

                                                          {/* <button className="btn btn-primary mx-0 text-right mr-2 ml-3" onClick={() => {document.getElementById(item.id).disabled? document.getElementById(item.id).disabled = false:document.getElementById(item.id).disabled = true;document.getElementById(item.id).focus()}}   >edit</button>
                                                          <button className="btn btn-danger mx-0 text-right" onClick={() => {delete1(item.id)}}>delete</button> */}
                                                        </div>
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