import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToState(state, action) {
      console.log('setting user')
      return action.payload
    },
  },
})

export const { setUserToState } = userSlice.actions
export default userSlice.reducer

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setActiveUser())
      dispatch(setNotification('Logged in!', 5))
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 5))
    }
  }
}

export const setActiveUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserToState(user))
      blogService.setToken(user.token)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      dispatch(setNotification('Successfully logged out', 5))
      dispatch(setUserToState(null))
    } catch (exception) {
      dispatch(setNotification('failed to log out', 5))
    }
  }
}
