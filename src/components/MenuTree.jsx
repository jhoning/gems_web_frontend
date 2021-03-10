import React from 'react'
import Tab from './Tab'
import TreeMenu from 'react-simple-tree-menu';
import { useState, useEffect } from 'react'
import axios from 'axios'
import BoardMenu from './BoardMenu'
import '../css/tree-nav.css'
import '../../node_modules/react-simple-tree-menu/dist/main.css';

const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})  

const MenuTree = () => {
  const [barra,setBarra] = useState([])
  const [nameProject,setNameProject] = useState()
  const [nameBoard,setNameBoard] = useState()
  const [nameBoardID,setNameBoardID] = useState()
  const [bandera,setBandera] = useState(false)
  useEffect( () => {


     
    
    cargarArr() 
    console.log(barra)
  } 

  ,[bandera])

  const cargarArr = async() => {
    await authAxios.get('board').then(resolve=> setBarra(resolve.data));
  }

  const peticionArbol = async() => {
    const algo = localStorage.getItem('token')
    console.log(token)
    await authAxios.post('/circuit' ,{current:4, cable_width:4, pipe_diameter:4, protection_device:4, voltaje_drop:4}).then(resolve=>console.log(resolve)).catch(request=>console.log(token))
  }
  const getProjectByID = async(nameBoardID) => {
    
    const algo = await authAxios.get(`/project/${nameBoardID}`);
    const algo2 = algo.data
    console.log(algo2)
    return algo2
  }
  
  const addBoard = async() => {
   
    const aux = getProjectByID(1);
    console.log(aux)
    await authAxios.post('/board',{name:nameBoard,project:aux})
    .then(resolve=> setBandera(bandera?false:true)).catch(err => alert("ha ocurrido un error"))
    console.log(bandera)
  }

  const addProject = async() => {
    await authAxios.post('/project',{name:nameProject}).then(resp => alert("proyecto agregado con exito")).catch(err => alert("ha ocurrido un error"))
    setNameProject("")
  }
  
  return (
    <div class="accordion" id="accordionExample">
    {/*   <input type="text" name="text" id="nameProject" placeholder="ingrese nombre del board" className="form-control" value={nameBoard} onChange={ e => setNameBoard(e.target.value) }/>
      <input type="text" name="text" id="idProject" placeholder="aqui pasa el id proyecto existen" className="form-control" value={nameBoardID} onChange={ e => { setNameBoardID(e.target.value)} }/>
      <button className="btn btn-primary btn-block" onClick={()=>addBoard()}>New board</button> */}
     {/*  <button className="btn btn-primary btn-block" onClick={()=>agregarTab()}>New tab</button> */}
   {/*   barra.map((item,i) => (<div><BoardMenu  keys={i+78} name1={item.name}/>
        {console.log(item.name)}
        </div>)) */}
     <TreeMenu
  cacheSearch
  data={[
    {
      key: 'mammal',
      label: 'Mammal',
      nodes: [
        {
          key: 'canidae',
          label: 'Canidae',
          nodes: [
            {
              key: 'dog',
              label: 'Dog',
              nodes: [],
              url: 'https://www.google.com/search?q=dog'
            },
            {
              key: 'fox',
              label: 'Fox',
              nodes: [],
              url: 'https://www.google.com/search?q=fox'
            },
            {
              key: 'wolf',
              label: 'Wolf',
              nodes: [],
              url: 'https://www.google.com/search?q=wolf'
            }
          ],
          url: 'https://www.google.com/search?q=canidae'
        }
      ],
      url: 'https://www.google.com/search?q=mammal'
    },
    {
      key: 'reptile',
      label: 'Reptile',
      nodes: [
        {
          key: 'squamata',
          label: 'Squamata',
          nodes: [
            {
              key: 'lizard',
              label: 'Lizard',
              url: 'https://www.google.com/search?q=lizard'
            },
            {
              key: 'snake',
              label: 'Snake',
              url: 'https://www.google.com/search?q=snake'
            },
            {
              key: 'gekko',
              label: 'Gekko',
              url: 'https://www.google.com/search?q=gekko'
            }
          ],
          url: 'https://www.google.com/search?q=squamata'
        }
      ],
      url: 'https://www.google.com/search?q=reptile'
    }
  ]}
  debounceTime={125}
  disableKeyboard={false}
  hasSearch
  onClickItem={function noRefCheck(){}}
  resetOpenNodesOnDataUpdate={false}
/>
      
     
    </div>
  )
}

export default MenuTree
