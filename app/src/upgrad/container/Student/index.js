import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from '../../components'
import { checkPage } from '../../utils'
import { studentAction } from '../../actions'

class Student extends Component {
  constructor (props) {
    super(props)
    this.showQuestion = this.showQuestion.bind(this)
  }
  componentWillMount () {
    checkPage(this.props, 'student')
    if (this.props.login === 'student') {
      this.props.studentAction(localStorage.getItem('name'))
    }
  }
  showQuestion (value) {
    this.props.history.push(`/answer?id=${value.id}`)
  }
  render () {
    if (typeof (this.props.login) === 'undefined' || this.props.login === null) {
      return <Redirect to='/' />
    }
    return (
      <div className='container student'>
        <h3>Question List</h3>
        <Table showQuestion={this.showQuestion} data={this.props.student} onAssign={this.onAssign} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    student: state.student
  }
}

export default withRouter(connect(mapStateToProps, {studentAction})(Student))
