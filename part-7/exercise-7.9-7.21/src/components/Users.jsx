import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeUsers } from '../reducers/userReducer'

export const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.user.list)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
