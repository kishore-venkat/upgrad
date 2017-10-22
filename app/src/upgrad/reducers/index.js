import { combineReducers } from 'redux'
import { loginReducer } from './login'
import { authorQuestionReducer, authorGetQuestionDataReducer, authorQuestionUpdateReducer } from './question'
import { errorReducer, successReducer } from './toastr'
import { teacherReducer, teacherAssignReducer, teacherAssignToReducer } from './teacher'
import { studentReducer } from './student'

export const rootReducer = combineReducers({
  login: loginReducer,
  authorQuestion: authorQuestionReducer,
  authorGetQuestionData: authorGetQuestionDataReducer,
  authorQuestionUpdate: authorQuestionUpdateReducer,
  error: errorReducer,
  success: successReducer,
  teacher: teacherReducer,
  assign: teacherAssignReducer,
  student: studentReducer,
  teacherAssignTo: teacherAssignToReducer
})
