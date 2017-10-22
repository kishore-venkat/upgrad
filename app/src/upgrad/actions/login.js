import { LOGIN, LOGOUT } from '../constants'

export function LoginAction (value) {
  localStorage.setItem('login', value)
  return {
    type: LOGIN
  }
}

export function LogoutAction (value) {
  localStorage.clear()
  return {
    type: LOGOUT
  }
}
