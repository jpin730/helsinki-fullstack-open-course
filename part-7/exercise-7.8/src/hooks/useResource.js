import axios from 'axios'
import { useEffect, useState } from 'react'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchResources = async () => {
      const { data } = await axios.get(baseUrl)
      setResources(data)
    }

    fetchResources()
  }, [baseUrl])

  const create = async (resource) => {
    const { data } = await axios.post(baseUrl, resource)
    setResources(resources.concat(data))
  }

  const service = { create }

  return [resources, service]
}
