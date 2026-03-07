import { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
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

      <Card>
        <Card.Header>Added blogs</Card.Header>
        <ListGroup variant="flush">
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  )
}
