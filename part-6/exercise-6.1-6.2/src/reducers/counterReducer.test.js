import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import { CounterActionTypes, counterReducer, INITIAL_STATE } from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = INITIAL_STATE

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: CounterActionTypes.Good,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: CounterActionTypes.Ok,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: CounterActionTypes.Bad,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('state is reset to initial state', () => {
    const action = {
      type: CounterActionTypes.Reset,
    }
    const state = {
      good: 5,
      ok: 3,
      bad: 2,
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })
})
