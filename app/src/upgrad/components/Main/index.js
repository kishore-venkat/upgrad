import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'

import { PageNotFound } from '../'
import { Login, Student, Teacher, Question, Toastr, Answer } from '../../container'

class Main extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/teacher' component={Teacher} />
          <Route path='/student' component={Student} />
          <Route path='/question' component={Question} />
          <Route path='/answer' component={Answer} />
          <Route component={PageNotFound} />
        </Switch>
        <Toastr />
      </div>
    )
  }
}

export default withRouter(Main)
