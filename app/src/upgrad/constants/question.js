export const AUTHOR_QUESTION = 'AUTHOR_QUESTION'
export const AUTHOR_QUESTION_SUCCESS = 'AUTHOR_QUESTION_SUCCESS'
export const AUTHOR_QUESTION_FAILURE = 'AUTHOR_QUESTION_FAILURE'
export const AUTHOR_QUESTION_UPDATE = 'AUTHOR_QUESTION_UPDATE'
export const AUTHOR_QUESTION_UPDATE_SUCCESS = 'AUTHOR_QUESTION_UPDATE_SUCCESS'
export const AUTHOR_QUESTION_UPDATE_FAILURE = 'AUTHOR_QUESTION_UPDATE_FAILURE'
export const AUTHOR_GET_QUESTION_DATA = 'AUTHOR_GET_QUESTION_DATA'
export const AUTHOR_GET_QUESTION_DATA_SUCCESS = 'AUTHOR_GET_QUESTION_DATA_SUCCESS'
export const AUTHOR_GET_QUESTION_DATA_FAILURE = 'AUTHOR_GET_QUESTION_DATA_FAILURE'
export const AUTHOR_DELETE_QUESTION = 'AUTHOR_DELETE_QUESTION'
export const AUTHOR_DELETE_QUESTION_SUCCESS = 'AUTHOR_DELETE_QUESTION_SUCCESS'
export const AUTHOR_DELETE_QUESTION_FAILURE = 'AUTHOR_DELETE_QUESTION_FAILURE'

export const type = [
  {
    value: 'multiple',
    name: 'Multiple choice question '
  },
  {
    value: 'submission',
    name: 'Submission type question'
  },
  {
    value: 'passage',
    name: 'Passage(text) type question'
  }
]

export const options = [
  'A', 'B', 'C', 'D'
]
