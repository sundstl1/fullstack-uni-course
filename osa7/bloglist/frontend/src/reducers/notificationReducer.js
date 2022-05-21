import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutId = undefined

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log('new notification', action.payload)
      const content = action.payload
      state = content
      return content
    },
    hideNotification(state, action) {
      console.log('clearing notification')
      return null
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (content, timeout) => {
  return async (dispatch) => {
    console.log(`setting notification ${content} with timeout ${timeout}`)

    dispatch(showNotification(content))

    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
  }
}
