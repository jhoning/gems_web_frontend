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
    <div className="container-fluid tbo">
      <div className=" mb-3">
        <div className="row" >
          <nav className="col-3 col-md-2 col-sm-2 gris sidebar altoCompleto mx-0">
            <div className="sidebar-sticky sideBar board text-center" >
              <ul className="nav flex-column text-left">

                <li className="nav-item"><a href="" className="nav-link text-white">{t("HeaderT.projects")}</a></li>
                <li className="nav-item"><a href="" className="nav-link text-white">{t("HeaderT.projectsM")}</a></li>
                <li className="nav-item"><a href="" className="nav-link text-white">{t("HeaderT.projectsS")}</a></li>

              </ul>
              <input type="text" name="text" placeholder={t("HeaderT.idPass")} className="form-control" value={nameProject}  onKeyDown={(e) =>handleKeyDown(e)} onChange={e => { setNameProject(e.target.value) }}  />
              <button className="btn btn-primary mt-3" onClick={() => {crearProject();console.log(name1)}}>{t("HeaderT.projectsNews")}</button>
            </div>
          </nav>
          <div className="col-10 altoCompleto vt">
            <div className="jumbotron p-2 mb-0">
              <div className="container mb-1">
                <div className="row">
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
                    <a class="col-md-10" id={item.id+"a"}href={`http://localhost:3004/calculate/${item.id}`}>{item.name}</a> 
                    <input type="text" class="edit" style={{ display: "none",height: "35px" }} id={item.id+"i"} onChange={e => { setAux1({ ...aux1, name: e.target.value });console.log(aux1)}} onKeyDown={(e) =>handleKeyDown1(e,item.id)}/>
                      <div class="col-md-1 controls">
             
                      <a>
                        <i class="fa fa-edit" onClick={()=>{ 
                        if ($(`#${item.id}a`).is(':visible')) {
                          $(`#${item.id}a`).hide();
                          $(`#${item.id}i`).show();
                        } else {
                          $(`#${item.id}a`).show();
                          $(`#${item.id}i`).hide();
                        }
                      }
                      }></i>
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