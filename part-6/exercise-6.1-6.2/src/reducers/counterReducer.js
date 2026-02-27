export const INITIAL_STATE = {
  good: 0,
  ok: 0,
  bad: 0,
}

export const CounterActionTypes = {
  Good: 'GOOD',
  Ok: 'OK',
  Bad: 'BAD',
  Reset: 'RESET',
}

export const counterReducer = (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case CounterActionTypes.Good:
      return { ...state, good: state.good + 1 }
    case CounterActionTypes.Ok:
      return { ...state, ok: state.ok + 1 }
    case CounterActionTypes.Bad:
      return { ...state, bad: state.bad + 1 }
    case CounterActionTypes.Reset:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
