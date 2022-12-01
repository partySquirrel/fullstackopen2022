import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filterReducer', () => {
  test('returns new state with action filter/setFilter', () => {
    const state = ''

    const action = {
      type: 'filter/setFilter',
      payload: 'vitsivitsi',
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)

    expect(newState).toEqual('vitsivitsi')
  })

  test('returns new state with action filter/clearFilter', () => {
    const state = 'trololoo'

    const action = {
      type: 'filter/clearFilter'
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)

    expect(newState).toEqual('')
  })
})