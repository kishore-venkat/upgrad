import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'
import {parse} from 'query-string'
import { connect } from 'react-redux'
import { checkPage } from '../../utils'
import { type, options } from '../../constants'
import {
  authorQuestionAction,
  authorGetQuestionDataAction,
  authorQuestionUpdateAction,
  authorDeleteQuestionAction
} from '../../actions'
import { Loader } from '../../components'

class Question extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: type[0].value,
      title: '',
      description: '',
      answer: '',
      assigned: [],
      id: Math.random().toString(36).substring(7),
      multiple: {
        answers: [],
        options: {
          'A': '',
          'B': '',
          'C': '',
          'D': ''
        }
      },
      instruction: ''
    }
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onOptionInput = this.onOptionInput.bind(this)
    this.onMultipleChange = this.onMultipleChange.bind(this)
    this.onAuthorSubmit = this.onAuthorSubmit.bind(this)
    this.checkDisabled = this.checkDisabled.bind(this)
  }
  componentWillMount () {
    checkPage(this.props, 'teacher')
    if (this.props.login === 'teacher') {
      if (parse(this.props.location.search).id) {
        this.props.authorGetQuestionDataAction(`{"id": "${parse(this.props.location.search).id}"}`)
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.question.data !== this.props.question.data && nextProps.question.data.length !== 0) {
      let a = nextProps.question.data[0]
      this.setState(a)
    }
  }
  onTypeChange (e) {
    this.setState({
      type: e.target.value,
      title: '',
      description: '',
      answer: '',
      multiple: {
        answers: [],
        options: {
          'A': '',
          'B': '',
          'C': '',
          'D': ''
        }
      },
      instruction: ''
    })
  }
  onOptionInput (e, value) {
    let a = this.state.multiple
    a.options[value] = e.target.value
    this.setState({
      multiple: a
    })
  }
  onMultipleChange (value) {
    let a = this.state.multiple
    a.answers = value
    this.setState({
      multiple: a
    })
  }
  onChange (e, key) {
    this.setState({
      [key]: e.target.value
    })
  }
  onAuthorSubmit (e) {
    e.preventDefault()
    if (parse(this.props.location.search).id) {
      this.props.authorQuestionUpdateAction(this.state)
    } else {
      this.props.authorQuestionAction(this.state)
    }
  }
  checkDisabled () {
    let type = this.state.type
    let t = this.state.title
    let d = this.state.description
    let a = this.state.answer
    let i = this.state.instruction
    let m = this.state.multiple
    if (t && d && i) {
      if (type === 'passage') {
        if (a) {
          return false
        }
        return true
      }
      if (type === 'multiple') {
        if (m.options.A && m.options.B && m.options.C && m.options.D && m.answers.length !== 0) {
          return false
        }
        return true
      }
      return false
    }
    return true
  }
  renderOptions () {
    return options.map((item, i) => {
      return (
        <div key={i} className='option'>
          <div className='option-input'>
            <input type='text' value={this.state.multiple.options[item]} className='form-control' onChange={(e) => this.onOptionInput(e, item)} placeholder={`Type option ${item} here ...`} />
          </div>
          <div className='option-output'>
            <Checkbox value={item} />
          </div>
        </div>
      )
    })
  }
  renderMultiple () {
    if (this.state.type === 'multiple') {
      return (
        <div>
          <div className='has-space-btwn'>
            <div className='title'>
              Answer options:
            </div>
            <div className='title hidden-xs'>
              Right answer:
            </div>
          </div>
          <CheckboxGroup value={this.state.multiple.answers} onChange={this.onMultipleChange}>
            {this.renderOptions()}
          </CheckboxGroup>
        </div>
      )
    }
  }
  renderIdealAnswer () {
    if (this.state.type === 'passage') {
      return (
        <div className='form-group'>
          <label className='control-label'>Ideal Answer:</label>
          <input type='text' value={this.state.answer} className='form-control' onChange={(e) => this.onChange(e, 'answer')} placeholder='Type Answer here ...' />
        </div>
      )
    }
    return null
  }
  renderType () {
    return type.map((item, i) => {
      return (
        <div className='radio' key={i}>
          <label>
            <input type='radio' value={item.value} checked={this.state.type === item.value} onChange={(e) => this.onTypeChange(e)} />
            <span>{item.name}</span>
          </label>
        </div>
      )
    })
  }

  renderSubmit () {
    const checkDisabled = this.checkDisabled()
    if (parse(this.props.location.search).id) {
      return (
        <div className='button'>
          <button type='submit' disabled={checkDisabled} className='btn-submit'>Update</button>
        </div>
      )
    }
    return (
      <div className='button'>
        <button type='submit' disabled={checkDisabled} className='btn-submit'>Author</button>
      </div>
    )
  }

  render () {
    if (typeof (this.props.login) === 'undefined' || this.props.login === null) {
      return <Redirect to='/' />
    }
    const check = parse(this.props.location.search).id
    return (
      <form onSubmit={this.onAuthorSubmit}>
        <Loader loading={this.props.question.loading} error={this.props.question.error} >
          <div className='container question'>
            <div className='has-space-btwn vcenter'>
              <h3>Question Builder</h3>
              <div>
                {check
                ? <div onClick={() => this.props.authorDeleteQuestionAction(this.props.question.data[0]._id['$oid'])} className='btn-danger'>Delete</div>
                : null}
              </div>
            </div>
            <div className='title'>What type of question you want to create ?</div>
            <div className='form-group'>
              {this.renderType()}
            </div>
            <div className='form-group'>
              <label className='control-label'>Question title:</label>
              <input type='text' value={this.state.title} className='form-control' onChange={(e) => this.onChange(e, 'title')} placeholder='Type your question title here ...' />
            </div>
            <div className='form-group'>
              <label className='control-label'>Question description:</label>
              <input type='text' value={this.state.description} className='form-control' onChange={(e) => this.onChange(e, 'description')} placeholder='Type your question description here ...' />
            </div>
            {this.renderIdealAnswer()}
            {this.renderMultiple()}
            <div className='form-group'>
              <label className='control-label'>Instructions:</label>
              <input type='text' value={this.state.instruction} className='form-control' onChange={(e) => this.onChange(e, 'instruction')} placeholder='Type instructions here ...' />
            </div>
          </div>
          <div className='question-submit-container'>
            <div className='container container-wrap'>
              <div className='message hidden-xs'>
                click {check ? 'update to update' : 'Author to create'} a question and will be added automatically to the question list
              </div>
              <div className='button-wrap'>
                <div className='button'>
                  <button onClick={() => this.props.history.push('/teacher')} className='btn-default'>Cancel</button>
                </div>
                {this.renderSubmit()}
              </div>
            </div>
          </div>
        </Loader>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    success: state.success,
    question: state.authorGetQuestionData
  }
}

export default withRouter(connect(mapStateToProps, {
  authorQuestionAction,
  authorGetQuestionDataAction,
  authorQuestionUpdateAction,
  authorDeleteQuestionAction
})(Question))
