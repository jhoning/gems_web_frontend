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
  const [bandera1, setBandera1] = useState(false)
  const token = localStorage.getItem('token')
  const authAxios = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${token}`
    }
  })
  useEffect(() => {

    getProjectByID()


  }, [bandera,bandera1])
  const getProjectByID = async () => {

    const algo = await authAxios.get(`/project`).then(resolve => setName1(resolve.data));
    console.log(name1)
  }
  const crearProject = async () => {
    await authAxios.post('/project', { name: nameProject }).then(resp => { alert("proyecto agregado con exito"); setBandera(bandera ? false : true); setNameProject("") }).catch(err => alert("ha ocurrido un error"))
  }

  const cambiarNombre = async(id,value)=>{
    await authAxios.patch('/project/'+id,value).then(res => {alert("nombre cambiado"); setBandera(bandera? false:true)})
   
  }
  
  const delete1 = async(id)=>{
    console.log(id)
     await authAxios.delete('/project/'+id).then(res =>  {alert("eliminado");setBandera(bandera? false:true)});
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
              <input type="text" name="text" placeholder={t("HeaderT.idPass")} className="form-control" value={nameProject} onChange={e => { setNameProject(e.target.value) }}  />
              <button className="btn btn-primary mt-3" onClick={() => crearProject()}>{t("HeaderT.projectsNews")}</button>
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
                  name1.map((item) => {
                    return <li className="list-group-item d-flex justify-content-between align-items-center">
                      <a class="col-md-10" href={`http://localhost:3004/calculate/${item.id}`}>{item.name}</a> 
                      <form id="project">
                        <input type="text" id={item.id} disabled="false" value={item.name} onChange={ e => item.name = e.target.value } onBlur={()=> cambiarNombre(item.id,document.getElementById(item.id).value)}/>
                      </form>


                      <div class="col-md-3">
                        <button className="btn btn-primary mx-0 text-right mr-2 ml-3" onClick={() => {document.getElementById(item.id).disabled? document.getElementById(item.id).disabled = false:document.getElementById(item.id).disabled = true;document.getElementById(item.id).focus()}}   >edit</button>
                        <button className="btn btn-danger mx-0 text-right" onClick={() => {delete1(item.id)}}>delete</button>
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