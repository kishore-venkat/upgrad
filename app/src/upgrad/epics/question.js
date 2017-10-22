import { Observable } from 'rxjs'
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
  AUTHOR_DELETE_QUESTION_SUCCESS,
  ERROR
} from '../constants'
import Config from 'Config'

const authorQuestionSuccess = payload => ({ type: AUTHOR_QUESTION_SUCCESS, payload })

export const authorQuestionEpic = action$ => action$
  .ofType(AUTHOR_QUESTION)
  .mergeMap(action => Observable.ajax({
    method: 'POST',
    url: `${Config.api_url}/questions?apiKey=${Config.api_key}`,
    body: action.payload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => authorQuestionSuccess(response))
  .catch(error => Observable.of(
    { type: AUTHOR_QUESTION_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))

const authorGetQuestionDataSuccess = payload => ({ type: AUTHOR_GET_QUESTION_DATA_SUCCESS, payload })

export const authorGetQuestionDataEpic = action$ => action$
  .ofType(AUTHOR_GET_QUESTION_DATA)
  .mergeMap(action => Observable.ajax({
    method: 'GET',
    url: `${Config.api_url}/questions?apiKey=${Config.api_key}&q=${action.payload}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => authorGetQuestionDataSuccess(response))
  .catch(error => Observable.of(
    { type: AUTHOR_GET_QUESTION_DATA_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))
const authorQuestionUpdateSuccess = payload => ({ type: AUTHOR_QUESTION_UPDATE_SUCCESS, payload })

export const authorQuestionUpdateEpic = action$ => action$
  .ofType(AUTHOR_QUESTION_UPDATE)
  .mergeMap(action => Observable.ajax({
    method: 'PUT',
    url: `${Config.api_url}/questions?apiKey=${Config.api_key}&q={"id":"${action.payload.id}"}`,
    body: { '$set': action.payload },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => authorQuestionUpdateSuccess(response))
  .catch(error => Observable.of(
    { type: AUTHOR_QUESTION_UPDATE_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))

const authorDeleteQuestionSuccess = payload => ({ type: AUTHOR_DELETE_QUESTION_SUCCESS, payload })

export const authorDeleteQuestionEpic = action$ => action$
  .ofType(AUTHOR_DELETE_QUESTION)
  .mergeMap(action => Observable.ajax({
    method: 'DELETE',
    url: `${Config.api_url}/questions/${action.payload}?apiKey=${Config.api_key}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => authorDeleteQuestionSuccess(response))
  .catch(error => Observable.of(
    { type: AUTHOR_DELETE_QUESTION_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))
