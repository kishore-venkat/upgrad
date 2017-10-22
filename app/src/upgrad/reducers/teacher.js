import {
  TEACHER,
  TEACHER_FAILURE,
  TEACHER_SUCCESS,
  TEACHER_ASSIGN,
  TEACHER_ASSIGN_FAILURE,
  TEACHER_ASSIGN_SUCCESS,
  TEACHER_ASSIGN_TO,
  student
} from '../constants'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

export function teacherReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TEACHER:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case TEACHER_SUCCESS:
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case TEACHER_FAILURE:
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

export function teacherAssignReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TEACHER_ASSIGN:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case TEACHER_ASSIGN_SUCCESS:
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case TEACHER_ASSIGN_FAILURE:
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

export function teacherAssignToReducer (state = student[0], action) {
  switch (action.type) {
    case TEACHER_ASSIGN_TO:
      return action.payload
    default:
      return state
  }
}
