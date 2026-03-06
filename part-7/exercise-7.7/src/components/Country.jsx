export const Country = ({ country }) => {
  if (country == null) {
    return <blockquote>Enter a country name to get information about it.</blockquote>
  }

  if (!country.found) {
    return <p>Country not found...</p>
  }

  const { name, capital, population, flag } = country.data

  return (
    <div>
      <h3>{name} </h3>

      <p>
        <b>Capital:</b> {capital}
      </p>

      <p>
        <b>Population:</b> {population}
      </p>

      <img src={flag} height="100" alt={`flag of ${name}`} />
    </div>
  )
}
