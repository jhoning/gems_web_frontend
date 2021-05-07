import axios from 'axios'

const token = localStorage.getItem('token')
const authAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    "auth-token": `${token}`
  }
})  

export const getProjectForID = (id) => {
  const data = async(id) => {
    return await authAxios.get(`/project/${id}`)
  }
  return data
}