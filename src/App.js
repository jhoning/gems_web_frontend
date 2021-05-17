import React, { useEffect, useState, Component } from 'react'
import { Tree } from 'primereact/tree';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
  /*tableros guarda el arreglo de todos los boards asocido a un proyecto*/
  const [tableros, setTableros] = useState([
    {
      id: "1",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: null,
      
    },
    {
      id: "2",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: {
        id:1
      },
      
      
    },
    {
      id: "3",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: {
        id:1
      },
      
    },
    {
      id: "4",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: {
        id:3
      },
      
    },
    {
      id: "5",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: {
        id:3
      },
      
    },
    {
      id: "6",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: {
        id:5
      },
      
      
    },
    {
      id: "7",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: {
        id:6
      },
    }, {
      id: "8",
      name: "tablero",
      project: {
        id: "19",
        name: "kjhk",
      },
      circuits: [
       
      ],
      board_padre: {
        id:7
      },
    }
    
  
    
  ]);
  const [arr, setArr] = useState()
  const generarNavTree = () => {
    /*estas variables aux se encargar de separar los tableros cuyos padres son null (tableros principales) 
    y los que si poseen un id */
    let aux_padre_null
    let aux_padre_id

    //aqui guardo todos los tablero de padre null (tableros principales) con su estructura del navtree ya en el arreglo
    aux_padre_null = tableros.filter(item => item.board_padre == null).map(item => {
      return {
        /* estructura de cada tablero en el navtree (libreria) */
        "key": item.id,
        "label": item.name,
        "data": item.name,
        "icon": "pi pi-fw pi-sliders-h",
        "children": [],
      }
    })

    console.log('Tableros padre: ', aux_padre_null);
    aux_padre_id = tableros.filter(item => item.board_padre != null)
    /*tomando encuenta que su key viene siendo la id del tablero que usaremos 
    mas adelante para comparar con el id padre y hacer las inserciones comparado su key(id) 
    con su board_padre del otro elemnto*/

    /* ahora debemos recorrer los tableros hijos para ir insertandolos 
    del navtree ya antes generada(solo con tablero null)*/
    console.log('Tableros hijos: ', aux_padre_id);
    const start = (node,id,id_hijo) => {
      console.log(id,id_hijo)
      if(node.key == id){
        node.children.push({
          "key": id_hijo,
          "label": "Nuevo hijo" + id_hijo,
          "data": "Nuevo hijo",
          "icon": "pi pi-fw pi-sliders-h",
          "children": [],
        })
      }
   /*    console.log('Node',node.key) */
      if(node.children){
        node.children.forEach(function(child){
          start(child,id,id_hijo)
        }
          
        );
      }
    }
    for (let i = 0; i < aux_padre_id.length; i++) {
      for (let j = 0; j < aux_padre_null.length; j++) {
        console.log('help',aux_padre_id[i].id)
        console.log('Keys ',aux_padre_id[i].id,aux_padre_id[i].board_padre.id) 
        start(aux_padre_null[j],aux_padre_id[i].board_padre.id,aux_padre_id[i].id)
      }
   
    }
  
  
  /*   const insertarTablero = (
      aux_padre_null,
      padre_id,
      id,
      name
    ) => {
      let aux = aux_padre_null.children.findIndex((item) => item.key == padre_id);
      if (aux != -1) {
        aux_padre_null[aux].children.push({
          key: id,
          label: name,
          data: name,
          icon: "pi pi-fw pi-sliders-h",
          children: [],
        });
      }else {
        if(aux_padre_null != undefined){
          for (let i = 0; i < aux_padre_null.children.length; i++) {
            insertarTablero(aux_padre_null[i])
            
          }
        }
      }
    };

    for (let i = 0; i < aux_padre_id.length; i++) {

      insertarTablero(aux_padre_null[i], aux_padre_id[i].board_padre.id, aux_padre_id[i].id, aux_padre_id[i].name)

    } */

    console.log(aux_padre_null);
    setArr(aux_padre_null)
    //Hasta este punto del
  }
  //useEffect es la encargada de llamar a las funciones una vez ingresaste a la pagina
  useEffect(() => {
    generarNavTree()
  }, [])
  return (
    <>
      <Tree value={arr} />
    </>
  )
}

export default App

