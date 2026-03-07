export const UserSection = ({ user, logout }) => {
  return (
    <>
      <p>
        <b>{user.name}</b> logged in
      </p>

      <p>
        <button onClick={logout}>Logout</button>
      </p>
    </>
  )
}
