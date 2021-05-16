import React,{useEffect,useState,Component} from 'react'
import { Tree } from 'primereact/tree';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
  /*tableros guarda el arreglo de todos los boards asocido a un proyecto*/
  const [tableros,setTableros] = useState([
    {
        "id": "27",
        "name": "ht",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [
            {
                "id": "1",
                "name": "Circuit"
            },
            {
                "id": "3",
                "name": "Circuit"
            },
            {
                "id": "4",
                "name": "Circuit"
            },
            {
                "id": "5",
                "name": "Circuit"
            },
            {
                "id": "6",
                "name": "Circuit"
            },
            {
                "id": "7",
                "name": "Circuit"
            },
            {
                "id": "9",
                "name": "Circuit"
            },
            {
                "id": "10",
                "name": "Circuit"
            },
            {
                "id": "11",
                "name": "Circuit"
            },
            {
                "id": "12",
                "name": "Circuit"
            },
            {
                "id": "13",
                "name": "Circuit"
            },
            {
                "id": "14",
                "name": "Circuit"
            },
            {
                "id": "15",
                "name": "Circuit"
            },
            {
                "id": "16",
                "name": "Circuit"
            },
            {
                "id": "17",
                "name": "Circuit"
            },
            {
                "id": "18",
                "name": "Circuit"
            },
            {
                "id": "19",
                "name": "Circuit"
            },
            {
                "id": "20",
                "name": "Circuit"
            },
            {
                "id": "21",
                "name": "Circuit"
            },
            {
                "id": "22",
                "name": "Circuit"
            },
            {
                "id": "23",
                "name": "Circuit"
            },
            {
                "id": "27",
                "name": "Circuit"
            },
            {
                "id": "28",
                "name": "Circuit"
            },
            {
                "id": "68",
                "name": "Circuit"
            },
            {
                "id": "69",
                "name": "Circuit"
            },
            {
                "id": "70",
                "name": "Circuit"
            },
            {
                "id": "71",
                "name": "Circuit"
            },
            {
                "id": "72",
                "name": "Circuit"
            },
            {
                "id": "73",
                "name": "Circuit"
            },
            {
                "id": "74",
                "name": "Circuit"
            },
            {
                "id": "75",
                "name": "Circuit"
            },
            {
                "id": "76",
                "name": "Circuit"
            },
            {
                "id": "77",
                "name": "Circuit"
            }
        ],
        "board_padre": null,
        "board_hijos": [
            {
                "id": "36",
                "name": "nuevo board"
            },
            {
                "id": "39",
                "name": "nuevo board"
            },
            {
                "id": "44",
                "name": "nuevo board"
            }
        ]
    },
    {
        "id": "28",
        "name": "ht",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [
            {
                "id": "2",
                "name": "Circuit"
            },
            {
                "id": "24",
                "name": "Circuit"
            },
            {
                "id": "66",
                "name": "Circuit"
            },
            {
                "id": "67",
                "name": "Circuit"
            }
        ],
        "board_padre": null,
        "board_hijos": [
            {
                "id": "110",
                "name": "Nuev"
            },
            {
                "id": "111",
                "name": "Nuev"
            }
        ]
    },
    {
        "id": "29",
        "name": "asd",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [
            {
                "id": "8",
                "name": "Circuit"
            },
            {
                "id": "25",
                "name": "Circuit"
            },
            {
                "id": "26",
                "name": "Circuit"
            }
        ],
        "board_padre": null,
        "board_hijos": [
            {
                "id": "115",
                "name": "Nuev"
            },
            {
                "id": "116",
                "name": "Nuev"
            }
        ]
    },
    {
        "id": "30",
        "name": "sdf",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": null,
        "board_hijos": []
    },
    {
        "id": "36",
        "name": "nuevo board",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "27",
            "name": "ht3"
        },
        "board_hijos": [
            {
                "id": "109",
                "name": "Nuev"
            },
            {
                "id": "112",
                "name": "Nuev"
            },
            {
                "id": "113",
                "name": "Nuev"
            },
            {
                "id": "114",
                "name": "Nuev"
            }
        ]
    },
    {
        "id": "39",
        "name": "nuevo board",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "27",
            "name": "ht5"
        },
        "board_hijos": []
    },
    {
        "id": "44",
        "name": "nuevo board",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "27",
            "name": "ht"
        },
        "board_hijos": []
    },
    {
        "id": "45",
        "name": "Nuevo Board",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": null,
        "board_hijos": []
    },
    {
        "id": "46",
        "name": "Nuevo Board",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": null,
        "board_hijos": []
    },
    {
        "id": "47",
        "name": "Nuevo Board",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": null,
        "board_hijos": []
    },
    {
        "id": "48",
        "name": "Nuevo Board",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": null,
        "board_hijos": []
    },
    {
        "id": "109",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "36",
            "name": "nuevo board"
        },
        "board_hijos": []
    },
    {
        "id": "110",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "28",
            "name": "ht"
        },
        "board_hijos": [
            {
                "id": "117",
                "name": "Nuev"
            },
            {
                "id": "118",
                "name": "Nuev"
            },
            {
                "id": "119",
                "name": "Nuev"
            },
            {
                "id": "120",
                "name": "Nuev"
            },
            {
                "id": "121",
                "name": "Nuev"
            },
            {
                "id": "122",
                "name": "Nuev"
            },
            {
                "id": "123",
                "name": "Nuev"
            },
            {
                "id": "124",
                "name": "Nuev"
            }
        ]
    },
    {
        "id": "111",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "28",
            "name": "ht"
        },
        "board_hijos": []
    },
    {
        "id": "112",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "36",
            "name": "nuevo board"
        },
        "board_hijos": []
    },
    {
        "id": "113",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "36",
            "name": "nuevo board"
        },
        "board_hijos": []
    },
    {
        "id": "114",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "36",
            "name": "nuevo board"
        },
        "board_hijos": []
    },
    {
        "id": "115",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "29",
            "name": "asd"
        },
        "board_hijos": []
    },
    {
        "id": "116",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "29",
            "name": "asd"
        },
        "board_hijos": []
    },
    {
        "id": "117",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    },
    {
        "id": "118",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    },
    {
        "id": "119",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    },
    {
        "id": "120",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    },
    {
        "id": "121",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    },
    {
        "id": "122",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    },
    {
        "id": "123",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    },
    {
        "id": "124",
        "name": "Nuev",
        "project": {
            "id": "19",
            "name": "kjhk"
        },
        "circuits": [],
        "board_padre": {
            "id": "110",
            "name": "Nuev"
        },
        "board_hijos": []
    }
  ])
  const [arr,setArr] = useState()
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
    aux_padre_id = tableros.filter(item => item.board_padre != null)
    /*tomando encuenta que su key viene siendo la id del tablero que usaremos 
    mas adelante para comparar con el id padre y hacer las inserciones comparado su key(id) 
    con su board_padre del otro elemnto*/
   
    /* ahora debemos recorrer los tableros hijos para ir insertandolos 
    del navtree ya antes generada(solo con tablero null)*/
    console.log(aux_padre_id);
    const insertarTablero = (id,name)=>{
      let aux = aux_padre_null.findIndex(item => item.key == id)
      if( aux != -1){
        aux_padre_null[aux].children.push({
          "key": id,
          "label": name,
          "data": name,
          "icon": "pi pi-fw pi-sliders-h",
          "children": [],
        })
      }
    }
    for (let i = 0; i < aux_padre_id.length; i++) {
      console.log(aux_padre_null);
      insertarTablero(aux_padre_id[i].board_padre.id,aux_padre_id[i].board_padre.name)
    }
    
    console.log(aux_padre_null);
    setArr(aux_padre_null)
    //Hasta este punto del
  }
  //useEffect es la encargada de llamar a las funciones una vez ingresaste a la pagina
  useEffect(()=>{
    generarNavTree()
  },[])
  return (
    <>
       <Tree value={arr} /> 
    </>
  )
}

export default App

