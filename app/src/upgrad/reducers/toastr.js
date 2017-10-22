import {
  ERROR,
  ERROR_CANCEL,
  SUCCESS_CANCEL,
  AUTHOR_QUESTION_SUCCESS,
  AUTHOR_QUESTION_UPDATE_SUCCESS,
  TEACHER_ASSIGN_SUCCESS,
  AUTHOR_DELETE_QUESTION_SUCCESS
} from '../constants'

const STATE = ''

export function errorReducer (state = STATE, action) {
  switch (action.type) {
    case ERROR_CANCEL:
      return STATE
    case ERROR:
      return 'Oops, something went wrong. Please try again after some time.'
    default:
      return state
  }
}

const INITIAL = {
  message: '',
  type: ''
}
export function successReducer (state = INITIAL, action) {
  switch (action.type) {
    case SUCCESS_CANCEL:
      return INITIAL
    case AUTHOR_QUESTION_SUCCESS:
      return {
        message: 'You have successfully authored new question',
        type: 'authorQuestion'
      }
    case AUTHOR_QUESTION_UPDATE_SUCCESS:
      return {
        message: 'You have successfully updated question',
        type: 'authorQuestion'
      }
    case TEACHER_ASSIGN_SUCCESS:
      return {
        message: 'You have successfully assigned',
        type: 'assignQuestion'
      }
    case AUTHOR_DELETE_QUESTION_SUCCESS:
      return {
        message: 'You have successfully deleted question',
        type: 'deleteQuestion'
      }
    default:
      return state
  }
}
