export const filterPersons = (persons, filter) =>
  Object.values(persons).filter(({ name }) =>
    name.toLowerCase().includes(filter.trim().toLowerCase()),
  )
