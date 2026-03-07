import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login as loginAction, logout as logoutAction, setUser } from '../reducers/userReducer'

const LOGGED_USER_KEY = 'loggedBlogAppUser'

export const useUser = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(
    function restoreUserSession() {
      const storedUser = localStorage.getItem(LOGGED_USER_KEY)
      if (storedUser) {
        try {
          dispatch(setUser(JSON.parse(storedUser)))
        } catch {
          localStorage.removeItem(LOGGED_USER_KEY)
        }
      }
    },
    [dispatch],
  )

  useEffect(
    function syncUserToStorage() {
      if (user) {
        localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user))
        return
      }
      if (localStorage.getItem(LOGGED_USER_KEY)) {
        localStorage.removeItem(LOGGED_USER_KEY)
      }
    },
    [user],
  )

  const login = ({ username, password }) => dispatch(loginAction({ username, password }))

  const logout = () => dispatch(logoutAction())

  return { user, login, logout }
}
