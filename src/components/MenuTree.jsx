import React from 'react'
import Tab from './Tab'
import TreeMenu from 'react-simple-tree-menu';
import { useState, useEffect } from 'react'
import axios from 'axios'
import BoardMenu from './BoardMenu'
import '../css/tree-nav.css'
import '../../node_modules/react-simple-tree-menu/dist/main.css';
import { Tree } from 'primereact/tree';

const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})  

const MenuTree = ({idCircuits}) => {
  const id = idCircuits
  
  const [boards,setBoards] = useState([]);
  const [idproject,setIdproject] = useState([]);
  const [name1,setName1] = useState([]); 
  const [name2,setName2] = useState();
  const [name3,setName3] = useState();
  const [bandera,setBandera] = useState(true)
  useEffect( () => {
   /*  obtenerArrBoards() */
   obteneralgo()
  obtenerIdProyecto()
    
  } 

  ,[bandera])

  const obtenerIdProyecto = async() => {
    const algo3 = []
    const algo2 = await authAxios.get('/project/'+idCircuits).then(res=> res.data.boards)
    algo2.forEach((item)=>algo3.push( {
      "key": item.id,
      "label": item.name,
      "data": item.name,
      "icon": "pi pi-fw pi-inbox",
      "children": []
    }

    ))
    console.log(algo3)
    setBoards(algo3)
    return algo3
   
 
  }
  const crearProject = async(algo) => {
     console.log(boards)
  }
  /* const obtenerArrBoards = async() => {
    await authAxios.get(`/project/${id}`).then(res => console.log(se))
  } */
  const agregarBoard = async() => {
    await authAxios.post('/board',{name:name3,project:name2}).then(res => alert("board agregada!")).catch(err =>console.log(err))
  }

  const obtenerArrBoardsall = async() => {
    await authAxios.get(`/board`).then(res => console.log(res))
  }
  
  const mapear = () => {
    idproject.forEach((item, i) => setBoards([...boards,1]))
  }
  const obteneralgo = async() => {
    await authAxios.get('/project/'+id).then(res => setName2(res.data)).catch(err => console.log(err))
  }
  const arr1 = [];
  return (
  <div>
    <input className="ingris" type="text" onChange={ e => setName3(e.target.value)} value={name3} placeholder="introducir nombre"/>
    <button className="btn btn-primary" onClick={()=>{agregarBoard(name1);setName3("");bandera?setBandera(false):setBandera(true);console.log(name1)}}>Agregar board</button>
   {/*  <button onClick={()=>console.log(name2)}>nueva</button> */}
    <Tree value={boards} />
  </div>
  )
}

export default MenuTree
