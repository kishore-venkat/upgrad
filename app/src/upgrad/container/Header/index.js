import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {LogoutAction, teacherAction} from '../../actions'

class Header extends Component {
  constructor (props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.login !== this.props.login && typeof (nextProps.login) === 'undefined') {
      nextProps.history.push('/')
    }
    if (nextProps.success.type !== this.props.success.type) {
      if (nextProps.success.type === 'assignQuestion') {
        nextProps.teacherAction(nextProps.assign)
      }
      if (nextProps.success.type === 'authorQuestion' || nextProps.success.type === 'deleteQuestion') {
        nextProps.history.push('/teacher')
      }
    }
  }
  onLogout () {
    this.props.LogoutAction()
  }
  render () {
    return (
      <div className='header'>
        <div className='logo-wrap'>
          <img src='images/Logo.png' className='logo' alt='logo' />
        </div>
        <div className='logout-wrap'>
          {this.props.login
          ? <div className='vcenter' ><div className='hidden-xs'>welcome, <b>{localStorage.getItem('name')}</b>&nbsp;&nbsp;&nbsp;</div><button onClick={this.onLogout} className='pull-right btn-submit'>Logout</button></div>
          : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    success: state.success,
    assign: state.teacherAssignTo
  }
}

export default withRouter(connect(mapStateToProps, {LogoutAction, teacherAction})(Header))
