import { NavLink } from 'react-router'

import { Path } from '../consts/Path'

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
      <NavLink to={Path.Users} style={getIsActiveStyle}>
        Users
      </NavLink>
      &nbsp;
      {user && (
        <>
          <span>
            <b>{user.name}</b> logged in
          </span>
          &nbsp;
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  )
}
