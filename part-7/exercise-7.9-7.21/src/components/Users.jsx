import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'

import { Path } from '../consts/Path'
import { initializeUsers } from '../reducers/userReducer'

export const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.user.list)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const getTo = (user) => Path.UserById.replace(':id', user.id)

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
              <td>
                <Link to={getTo(user)}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
