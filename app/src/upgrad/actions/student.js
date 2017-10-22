import { STUDENT } from '../constants'

export function studentAction (value) {
  return {
    type: STUDENT,
    payload: value
  }
}
