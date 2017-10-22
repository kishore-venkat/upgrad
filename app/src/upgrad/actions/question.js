import {
  AUTHOR_QUESTION,
  AUTHOR_GET_QUESTION_DATA,
  AUTHOR_QUESTION_UPDATE,
  AUTHOR_DELETE_QUESTION
} from '../constants'

export function authorQuestionAction (value) {
  return {
    type: AUTHOR_QUESTION,
    payload: value
  }
}

export function authorGetQuestionDataAction (value) {
  return {
    type: AUTHOR_GET_QUESTION_DATA,
    payload: value
  }
}

export function authorQuestionUpdateAction (value) {
  return {
    type: AUTHOR_QUESTION_UPDATE,
    payload: value
  }
}

export function authorDeleteQuestionAction (value) {
  console.log(value)
  return {
    type: AUTHOR_DELETE_QUESTION,
    payload: value
  }
}
