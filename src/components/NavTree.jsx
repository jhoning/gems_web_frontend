import React from 'react'
import Tab from './Tab'
import TreeMenu from 'react-simple-tree-menu';
import { useTranslation } from 'react-i18next';
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

const NavTree = ({idCircuits})=> {

  const [arrBoards,SetArrBoards] = useState()
  const [arrBoardsInfo,SetArrBoardsInfo] = useState([])
  const [arrBoardsPrincipales,SetArrBoardsPrincipales] = useState([])
  const [bandera, setBandera] = useState(false)
  const [mount, setMount] = useState(false)
  
  useEffect(() => {
   
      infoProject();
      finalNavtree();
  
      console.log(arrBoardsPrincipales)
     
      
     setTimeout(()=>{
       console.log(arrBoardsInfo)
       setMount(true);
   /*     console.log('hola olis') */
     },1000)
  
   
    
  
   
  },[mount])

  const infoProject = async() => {
    let arr = await authAxios.get('/project/'+idCircuits);
    SetArrBoards(arr.data)
    let aux = []
    for (let i = 0;i<arr.data.boards.length;i++) {
      const contents = await authAxios.get('/board/'+ arr.data.boards[i].id)
      aux.push(contents.data)
    }
    SetArrBoardsInfo(aux)
  }
  
  const generarNavTree = (item)=>{
    let aux;
    let hijos = []
  
      if(item.board_hijos == undefined) {
        aux = {
          "key": item.id,
          "label": item.name,
          "data": item.name,
          "icon": "pi pi-fw pi-inbox",
          "children":[],
      
        }
      }else{
        for (let i = 0;i<item.board_hijos.length;i++) {
          hijos.push(generarNavTree(item.board_hijos[i]))
        }
       /*  for (let i = 0;i<item.board_hijos.length;i++) {
          for (let j = 0;j<hijos.length;j++) {
            if(item.board_padre == hijos[j].id){
              hijos[j].children.push(generarNavTree(item.board_hijos[i]))
            }
          }
        } */

        aux = {
          "key": item.id,
          "label": item.name,
          "data": item.name,
          "icon": "pi pi-fw pi-inbox",
          "children":hijos,
         
        }
      }
    return aux
  
  }
  /*esto es provicional  */
 
  
  /*  */
  const addTree = (value, id1,id2)=>{
     let aux = value
    /*  console.log(value)
     console.log(id1.id) */
  
     for (let index = 0; index < aux.length; index++) {
     if(value[index].key == id1.id){
     
        aux[index].children.push({
          "key": id2,
          "label": id2,
          "data": id2,
          "icon": "pi pi-fw pi-inbox",
          "children":[],
      
        })
        return aux
     }else {
      
          return addTree(aux[index].children,id1,id2)
        
     }
      
    } 
  }
  const finalNavtree = ()=>{
    let aux = []
    let aux2 = []
    let cont = 0
    for (let i = 0;i<arrBoardsInfo.length;i++) {
      if(arrBoardsInfo[i].board_padre == null){
       aux.push({
        "key": arrBoardsInfo[i].id,
        "label": arrBoardsInfo[i].name,
        "data": arrBoardsInfo[i].name,
        "icon": "pi pi-fw pi-inbox",
        "children":[],
       })
      }
      
    }
    
 
    for (let i = 0;i<arrBoardsInfo.length;i++) {
   /*     console.log(aux) */
      if(arrBoardsInfo[i].board_padre != null){
      
      addTree(aux,arrBoardsInfo[i].board_padre,arrBoardsInfo[i].id)

      }
    }  
    
    
    
    console.log(aux)
    SetArrBoardsPrincipales(aux)
    
  }
  
 /*  const generarHijos = async() => {
    let aux = [...arrBoardsPrincipales]
    for (let i = 0;i<arrBoardsInfo.length;i++) {
      if(arrBoardsInfo[i].board_padre != null) {
        for
      }
    }
  } */
  const registrarBoard1 = async(name1,id)=>{
    await authAxios.post('/board',{name: "Nuevo*",project: arrBoards,}).then(res =>console.log(res)).catch(err => console.log(err))
  }
  const registrarBoard = async(name1,id)=>{
    await authAxios.post('/board',{name: "Nuev",project: arrBoards,board_padre: {id:name1,name:id}}).then(res =>console.log(res)).catch(err => console.log(err))
  }
  const nodeTemplate = (node) => {
    
    if (node.label) {
      return (
        <div >
          <span onClick={()=>console.log('ola')}>{node.label}</span>
          <button className="btn btn-primary btn-sm ml-4 " onClick={()=>{
              registrarBoard(node.key,node.label)
              setMount(false)
            
          }}>+</button>   
         
        </div>
          
      )
    }
}
  return(
    <>
      <button className='btn btn-primary' onClick={()=>{
        registrarBoard1()
        setMount(false)

      }}>Agregar Board</button>
      <Tree value={arrBoardsPrincipales} nodeTemplate={nodeTemplate} className="mx-0" />
    </>
  )
}

export default NavTree