import './App.css';
import { Tree } from 'primereact/tree';
import { useState, useEffect, useStateWithCallback } from 'react'
import axios from 'axios';

function App() {
  useEffect(() => {

    getProjectByID();
    obtenerNodos();

  }, [])
  const [login, setLogin] = useState({ email: "", password: "" });
  const [projects, setProjects] = useState([])
  const [nodes, setNodes] = useState([{
    "key": "0",
    "label": "Documents",
    "data": "Documents Folder",
    "icon": "pi pi-fw pi-inbox",
    "children": [{
      "key": "0-0",
      "label": "Work",
      "data": "Work Folder",
      "icon": "pi pi-fw pi-cog",
      "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
    },
    {
      "key": "0-1",
      "label": "Home",
      "data": "Home Folder",
      "icon": "pi pi-fw pi-home",
      "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
    }]
  }])
  const data = [
    {
      "key": "0",
      "label": "Documents",
      "data": "Documents Folder",
      "icon": "pi pi-fw pi-inbox",
      "children": [{
        "key": "0-0",
        "label": "Work",
        "data": "Work Folder",
        "icon": "pi pi-fw pi-cog",
        "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
      },
      {
        "key": "0-1",
        "label": "Home",
        "data": "Home Folder",
        "icon": "pi pi-fw pi-home",
        "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
      }]
    },
    {
      "key": "1",
      "label": "Events",
      "data": "Events Folder",
      "icon": "pi pi-fw pi-calendar",
      "children": [
        { "key": "1-0", "label": "Meeting", "icon": "pi pi-fw pi-calendar-plus", "data": "Meeting" },
        { "key": "1-1", "label": "Product Launch", "icon": "pi pi-fw pi-calendar-plus", "data": "Product Launch" },
        { "key": "1-2", "label": "Report Review", "icon": "pi pi-fw pi-calendar-plus", "data": "Report Review" }]
    },
    {
      "key": "2",
      "label": "Movies",
      "data": "Movies Folder",
      "icon": "pi pi-fw pi-star",
      "children": [{
        "key": "2-0",
        "icon": "pi pi-fw pi-star",
        "label": "Al Pacino",
        "data": "Pacino Movies",
        "children": [{ "key": "2-0-0", "label": "Scarface", "icon": "pi pi-fw pi-video", "data": "Scarface Movie" }, { "key": "2-0-1", "label": "Serpico", "icon": "pi pi-fw pi-video", "data": "Serpico Movie" }]
      },
      {
        "key": "2-1",
        "label": "Robert De Niro",
        "icon": "pi pi-fw pi-star",
        "data": "De Niro Movies",
        "children": [{ "key": "2-1-0", "label": "Goodfellas", "icon": "pi pi-fw pi-video", "data": "Goodfellas Movie" }, { "key": "2-1-1", "label": "Untouchables", "icon": "pi pi-fw pi-video", "data": "Untouchables Movie" }]
      }]
    }
  ]



  const logear = async () => {

    await axios.post('http://localhost:4000/auth/login', { email: login.email, password: login.password })

      .then(resolve => {
        console.log(resolve)
        const token = resolve.data.token
        localStorage.setItem('token', token);
        alert("Usuario logeado de forma exitosa")

      })

      .catch(Response => alert("no logeado"))

  }
  const authAxios = axios.create({

    baseURL: 'http://localhost:4000',
    headers: {
      "auth-token": `${localStorage.getItem('token')}`
    }

  })

  const getProjectByID = async () => {

    const algo = await authAxios.get(`/project`).then(resolve => setProjects(resolve.data))
  }
  const submitHandler = e => {
    e.preventDefault();

  }
  const crearProject = async () => {
    projects.forEach((item, i) => {
      setNodes(nodes => ([...nodes,{
        "key": "0",
        "label": item.name,
        "data": "Documents Folder",
        "icon": "pi pi-fw pi-inbox",
        "children": [{
          "key": "0-0",
          "label": "Work",
          "data": "Work Folder",
          "icon": "pi pi-fw pi-cog",
          "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
        },
        {
          "key": "0-1",
          "label": "Home",
          "data": "Home Folder",
          "icon": "pi pi-fw pi-home",
          "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
        }]
      } ]));
    

    })
    console.log(nodes)
    await authAxios.post('/project', { name: `proyecto ${parseInt(Math.random() * 2500)}` }).then(resolve => alert("proyecto registrado de forma exitosa"))
  }
  const obtenerNodos =  () => {
    const b = {
      "key": "0",
      "label": "Documents",
      "data": "Documents Folder",
      "icon": "pi pi-fw pi-inbox",
      "children": [{
        "key": "0-0",
        "label": "Work",
        "data": "Work Folder",
        "icon": "pi pi-fw pi-cog",
        "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
      },
      {
        "key": "0-1",
        "label": "Home",
        "data": "Home Folder",
        "icon": "pi pi-fw pi-home",
        "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
      }]
    }
   
  }
  return (
    <div className="App">
      <Tree value={nodes} />
      <form onSubmit={submitHandler}>
        <input type="text" name="email" id="email" placeholder="email" onChange={e => setLogin({ ...login, email: e.target.value })} value={login.name} />
        <input type="password" name="password" id="password" placeholder='***************' onChange={e => setLogin({ ...login, password: e.target.value })} />
        <input type="submit" value="logear" onClick={() => logear()} />
        <button className="btn btn-primary mt-3" onClick={() => crearProject()}>Generar Proyecto aleatorio</button>
        <button className="btn btn-primary mt-3" onClick={() => console.log(nodes)}>mostrar arreglos de nodes por consola</button>
      </form>
    </div>

  );
}

export default App;
