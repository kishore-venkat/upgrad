import { combineEpics } from 'redux-observable'
import {
  authorQuestionEpic,
  authorGetQuestionDataEpic,
  authorQuestionUpdateEpic,
  authorDeleteQuestionEpic
} from './question'
import { teacherEpic, teacherAssignEpic, teacherAlreadyEpic } from './teacher'
import { studentEpic } from './student'

export const rootEpic = combineEpics(
  authorQuestionEpic,
  teacherEpic,
  teacherAssignEpic,
  teacherAlreadyEpic,
  studentEpic,
  authorGetQuestionDataEpic,
  authorQuestionUpdateEpic,
  authorDeleteQuestionEpic
)
