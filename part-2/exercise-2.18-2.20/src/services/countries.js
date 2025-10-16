const getAll = () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  return fetch(url).then((response) => response.json())
}

export default { getAll }
