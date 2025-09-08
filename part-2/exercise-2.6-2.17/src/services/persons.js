import axios from 'axios'
import { API_BASE_URL } from '../consts/api-base-url'

const baseUrl = `${API_BASE_URL}/persons`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(({ data }) => data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(({ data }) => data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(({ data }) => data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(({ data }) => data)
}

export default { getAll, create, update, remove }
