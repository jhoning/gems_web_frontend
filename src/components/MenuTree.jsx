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

const MenuTree = ({idCircuits}) => {
  const id = idCircuits
  
  const [t] = useTranslation("global")

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

/*   const recorrerAnidados = (arr) => {
    arr.forEach((item,i) => {
      if(!(item.children.length === 0)){
        if(1){
          
        }
        recorrerAnidados(item.children);
      }
    })
  
  } */

  const obtenerIdProyecto = async() => {
    const algo3 = []
    const algo2 = await authAxios.get('/project/'+idCircuits).then(res=> res.data.boards)
    algo2.forEach((item)=>algo3.push( {
      "key": item.id,
      "label": item.name,
      "data": item.name,
      "icon": "pi pi-fw pi-inbox",
      "children":[]
    }

    ))
    console.log(algo2)
    setBoards(algo3)
    return algo3
  }
  const selectElementosNav = ()=>{
    const arr = document.querySelectorAll('div.p-treenode-content');
    const elemt = document.createElement("button");
    elemt.innerHTML = "+"
    arr.forEach((item,i) => {
      item.append(elemt)
    })
    console.log(arr)
    console.log(arr)
  }
  const crearProject = async(algo) => {
     console.log(boards)
  }
  /* const obtenerArrBoards = async() => {
    await authAxios.get(`/project/${id}`).then(res => console.log(se))
  } */
  const agregarBoard = async() => {
    await authAxios.post('/board',{name:name3,project:name2}).then(res => bandera?setBandera(false):setBandera(true)).catch(err =>console.log(err))
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
  
  const recorre = (arr,id) => {
    let aux = [...boards]
    aux.forEach((item,i)=>{
      if(item.key == id){
        item.children.push({
          "key": parseInt(Math.random()*1000),
          "label": "nuevo",
          "data": "nuevos",
          "icon": "pi pi-fw pi-inbox",
          "children": []
        })
        
      }else {
        item.children.forEach((item,i)=>{
          if(item.key == id){
            item.children.push({
              "key": parseInt(Math.random()*1000),
              "label": "nuevo",
              "data": "nuevos",
              "icon": "pi pi-fw pi-inbox",
              "children": []
            })
            
          }else {
            item.children.forEach((item,i)=>{
              if(item.key == id){
                item.children.push({
                  "key": parseInt(Math.random()*1000),
                  "label": "nuevo",
                  "data": "nuevos",
                  "icon": "pi pi-fw pi-inbox",
                  "children": []
                })
                
              }else {
                item.children.forEach((item,i)=>{
                  if(item.key == id){
                    item.children.push({
                      "key": parseInt(Math.random()*1000),
                      "label": "nuevo",
                      "data": "nuevos",
                      "icon": "pi pi-fw pi-inbox",
                      "children": []
                    })
                    
                  }else {
                    item.children.forEach((item,i)=>{
                      if(item.key == id){
                        item.children.push({
                          "key": parseInt(Math.random()*1000),
                          "label": "nuevo",
                          "data": "nuevos",
                          "icon": "pi pi-fw pi-inbox",
                          "children": []
                        })
                        
                      }else {
                        item.children.forEach()
                      }
                   
                     /*  if(item.children.length != 0){
                        recorre(item.children,id);
                      }else {
                        return 0
                      } */
                    })
                  }
               
                 /*  if(item.children.length != 0){
                    recorre(item.children,id);
                  }else {
                    return 0
                  } */
                })
              }
           
             /*  if(item.children.length != 0){
                recorre(item.children,id);
              }else {
                return 0
              } */
            })
          }
       
         /*  if(item.children.length != 0){
            recorre(item.children,id);
          }else {
            return 0
          } */
        })
      }
   
     /*  if(item.children.length != 0){
        recorre(item.children,id);
      }else {
        return 0
      } */
    })
    return aux
  }

  const nodeTemplate = (node) => {
    
    if (node.label) {
      return (
        <div>
          <a href={node.label}>{node.label}</a>
          <button className="btn btn-primary btn-sm ml-4" onClick={()=>{
          
              setBoards(recorre(boards,node.key))
              
          }}>+</button>  
        </div>
          
      )
    }
}
  const arr1 = [];
  return (
  <div>
    <input className="ingris" type="text" onChange={ e => setName3(e.target.value)} value={name3} placeholder={t("MenuTree.tableN")}/>
    <button className="btn btn-primary mt-1 mb-2 text" onClick={()=>{agregarBoard(name1);setName3("");console.log(name1)}}>{t("MenuTree.addT")}</button>
   {/*  <button onClick={()=>console.log(name2)}>nueva</button> */}
    <Tree value={boards} nodeTemplate={nodeTemplate} className="mx-0"/>
  </div>
  )
}

export default MenuTree