import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'
import {
  errorCancel,
  successCancel
} from '../../actions'

class Toastr extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.error !== this.props.error && nextProps.error !== '') {
      this
        .refs
        .toastr
        .addNotification({ title: 'Error', message: nextProps.error, level: 'error', autoDismiss: 4 })
      this.props.errorCancel()
    }
    if (nextProps.success.message !== this.props.success.message && nextProps.success.message !== '') {
      this
        .refs
        .toastr
        .addNotification({ title: 'Success', message: nextProps.success.message, level: 'success', autoDismiss: 4 })
      this.props.successCancel()
    }
  }
  render () {
    return <NotificationSystem ref='toastr' />
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    success: state.success
  }
}

export default withRouter(connect(mapStateToProps, {
  errorCancel,
  successCancel
})(Toastr))
