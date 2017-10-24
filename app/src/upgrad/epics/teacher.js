import { Observable } from 'rxjs'
import {
  TEACHER,
  TEACHER_FAILURE,
  TEACHER_SUCCESS,
  TEACHER_ASSIGN,
  TEACHER_ASSIGN_FAILURE,
  TEACHER_ASSIGN_SUCCESS,
  TEACHER_ALREADY,
  TEACHER_ALREADY_FAILURE,
  TEACHER_ALREADY_SUCCESS,
  ERROR
} from '../constants'
import Config from 'Config'

const teacherSuccess = payload => ({ type: TEACHER_SUCCESS, payload })

export const teacherEpic = action$ => action$
  .ofType(TEACHER)
  .mergeMap(action => Observable.ajax({
    method: 'GET',
    url: `${Config.api_url}/questions?apiKey=${Config.api_key}&q=${action.payload}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => teacherSuccess(response))
  .catch(error => Observable.of(
    { type: TEACHER_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))

const teacherAssignSuccess = payload => ({ type: TEACHER_ASSIGN_SUCCESS, payload })

export const teacherAssignEpic = action$ => action$
  .ofType(TEACHER_ASSIGN)
  .mergeMap(action => Observable.ajax({
    method: 'PUT',
    url: `${Config.api_url}/questions?apiKey=${Config.api_key}&q=${action.payload.q}&m=true`,
    body: {'$push': {'assigned': action.payload.to}},
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => teacherAssignSuccess(response))
  .catch(error => Observable.of(
    { type: TEACHER_ASSIGN_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))

const teacherAlreadySuccess = payload => ({ type: TEACHER_ALREADY_SUCCESS, payload })

export const teacherAlreadyEpic = action$ => action$
  .ofType(TEACHER_ALREADY)
  .mergeMap(action => Observable.ajax({
    method: 'GET',
    url: `${Config.api_url}/questions?apiKey=${Config.api_key}&q=${action.payload}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => teacherAlreadySuccess(response))
  .catch(error => Observable.of(
    { type: TEACHER_ALREADY_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))
