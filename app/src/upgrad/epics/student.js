import { Observable } from 'rxjs'
import {
  STUDENT,
  STUDENT_FAILURE,
  STUDENT_SUCCESS,
  ERROR
} from '../constants'
import Config from 'Config'

const studentSuccess = payload => ({ type: STUDENT_SUCCESS, payload })

export const studentEpic = action$ => action$
  .ofType(STUDENT)
  .mergeMap(action => Observable.ajax({
    method: 'GET',
    url: `${Config.api_url}/questions?apiKey=${Config.api_key}&q={"assigned": "${action.payload}" }`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .map(response => studentSuccess(response))
  .catch(error => Observable.of(
    { type: STUDENT_FAILURE, payload: error.status },
    { type: ERROR, payload: '' }
    )
  ))
