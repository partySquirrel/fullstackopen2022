import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
    clearFilter() {
      return ''
    },
  },
})


export const { setFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer