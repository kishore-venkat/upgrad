import { TEACHER, TEACHER_ASSIGN, TEACHER_ASSIGN_TO, TEACHER_ALREADY } from '../constants'

export function teacherAction (value) {
  return {
    type: TEACHER,
    payload: `{"assigned":{ "$ne": "${value}" }}`
  }
}
export function teacherAssignAction (value, to) {
  let a = `{"id":{ "$in": ${JSON.stringify(value)}}}`
  return {
    type: TEACHER_ASSIGN,
    payload: {q: a, to}
  }
}

export function teacherAssignToAction (value) {
  return {
    type: TEACHER_ASSIGN_TO,
    payload: value
  }
}

export function teacherAlreadyAction (value) {
  return {
    type: TEACHER_ALREADY,
    payload: `{"assigned":{ "$eq": "${value}" }}`
  }
}
