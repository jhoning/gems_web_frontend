import axios from  "axios"

const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})  

export const createProject = async(name) => {
  await authAxios.post('/project',{name:name})
  return null;
}