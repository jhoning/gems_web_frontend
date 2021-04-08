import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react'
import { Tree } from 'primereact/tree';
import '../css/tree-nav.css'
import '../../node_modules/react-simple-tree-menu/dist/main.css';


const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})

const NavTree = ({ idCircuits }) => {
  
  const [t] = useTranslation("global");
  const [boards, setBoards] = useState([]);
  const [boardsTree, setBoardsTree] = useState([]);
  const [bandera,setBandera] = useState(true);
  const [name2,setName2] = useState();
  const [name3,setName3] = useState();
  
  useEffect( () => {
   /*  obtenerArrBoards() */
   obteneralgo()
   obtenerIdProyecto();
    
    
  }, [bandera])
  

  const obtenerIdProyecto = async() => {
    const algo3 = []
    const algo2 = await authAxios.get('/project/'+idCircuits).then(res=> res.data.boards)
    setBoards(algo2)
    algo2.forEach((item)=>algo3.push({
      "key": item.id,
      "label": item.name,
      "data": item.name,
      "icon": "pi pi-fw pi-inbox",
      "children": [{"key": item.id,
      "label": item.name,
      "data": item.name,
      "icon": "pi pi-fw pi-inbox",
      "children": []}]
    }))
    console.log(algo2)
    setBoardsTree(algo3)
    return algo3
  }
  const obteneralgo = async() => {
    await authAxios.get('/project/'+idCircuits).then(res => setName2(res.data)).catch(err => console.log(err))
  }
  const agregarBoard = async() => {
    await authAxios.post('/board',{name:name3,project:name2,board_padre:{} }).then(res => bandera?setBandera(false):setBandera(true)).catch(err =>console.log(err))
  }
  const nodeTemplate = (node) => {
    if (node.label) {
      return (
        <div>
          <a href={node.label}>{node.label}</a>
          <button className="btn btn-primary btn-sm ml-4" onClick={()=>{
            
       
              agregarBoard("nuebva")
           
          }}>+</button>
        </div>
          
      )
    }
  }
  return (
    <div>
      <input className="ingris" type="text" onChange={ e => setName3(e.target.value)} value={name3} placeholder={t("MenuTree.tableN")}/>
      <button className="btn btn-primary mt-1 mb-2 text" onClick={()=>{agregarBoard(boards);setName3("");}}>{t("MenuTree.addT")}</button>
     {/*  <button onClick={()=>console.log(name2)}>nueva</button> */}
      <Tree value={boardsTree} nodeTemplate={nodeTemplate} className="mx-0"/>
    </div>
    )
}

export default NavTree