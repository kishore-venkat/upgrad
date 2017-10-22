import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginAction } from '../../actions'
import { Dropdown } from '../../components'
import { student } from '../../constants'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'student',
      selected: student[0]
    }
    this.onRadioChange = this.onRadioChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.onDropdownSubmit = this.onDropdownSubmit.bind(this)
  }
  onRadioChange (e) {
    this.setState({
      type: e.target.value,
      selected: e.target.value === 'teacher' ? 'teacher' : student[0]
    })
  }
  onLogin () {
    localStorage.setItem('name', this.state.selected)
    this.props.LoginAction(this.state.type)
  }
  onDropdownSubmit (value) {
    this.setState({
      selected: value
    })
  }
  render () {
    if (this.props.login) {
      return <Redirect to={`${this.props.login}`} />
    }
    return (
      <div className='login'>
        <div className='login-container'>
          <div className='login-header'>
            Please Select Login
          </div>
          <div className='login-body'>
            <div className='vcenter'>I am &nbsp;
              {
                this.state.type === 'student'
                ? <Dropdown title={this.state.selected} selected={this.state.selected} onSubmit={this.onDropdownSubmit} data={student} />
                : <div className='login-title'>Teacher</div>
              }
            </div>
            <form className='form-vertical' role='form'>
              <div className='form-group'>
                <div className='radio'>
                  <label>
                    <input type='radio' value='student' checked={this.state.type === 'student'} onChange={this.onRadioChange} />
                    <span>Student</span>
                  </label>
                </div>
                <div className='radio'>
                  <label>
                    <input type='radio' value='teacher' checked={this.state.type === 'teacher'} onChange={this.onRadioChange} />
                    <span>Teacher</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className='login-footer'>
            <div />
            <div>
              <button className='btn-submit pull-right' onClick={this.onLogin}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default withRouter(connect(mapStateToProps, { LoginAction })(Login))
