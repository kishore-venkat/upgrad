import {
  AUTHOR_QUESTION,
  AUTHOR_QUESTION_FAILURE,
  AUTHOR_QUESTION_SUCCESS,
  AUTHOR_QUESTION_UPDATE,
  AUTHOR_QUESTION_UPDATE_FAILURE,
  AUTHOR_QUESTION_UPDATE_SUCCESS,
  AUTHOR_GET_QUESTION_DATA,
  AUTHOR_GET_QUESTION_DATA_FAILURE,
  AUTHOR_GET_QUESTION_DATA_SUCCESS,
  AUTHOR_DELETE_QUESTION,
  AUTHOR_DELETE_QUESTION_FAILURE,
  AUTHOR_DELETE_QUESTION_SUCCESS
} from '../constants'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

export function authorQuestionReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHOR_QUESTION:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case AUTHOR_QUESTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false
      }
    case AUTHOR_QUESTION_FAILURE:
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

export function authorGetQuestionDataReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHOR_GET_QUESTION_DATA:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case AUTHOR_GET_QUESTION_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case AUTHOR_GET_QUESTION_DATA_FAILURE:
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

export function authorQuestionUpdateReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHOR_QUESTION_UPDATE:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case AUTHOR_QUESTION_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case AUTHOR_QUESTION_UPDATE_FAILURE:
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

export function authorDeleteQuestionReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTHOR_DELETE_QUESTION:
      return {
        ...state,
        loading: true,
        data: [],
        error: false
      }
    case AUTHOR_DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        data: action.payload.response,
        error: false,
        loading: false
      }
    case AUTHOR_DELETE_QUESTION_FAILURE:
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
