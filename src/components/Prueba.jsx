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
const Prueba = () => {
  const [t] = useTranslation("global")
  const [arr,setArr] = useState([])
  const [aux,setAux] = useState(1)
  const [select,setSelect] = useState()
  const nodeTemplate = (node) => {
    if (node.label) {
      return (
        <div style={{ height: '70px', padding: '20px 0 0 0px', margin: '0px 6px 0 0' }}>

          <span  onClick={()=>{setSelect(node.key);console.log(node.key)}}>{node.label + node.key}</span>
          { 
          node.icon == 'circuit'?null:
          <ul class="navbar-nav fr mt3 nav3">
            <li class="nav-item dropdown language-dropdown">
              <a class="" id="LanguageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <img class="ban" src={plus} />
              </a>

              <div class="dropdown-menu dropdown-menu-left navbar-dropdown" aria-labelledby="LanguageDropdown">
                <a class="dropdown-item" id="id_es"  onClick={() => {setArr(item => [...item,{
                          "key": aux,
                          "label": "Circuito",
                          "data": "Circuito",
                          "icon": "circuit",
                          "className": "expandido",
                          "children": [],
    }]);setAux(aux + 1)}}>
                  <div class="flag-icon-holder">
                    <img class="ban" src={circuit} />
                    <span class="text-dark" onClick={() => {

                   /*    obtenerReportes(node.key)*/
                    
                    }}>{t("MenuTree.addAppliance")}
                    </span>
                  </div>
                </a>
              </div>
            </li>
          </ul>}
        </div>

      )
    }
  }
  return (
    <div>
      <Tree value={[{
      "key": '',
      "label": "Tablero Principal",
      "data": "Tablero Principal",
      "icon": "tab",
      "className": "expandido",
      "children": [...arr],
    }]} nodeTemplate={nodeTemplate}/>
    </div>
  )
}

export default Prueba
