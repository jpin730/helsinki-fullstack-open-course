import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { clearCurrentUser, initializeUserById } from '../reducers/userReducer'

export const User = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.current)

  const { id } = useParams()

  useEffect(() => {
    dispatch(initializeUserById(id))

    return () => {
      dispatch(clearCurrentUser())
    }
  }, [dispatch, id])

  if (user == null) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}
