import React from 'react'
import Tab from './Tab'
import TreeMenu from 'react-simple-tree-menu';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react'
import axios from 'axios'
import BoardMenu from './BoardMenu'
import '../css/tree-nav.css'
import circuit from '../img/icon1.svg';
import tab from '../img/iconplus.svg';
import plus from '../img/plus.svg';
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
  const [circuits,setCircuits] = useState([]);
  const [idproject,setIdproject] = useState([]);
  const [name1,setName1] = useState([]); 
  const [name2,setName2] = useState();
  const [info,setInfo] = useState();
  const [name3,setName3] = useState();
  const [bandera,setBandera] = useState(true)
  useEffect( () => {
   /*  obtenerArrBoards() */
  
   obteneralgo()
   obtenerCircuits()
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
  const obtenerCircuits = async()=>{
    await authAxios.get('/circuit').then(res =>setCircuits(res.data)).catch(err=>console.log(err))
  }
  const crearCircuit = async(id1)=> {
    await authAxios.post('/circuit',{
      name: 'Circuit',
      board_padre: { 
        id: id1
      }
    }
    ).then(res=>console.log('circuito agreado')).catch(err=> console.log("error"))
  }
  const obtenerIdProyecto = async() => {
    const algo3 = []
    const algo2 = await authAxios.get('/project/'+idCircuits).then(res=> res.data.boards)
    console.log(algo2)
    algo2.forEach((item)=>algo3.push( {
      "key": item.id,
      "label": item.name,
      "data": item.name,
      "icon": "tab",
      "children":[]
    }

    ))
    /* circuits.forEach((item)=>algo3.push( {
      "key": item.board_padre.id,
      "label": item.name,
      "data": item.name,
      "icon": "tab",
      "children":[]
    }

    )) */
    console.log(algo3)
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
    await authAxios.get('/project/'+id).then(res =>{ setName2(res.data);console.log(name2)}).catch(err => console.log(err))
  }
  const obtenerBoard = async(id1) => {
    await authAxios.get('/board/'+id1).then(res => {setInfo(res.data);console.log(info)}).catch(err => console.log(err))
  }
  
  const recorre = (arr,id) => {
    let aux = [...boards]
    aux.forEach((item,i)=>{
      if(item.key == id){
        item.children.push({
          "key": parseInt(Math.random()*1000),
          "label": "nuevo",
          "data": "nuevos",
          "icon": "tab",
          "children": []
        })
        
      }else {
        item.children.forEach((item,i)=>{
          if(item.key == id){
            item.children.push({
              "key": parseInt(Math.random()*1000),
              "label": "nuevo",
              "data": "nuevos",
              "icon": "tab",
              "children": []
            })
            
          }else {
            item.children.forEach((item,i)=>{
              if(item.key == id){
                item.children.push({
                  "key": parseInt(Math.random()*1000),
                  "label": "nuevo",
                  "data": "nuevos",
                  "icon": "tab",
                  "children": []
                })
                
              }else {
                item.children.forEach((item,i)=>{
                  if(item.key == id){
                    item.children.push({
                      "key": parseInt(Math.random()*1000),
                      "label": "nuevo",
                      "data": "nuevos",
                      "icon": "tab",
                      "children": []
                    })
                    
                  }else {
                    item.children.forEach((item,i)=>{
                      if(item.key == id){
                        item.children.push({
                          "key": parseInt(Math.random()*1000),
                          "label": "nuevo",
                          "data": "nuevos",
                          "icon": "tab",
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
        <div  style={{height: '70px',padding: '20px 0 0 0px',margin:'0px 6px 0 0'}}>
          <span onClick={()=>console.log('ola')}>{node.label}</span>
          {/* <a className="ml4 " onClick={()=>{
          console.log(circuits)
          obtenerBoard(node.key)
        
          crearCircuit(node.key)
      }}><img class="ban1" src={subtab} /></a>   */}
          {/* <a className="agg" onClick={()=>{
          
              setBoards(recorre(boards,node.key))
              crearCircuit(node.key)
          }}><img class="ban1" src={plus} /></a>   */}
          <ul class="navbar-nav idioma nvT mr-md-1 fr">
        <li class="nav-item dropdown language-dropdown">
            <a class="" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <img class="ban" src={plus} />
            </a> 

          <div class="dropdown-menu dropdown-menu-left navbar-dropdown py-2" aria-labelledby="LanguageDropdown">
            <a class="dropdown-item" id="id_es" >
              <div class="flag-icon-holder">
                <img class="ban" src={circuit} />
                <span class="text-dark">{t("MenuTree.addAppliance")}</span>
              </div>
            </a>
            <a class="dropdown-item" id="id_en" >
              <div class="flag-icon-holder">
                <img class="ban" src={tab} />
                <span class="text-dark">{t("MenuTree.addBoard")}</span>
              </div>
            </a>
          </div>
        </li>
      </ul>
        </div>
          
      )
    }
}
  const arr1 = [];
  return (
  <div>
    <input className="ingris" type="text" onChange={ e => setName3(e.target.value)} value={name3} placeholder={t("MenuTree.tableN")}/>
    <button className="btn btn-primary mt-1 mb-2 text mb7" onClick={()=>{agregarBoard(name1);setName3("");console.log(name1)}}>{t("MenuTree.addT")}</button>
   {/*  <button onClick={()=>console.log(name2)}>nueva</button> */}
    <Tree value={[{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[{
        "key": 'frutas',
        "label": 'frutas',
        "data": 'frutas',
        "children":[{
          "key": 'frutas',
          "label": 'frutas',
          "data": 'frutas',
          "children":[{
            "key": 'frutas',
            "label": 'frutas',
            "data": 'frutas',
            "children":[{
              "key": 'frutas',
              "label": 'frutas',
              "data": 'frutas',
              "children":[{
                "key": 'frutas',
                "label": 'frutas',
                "data": 'frutas',
                "children":[{
                  "key": 'frutas',
                  "label": 'frutas',
                  "data": 'frutas',
                  "children":[]
                },]
              },]
            },]
          },]
        },]
      },]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[{
        "key": 'frutas',
        "label": 'frutas',
        "data": 'frutas',
        "children":[]
      },]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    },{
      "key": 'frutas',
      "label": 'frutas',
      "data": 'frutas',
      "children":[]
    }
    ]} nodeTemplate={nodeTemplate} className="mx-0"/>
  </div>
  )
}

export default MenuTree