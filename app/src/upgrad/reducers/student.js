import {
  STUDENT,
  STUDENT_FAILURE,
  STUDENT_SUCCESS
} from '../constants'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

export function studentReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case STUDENT:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case STUDENT_SUCCESS:
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case STUDENT_FAILURE:
      return {
        ...state,
        error: true,
        data: [],
        loading: false
      }
    default:
      return state
  }
}
