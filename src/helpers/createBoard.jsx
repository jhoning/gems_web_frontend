import axios from 'axios'

const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})  

export const createBoard = async(nombre,objPadre) => {
    await authAxios.post('/board',{name:nombre,objPadre})
}