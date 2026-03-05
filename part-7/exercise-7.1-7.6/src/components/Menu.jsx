import { NavLink } from 'react-router'

import { Path } from '../const/path'

export const Menu = () => {
  const getActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  })

  return (
    <nav>
      <ul>
        <li>
          <NavLink to={Path.Anecdotes} style={getActiveStyle}>
            Anecdotes
          </NavLink>
        </li>
        <li>
          <NavLink to={Path.CreateNew} style={getActiveStyle}>
            Create New
          </NavLink>
        </li>
        <li>
          <NavLink to={Path.About} style={getActiveStyle}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
