const ANECDOTES_AT_START = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const INITIAL_STATE = ANECDOTES_AT_START.map(asObject)

export const AnecdoteActionTypes = {
  Vote: 'VOTE',
  Create: 'CREATE',
}

export const anecdoteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AnecdoteActionTypes.Vote:
      return state.map((a) => (a.id === action.payload.id ? { ...a, votes: a.votes + 1 } : a))
    case AnecdoteActionTypes.Create:
      return [...state, asObject(action.payload.content)]
    default:
      return state
  }
}

export const voteAnecdote = (id) => ({
  type: AnecdoteActionTypes.Vote,
  payload: { id },
})

export const createAnecdote = (content) => ({
  type: AnecdoteActionTypes.Create,
  payload: { content },
})
