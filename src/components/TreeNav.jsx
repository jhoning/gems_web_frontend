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
const Swal = require('sweetalert2')

const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})

const TreeNav = ({setMreport2,mreport,mreport2,setMreport,setMreport1,id,setReportActual,nameProject,setNameProject,mount1,setMount1,setCircuitName,setNameTablero,setCircuitActual1,circuitActual1, idCircuits,setCircuitActual,circuitActual,setNumeroDeCircuits,setConsultaBoard,setEstadoInputs }) => {
  const [t] = useTranslation("global")
  const [proyectoData, setProyectoData] = useState()
  const [mount, setMount] = useState(false)
  const [arr, setArr] = useState()
  const [tablerosP,setTablerosP] = useState([]);
  
  useEffect(() => {
    obtenerTableros()
    setTimeout(() => {
      setMount(true);
    }, 500)
  }, [mount,mount1,mreport2])
  const alert1 = () => {
    Swal.fire({
      title: `${t("Alerts.mCal")}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${t("Option.accept")}`,
      cancelButtonText: `${t("Option.cancel")}`
    }).then( res => {
      if(res.isConfirmed){
        setMreport1(true)
        setMreport(false)
        setMreport2( res=>!res)
      }else{
        setMreport1(false)
        setMreport(true)
        setMreport2( res=>res)
      }
    }).catch(err =>  setMreport(false))
  } 
  const consultarCircuit = async(id1)=> {
    await authAxios.get('/circuit/'+ id1).then(res=>{res.data.report != null?setEstadoInputs(res.data.report):setEstadoInputs({
      loadType:0,
      power: 0,
      distance: "0",
      powerFactor: 0,
      voltageDrop: "0",
      aisolation:"0",
      temperature:0,
      loadPhases:"0",
      perPhase:"1",
      feeder_include_neutral_wire:"true",
      pipe_material:0,
      system_voltage:"0",
      voltaje_drop:0,
      current:0,
      cable_width:0,
      pipe_diameter:0,
      protection_device:0,
      grounding_conductor:0,});setCircuitName(res.data.name);setReportActual(res.data.report.id);setMount1(mount1?false:true)}).then(res => setReportActual(res.data.report.id)).catch(err => err)
  }
  const obtenerTableros = async () => {
    let arr = await authAxios.get('/project/' + idCircuits);
    setProyectoData(arr.data)
    let aux = []
    for (let i = 0; i < arr.data.boards.length; i++) {
      const contents = await authAxios.get('/board/' + arr.data.boards[i].id)
      aux.push(contents.data)
    }
    setTablerosP(aux)
    console.log('mensaje: ', aux)
    generarNavTree(aux)

    console.log('proyecto data:', proyectoData)

  }
  const cambiarNombreProject = async()=> {
    await authAxios.patch('/project/'+id,{name:nameProject}).then(res => alert('Nombre de proyecto cambiado de forma exitosa!'))
  }
  const registrarBoard1 = async (name1, id) => {
    await authAxios.post('/board', { name: "Nuevo*", project: proyectoData, }).then(res => console.log(res)).catch(err => console.log(err))
  }
  const addBoard = async (id1) => {
    await authAxios.post('/board', { name: 'nuevo_', project: proyectoData, board_padre: { id: id1 } }).then(res => console.log(res)).catch(err => console.log(err))
  }
  const addCircuit = async(id1) => {
    await authAxios.post('/circuit',{name:'circuit',board_padre:{id:id1}})
  }
  const generarNavTree = (aux) => {
    /*estas variables aux se encargar de separar los tableros cuyos padres son null (tableros principales) 
    y los que si poseen un id */
    console.log('ayudaaaaa',aux)
    let aux_padre_null
    let aux_padre_id

    //aqui guardo todos los tablero de padre null (tableros principales) con su estructura del navtree ya en el arreglo
    aux_padre_null = aux.filter(item => item.board_padre == null).map(item => {
      const circuitos = item.circuits.map(item => {
        return {
          "key": item.id,
          "label": item.name,
          "data": item.name,
          "icon": "circuit",
          "children": [],
        }
      })
      return {
        /* estructura de cada tablero en el navtree (libreria) */
        "key": item.id,
        "label": item.name,
        "data": item.name,
        "icon": "tab",
        "children": [...circuitos],
      }
    })

    console.log('Tableros padre: ', aux_padre_null);
    aux_padre_id = aux.filter(item => item.board_padre != null)
    /*tomando encuenta que su key viene siendo la id del tablero que usaremos 
    mas adelante para comparar con el id padre y hacer las inserciones comparado su key(id) 
    con su board_padre del otro elemnto*/

    /* ahora debemos recorrer los tableros hijos para ir insertandolos 
    del navtree ya antes generada(solo con tablero null)*/
    console.log('Tableros hijos: ', aux_padre_id);
    const start = (node, id, id_hijo,aux,name) => {
     /*  console.log('arreglo de circuitos por tablero: ',aux)
      console.log(id, id_hijo) */
      let bandera = true
      if (node.key == id) {
     
       let circuitos =[]
        if(aux){
          bandera = false
          console.log('true',aux)
          circuitos = aux.map(item => {
            return {
              "key": item.id,
              "label": item.name,
              "data": item.name,
              "icon": "circuit",
              "children": [],
            }
          })

         /*   circuitos = aux.map(item => {
            return {
              "key": item.id,
              "label": 'circuito',
              "data": 'circuito',
              "icon": "circuit",
              "children": [],
            }
          }) */
        }
        if(circuitos){
          node.children.push({
            "key": id_hijo,
            "label": name,
            "data": name,
            "icon": "tab",
            "children": [...circuitos ],
          })
        }else {
          node.children.push({
            "key": id_hijo,
            "label": name,
            "data": name,
            "icon": "tab",
            "children": [],
          })
        }
        
      }
      /*    console.log('Node',node.key) */
      if (node.children && bandera) {
        node.children.forEach(function (child) {
          start(child, id, id_hijo,aux)
        }

        );
      }
    }
    for (let i = 0; i < aux_padre_id.length; i++) {
      for (let j = 0; j < aux_padre_null.length; j++) {
      /*   console.log('help', aux_padre_id[i].id)
        console.log('Keys ', aux_padre_id[i].id, aux_padre_id[i].board_padre.id) */
      
        start(aux_padre_null[j], aux_padre_id[i].board_padre.id, aux_padre_id[i].id,aux_padre_id[i].circuits,aux_padre_id[i].name)
      }

    }
    console.log(aux_padre_null);
    setArr([
    ...aux_padre_null
      
     ])
  }
  const handleKeyDownProject = (event) => {
    if (event.key === 'Enter') {
      cambiarNombreProject()()
      console.log('do validate')
    }
  }
  const obtenerReportes = async(id1) => {
    await authAxios.get(`/board/${id1}`).then((resp)=>{setConsultaBoard(resp.data)}).catch(err => console.log(err));
  }  
  const consultarBoard = async(id1)=>{
    await authAxios.get(`/board/${id1}`).then((resp)=>{setNumeroDeCircuits(resp.data.circuits);console.log(resp.data.circuits)}).catch(err => console.log(err));
  }

  const nodeTemplate = (node) => {
    if (node.label) {
      return (
        <div style={{ height: '70px', padding: '20px 0 0 0px', margin: '0px 6px 0 0' }}>
        
          <span onClick={() => {
           if(mreport){
             alert1()
           }else {
                     
             if(node.icon == 'tab' && !mreport){
              setNameTablero(ant => {
                if(ant != node.label){
                  setCircuitName("")
                  setEstadoInputs({
                    loadType:0,
                    power: 0,
                    distance: "0",
                    powerFactor: 0,
                    voltageDrop: "0",
                    aisolation:"0",
                    temperature:0,
                    loadPhases:"0",
                    perPhase:"1",
                    feeder_include_neutral_wire:"true",
                    pipe_material:0,
                    system_voltage:"0",
                    voltaje_drop:0,
                    current:0,
                    cable_width:0,
                    pipe_diameter:0,
                    protection_device:0,
                    grounding_conductor:0,
                  })
                  return node.label
                }else{
                  return node.label
                }
              })
            }
            
            if (node.icon == 'circuit' && !mreport) {setCircuitActual1(node.key);consultarCircuit(node.key);console.log('tableros:',tablerosP);console.log(node.icon)
            tablerosP.forEach(element => {
              if(element.circuits){
                element.circuits.forEach(item => {
                  if(item.id == node.key){
                    setCircuitActual(element.id)
                    consultarBoard(element.id)
                    setNameTablero(element.name)
                  }
                });
              }
            });
          
          }else{setCircuitActual(node.key) ;consultarBoard(node.key);setNameTablero(node.label);console.log("alerrrtt") }
           }   
              
              
    
            /* if (node.icon == 'circuit') {setCircuitActual1(node.key);consultarCircuit(node.key);console.log('tablero circuito: ',circuitActual1);consultarBoard(node.key) } */
            /* obtenerReportes(node.key) */ /* if (node.icon == 'tab') {setCircuitActual(node.key) ;consultarBoard(node.key)  }; ; console.log('tablero actual: ',circuitActual); */ /* consultarCircuit(node.key)  */
            
         
        }
        
          }>{node.label}</span>
          { 
          node.icon == 'circuit'?null:
          <ul class="navbar-nav fr mt3 nav3">
            <li class="nav-item ">
            <a class=""  href="#"  onClick={() => {
                    addCircuit(node.key) 
                    setMount(false)
                  }} >
              <img class="ban" src={plus} />
            </a> 
            {
        /*       node.key == 'Main'?<div class="dropdown-menu dropdown-menu-left navbar-dropdown" aria-labelledby="LanguageDropdown"> 
               <a class="dropdown-item" id="id_en" >
                <div class="flag-icon-holder">
                  <img class="ban" src={tab} />
                  <span class="text-dark" onClick={() => {
                    registrarBoard1()
                    setMount(false)
                  }}>{t("MenuTree.addBoard")}</span>
                </div>
              </a> 
              </div>
              
              : <div class="dropdown-menu dropdown-menu-left navbar-dropdown" aria-labelledby="LanguageDropdown">
              <a class="dropdown-item" id="id_es" >
                <div class="flag-icon-holder">
                  <img class="ban" src={circuit} />
                  <span class="text-dark" onClick={() => {
                    addCircuit(node.key) 
                    setMount(false)
                  }}>{t("MenuTree.addAppliance")}
                  </span>
                </div>
              </a>
             {/*  <a class="dropdown-item" id="id_en" >
                <div class="flag-icon-holder">
                  <img class="ban" src={tab} />
                  <span class="text-dark" onClick={() => {
                    addBoard(node.key)
                    setMount(false)
                  }}>{t("MenuTree.addBoard")}</span>
                </div>
              </a> 
            </div> */
            }
             
             
            </li>
          </ul>}
        </div>

      )
    }
  }
  return (
    <>
      <div className='container mb-2'>
        <div className="row">
        <label htmlFor="" className='mx-3 mt-1 text-white'>Name Project</label>  
        <div class="input-group col-12" style={{width:'150px'}}>
         
            <input className='form-control bg-light' type="text" value={nameProject} onKeyDown={(e) =>handleKeyDownProject(e)} onChange={(e)=>setNameProject(e.target.value)}   aria-describedby="sizing-addon2"/>
            <button className='btn btn-primary ml-2 gray' onClick={()=>{cambiarNombreProject();localStorage.setItem('band',1);}}>
              <i className="pi pi-pencil mt-1 ml-1" id="sizing-addon2" ></i>
            </button>
          </div>
        </div>
      </div>
     
       <button className='btn btn-primary mb-2 mt-2 gray' onClick={() => {
        registrarBoard1()
        setMount(false)

      }}>{t("MenuTree.addBoard")} +</button>   
      <Tree value={arr} nodeTemplate={nodeTemplate} />
    </>
  )
}

export default TreeNav
