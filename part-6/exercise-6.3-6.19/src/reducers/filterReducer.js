const INITIAL_STATE = ''

const FilterActionTypes = {
  SetFilter: 'SET_FILTER',
}

export const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterActionTypes.SetFilter:
      return action.payload
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: FilterActionTypes.SetFilter,
    payload: filter,
  }
}
