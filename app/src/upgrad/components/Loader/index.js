import React, { Component } from 'react'

class Loader extends Component {
  render () {
    if (this.props.loading) {
      return (
        <div className='loader'>
          <div className='spinner'>
            <div className='bounce1' />
            <div className='bounce2' />
            <div className='bounce3' />
          </div>
        </div>
      )
    } else if (this.props.error) {
      return (
        <div className='error' style={{ height: this.props.height || '75vh' }}>
            Oops! There has been an issue. Re-try in some time.
        </div>
      )
    } else {
      return (
        <div style={{width: '100%'}}>
          {this.props.children}
        </div>
      )
    }
  }
}

export default Loader
