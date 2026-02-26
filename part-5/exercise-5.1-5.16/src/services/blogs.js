import axios, { AxiosHeaders } from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
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

export default { getAll, create, updateById, deleteById }
