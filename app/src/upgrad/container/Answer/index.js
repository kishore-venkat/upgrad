import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from 'react-router-dom'
import {parse} from 'query-string'
import { checkPage } from '../../utils'
import { Loader } from '../../components'
import { authorGetQuestionDataAction } from '../../actions'
import { questionType, options } from '../../constants'

class Answer extends Component {
  componentWillMount () {
    checkPage(this.props, 'student')
    if (this.props.login === 'student') {
      if (parse(this.props.location.search).id) {
        this.props.authorGetQuestionDataAction(`{"id": "${parse(this.props.location.search).id}"}`)
      }
    }
  }
  renderChoice () {
    const data = this.props.question.data
    if (data.length !== 0) {
      if (data[0].type === 'multiple') {
        return options.map((item, i) => {
          return (
            <div key={i} className='desc'>
              {item}. {data[0].multiple.options[item]}
            </div>
          )
        })
      }
      return null
    }
    return null
  }
  render () {
    if (typeof (this.props.login) === 'undefined' || this.props.login === null) {
      return <Redirect to='/' />
    }
    const data = this.props.question.data
    return (
      <div className='container answer'>
        <Link to='/student'>&lt; Go Back</Link>
        <Loader loading={this.props.question.loading} error={this.props.question.error} >
          <div className='item-wrap'>
            <div className='title'>
              Question Type
            </div>
            <div className='desc'>
              {data.length !== 0 ? questionType[data[0].type] : ''}
            </div>
          </div>
          <div className='item-wrap'>
            <div className='title'>
              Title
            </div>
            <div className='desc'>
              {data.length !== 0 ? data[0].title : ''}
            </div>
          </div>
          <div className='item-wrap'>
            <div className='title'>
              Description
            </div>
            <div className={data.length !== 0 ? data[0].type === 'multiple' ? 'sub-title' : 'desc' : 'desc'}>
              {data.length !== 0 ? data[0].description : ''}
            </div>
            {this.renderChoice()}
          </div>
          <div className='item-wrap'>
            <div className='title'>
              Instructions
            </div>
            <div className='desc'>
              {data.length !== 0 ? data[0].instruction : ''}
            </div>
          </div>
        </Loader>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    question: state.authorGetQuestionData
  }
}

export default withRouter(connect(mapStateToProps, { authorGetQuestionDataAction })(Answer))
