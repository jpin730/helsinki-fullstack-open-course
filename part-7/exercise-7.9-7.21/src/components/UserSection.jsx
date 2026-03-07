export const UserSection = ({ user, logout }) => {
  return (
    <>
      <span>
        <b>{user.name}</b> logged in
      </span>
      &nbsp;
      <button onClick={logout}>Logout</button>
    </>
  )
}
