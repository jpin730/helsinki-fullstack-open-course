export const Persons = ({ persons, deletePerson }) => {
  const handleDeleteClick = ({ id, name }) => confirm(`Delete ${name}?`) && deletePerson(id)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(({ id, name, number }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{number}</td>
            <td>
              <button onClick={() => handleDeleteClick({ id, name })}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
