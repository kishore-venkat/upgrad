import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkPage } from '../../utils'
import { Table, Dropdown } from '../../components'
import { teacherAction, teacherAssignAction, teacherAssignToAction, teacherAlreadyAction } from '../../actions'
import { student } from '../../constants'

class Teacher extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.assign
    }
    this.onAssign = this.onAssign.bind(this)
    this.showQuestion = this.showQuestion.bind(this)
    this.onDropdownSubmit = this.onDropdownSubmit.bind(this)
  }
  componentWillMount () {
    checkPage(this.props, 'teacher')
    if (this.props.login === 'teacher') {
      this.props.teacherAction(this.state.selected)
      this.props.teacherAlreadyAction(this.state.selected)
    }
  }
  onDropdownSubmit (value) {
    this.setState({
      selected: value
    }, () => {
      this.props.teacherAssignToAction(this.state.selected)
      this.props.teacherAction(this.state.selected)
      this.props.teacherAlreadyAction(this.state.selected)
    })
  }
  showQuestion (value) {
    this.props.history.push(`/question?id=${value.id}`)
  }
  onAssign (value) {
    this.props.teacherAssignAction(value, this.state.selected)
  }
  render () {
    if (typeof (this.props.login) === 'undefined' || this.props.login === null) {
      return <Redirect to='/' />
    }
    return (
      <div className='container teacher'>
        <div className='vcenter has-space-btwn'>
          <div>
            <h3>Question List</h3>
          </div>
          <div className='vcenter'>
            <span className='hidden-xs'><b>Student</b> &nbsp;</span>
            <Dropdown title={this.state.selected} selected={this.state.selected} onSubmit={this.onDropdownSubmit} data={student} />
          </div>
        </div>
        <Table showQuestion={this.showQuestion} teacher data={this.props.question} onAssign={this.onAssign} />
        <h3>Already asiigned</h3>
        <Table data={this.props.alreadyAssigned} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    question: state.teacher,
    success: state.success,
    assign: state.teacherAssignTo,
    alreadyAssigned: state.teacherAlready
  }
}

export default withRouter(connect(mapStateToProps, {teacherAction, teacherAssignAction, teacherAssignToAction, teacherAlreadyAction})(Teacher))
