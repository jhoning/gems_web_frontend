import React from 'react'
import TreeMenu from 'react-simple-tree-menu';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react'
import axios from 'axios'
import BoardMenu from './BoardMenu'
import circuit from '../img/icon1.svg';
import tab from '../img/iconplus.svg';
import plus from '../img/plus.svg';
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

const NavTree = ({ idCircuits,setArr,setConsultaBoard,setCircuitActual,circuitActual,setEstadoInputs,setNumeroDeCircuits }) => {
  const [t] = useTranslation("global")
  const [arrBoards, SetArrBoards] = useState()
  const [arrBoardsInfo, SetArrBoardsInfo] = useState([])
  const [arrBoardsPrincipales, SetArrBoardsPrincipales] = useState([])
  const [bandera, setBandera] = useState(false)
  const [mount, setMount] = useState(false)
 
  useEffect(() => {

    infoProject();
    finalNavtree();

    console.log(arrBoardsPrincipales)
    console.log(circuitActual)

    setTimeout(() => {
      console.log(arrBoardsInfo)
      setMount(true);
      /*     console.log('hola olis') */
    }, 2000)
  }, [mount])

  const consultarCircuit = async(id1)=> {
    await authAxios.get('/circuit/'+ id1).then(res=>{setEstadoInputs(res.data.report);console.log(res.data.report)})
  }
  const obtenerReportes = async(id1) => {
    await authAxios.get(`/board/${id1}`).then((resp)=>setConsultaBoard(resp.data)).catch(err => console.log(err));
  }  

  const consultarBoard = async(id1)=>{
    await authAxios.get(`/board/${id1}`).then((resp)=>{setNumeroDeCircuits(resp.data.circuits)}).catch(err => console.log(err));
  }


  const addBoard = async(id1)=>{
    await authAxios.post('/board',{name:'nuevo_',project:arrBoards,board_padre:{id:id1}}).then(res=>console.log(res)).catch(err=>console.log(err))
  }
  const infoProject = async () => {
    let arr = await authAxios.get('/project/' + idCircuits);
    SetArrBoards(arr.data)
    let aux = []
    for (let i = 0; i < arr.data.boards.length; i++) {
      const contents = await authAxios.get('/board/' + arr.data.boards[i].id)
      aux.push(contents.data)
    }
    SetArrBoardsInfo(aux)
  }
  const addCircuit = async(id1) => {
    await authAxios.post('/circuit',{name:'circuit',board_padre:{id:id1}})
  }
  const generarNavTree = (item) => {
    let aux;
    let hijos = []

    if (item.board_hijos == undefined) {
      aux = {
        "key": item.id,
        "label": item.name,
        "data": item.name,
        "icon": "pi pi-fw pi-inbox",
        "children": [],

      }
    } else {
      for (let i = 0; i < item.board_hijos.length; i++) {
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
        "children": hijos,

      }
    }
    return aux

  }
  /*esto es provicional  */


  /*  */
  const addTree = (value, id1, id2) => {
    let aux = value
    /*  console.log(value)
     console.log(id1.id) */

    for (let index = 0; index < aux.length; index++) {
      if (value[index].key == id1.id) {

        aux[index].children.push({
          "key": id2,
          "label": id2,
          "data": id2,
          "icon": "pi pi-fw pi-inbox",
          "children": [],

        })
        return aux
      } else {

        return addTree(aux[index].children, id1, id2)

      }

    }
  }
  const finalNavtree = () => {
    let aux = []

    for (let i = 0; i < arrBoardsInfo.length; i++) {
      if (arrBoardsInfo[i].board_padre == null) {
        aux.push({
          "key": arrBoardsInfo[i].id,
          "label": arrBoardsInfo[i].name,
          "data": arrBoardsInfo[i].name,
          "icon": "pi pi-fw pi-sliders-h",
          "children": [],
        })
        console.log(arrBoardsInfo[i])
        if(arrBoardsInfo[i].circuits != []){
          for (let index = 0; index < arrBoardsInfo[i].circuits.length; index++) {
            aux[i].children.push({
              "key": arrBoardsInfo[i].circuits[index].id,
              "label": 'Circuit '+arrBoardsInfo[i].circuits[index].id,
              "data": arrBoardsInfo[i].circuits[index].name,
              "icon": "pi pi-fw pi-cog",
              "children": [],
            })

          }
        
        }
      }

    }


    for (let i = 0; i < arrBoardsInfo.length; i++) {
      /*     console.log(aux) */
      if (arrBoardsInfo[i].board_padre != null) {

        addTree(aux, arrBoardsInfo[i].board_padre, arrBoardsInfo[i].id)

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
  const registrarBoard1 = async (name1, id) => {
    await authAxios.post('/board', { name: "Nuevo*", project: arrBoards, }).then(res => console.log(res)).catch(err => console.log(err))
  }
  const registrarBoard = async (name1, id) => {
    await authAxios.post('/board', { name: "Nuev", project: arrBoards, board_padre: { id: name1, name: id } }).then(res => console.log(res)).catch(err => console.log(err))
  }
  const nodeTemplate = (node) => {

    if (node.label) {
      return (
        <div style={{ height: '70px', padding: '20px 0 0 0px', margin: '0px 6px 0 0' }}>
     
           <span onClick={() => {
             obtenerReportes(node.key);if(node.icon == 'pi pi-fw pi-sliders-h'){consultarBoard(node.key)};setCircuitActual(node.key);console.log(circuitActual);consultarCircuit(node.key)}

             }>{node.label}</span>
        
        
          {/* <a className="ml4 " onClick={()=>{
        console.log(circuits)
        obtenerBoard(node.key)
      
        crearCircuit(node.key)
    }}><img class="ban1" src={subtab} /></a>   */}
          {/* <a className="agg" onClick={()=>{
        
            setBoards(recorre(boards,node.key))
            crearCircuit(node.key)
        }}><img class="ban1" src={plus} /></a>   */}
          <ul class="navbar-nav idioma mr-md-1 fr">
            <li class="nav-item dropdown language-dropdown">
              <a class="" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <img class="ban" src={plus} />
              </a>

              <div class="dropdown-menu dropdown-menu-left navbar-dropdown py-2" aria-labelledby="LanguageDropdown">
                <a class="dropdown-item" id="id_es" >
                  <div class="flag-icon-holder">
                    <img class="ban" src={circuit} />
                    <span class="text-dark" onClick={()=>{
                   
                      obtenerReportes(node.key)
                      addCircuit(node.key)
                      setMount(false)   
                    }}>{t("MenuTree.addAppliance")}
                    </span>
                  </div>
                </a>
                <a class="dropdown-item" id="id_en" >
                  <div class="flag-icon-holder">
                    <img class="ban" src={tab} />
                    <span class="text-dark" onClick={()=>{
                    obtenerReportes(node.key)
                    addBoard(node.key)
                    setMount(false)   
                    }}>{t("MenuTree.addBoard")}</span>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>

      )
    }
  }
  return (
    <>
      <button onClick={()=>console.log(circuitActual)}>ver circuit actual</button>
      <button className='btn btn-primary' onClick={() => {
        registrarBoard1()
        setMount(false)

      }}>{t("MenuTree.addBoard")}</button>
      <Tree value={arrBoardsPrincipales} selectionKeys={circuitActual} onSelectionChange={e => setCircuitActual(e.value)} nodeTemplate={nodeTemplate} className="mx-0" />
    </>
  )
}

export default NavTree