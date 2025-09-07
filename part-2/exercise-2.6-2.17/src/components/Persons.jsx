export const Persons = ({ persons }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(({ name, number }) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
