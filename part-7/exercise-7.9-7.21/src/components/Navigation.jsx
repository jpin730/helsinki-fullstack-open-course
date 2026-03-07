import { NavLink } from 'react-router'

import { Path } from '../consts/Path'
import { UserSection } from './UserSection'

export const Navigation = ({ user, logout }) => {
  const getIsActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  })

  return (
    <nav>
      <NavLink to={Path.Blogs} style={getIsActiveStyle}>
        Blogs
      </NavLink>
      &nbsp;
      {user && <UserSection user={user} logout={logout} />}
    </nav>
  )
}
