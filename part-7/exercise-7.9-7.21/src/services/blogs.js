import axios, { AxiosHeaders } from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (blog, token) => {
  const headers = new AxiosHeaders().setAuthorization(`Bearer ${token}`)
  const response = await axios.post(baseUrl, blog, { headers })
  return response.data
}

const updateById = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const deleteById = async (id, token) => {
  const headers = new AxiosHeaders().setAuthorization(`Bearer ${token}`)
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { getAll, getById, create, updateById, deleteById, addComment }
