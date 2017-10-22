import { combineEpics } from 'redux-observable'
import {
  authorQuestionEpic,
  authorGetQuestionDataEpic,
  authorQuestionUpdateEpic,
  authorDeleteQuestionEpic
} from './question'
import { teacherEpic, teacherAssignEpic } from './teacher'
import { studentEpic } from './student'

export const rootEpic = combineEpics(
  authorQuestionEpic,
  teacherEpic,
  teacherAssignEpic,
  studentEpic,
  authorGetQuestionDataEpic,
  authorQuestionUpdateEpic,
  authorDeleteQuestionEpic
)
