import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      setFilter(state, action) {
            const content = action.payload
            state = content
            console.log('set filter', content)
            return content
      },
    },
  })
  
  export const { setFilter } = filterSlice.actions
  export default filterSlice.reducer