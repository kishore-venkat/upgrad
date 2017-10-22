import { LOGIN, LOGOUT } from '../constants'

const INITIAL_STATE_LOGIN = localStorage.getItem('login')

export function loginReducer (state = INITIAL_STATE_LOGIN, action) {
  switch (action.type) {
    case LOGIN:
      return localStorage.getItem('login')
    case LOGOUT:
      return localStorage.getItem('login')
    default:
      return state
  }
}
