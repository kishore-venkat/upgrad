import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'
import {Loader, NoData} from '../'
import { questionType } from '../../constants'

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectAll: [],
      select: []
    }
    this.onSelectAllChange = this.onSelectAllChange.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onAssign = this.onAssign.bind(this)
  }
  onSelectAllChange (value) {
    this.setState({
      selectAll: value,
      select: value.length !== 0 ? this.props.data.data.map((item) => item.id) : []
    })
  }
  onSelectChange (value) {
    this.setState({
      select: value
    })
  }
  onAssign () {
    this.props.onAssign(this.state.select)
  }
  renderList () {
    return this.props.data.data.map((item, i) => {
      return (
        <CheckboxGroup key={i} value={this.state.select} onChange={this.onSelectChange} >
          <div className='list-item'>
            <div className='serial'>
              <div>
                {this.props.teacher ? <Checkbox id={item.id} value={item.id} /> : null}
                <label className='label' htmlFor={item.id}> {i + 1}.</label>
              </div>
            </div>
            <div className='title-wrap'>
              <div className='title'>{item.title}</div>
              <div className='desc'><a className='hand' onClick={() => this.props.showQuestion(item)} >{item.description}</a></div>
            </div>
            <div className='type'>
              <div className='title'>Question type</div>
              <div className='desc' >{questionType[item.type]}</div>
            </div>
          </div>
        </CheckboxGroup>
      )
    })
  }
  renderHeader () {
    if (this.props.teacher) {
      return (
        <div className='table-header'>
          <div className='select-all'>
            <CheckboxGroup value={this.state.selectAll} onChange={this.onSelectAllChange} >
              <Checkbox disabled={this.props.data.data.length === 0} id='select-all' value='all' /><label className='select-label' htmlFor='select-all' >Select all</label>
            </CheckboxGroup>
          </div>
          <div className='table-header-body'>
            <div className='text'>Select questions to assign</div>
            <div className='button-wrap'>
              <div className='button'>
                <button onClick={this.onAssign} disabled={this.state.select.length === 0} className='btn-submit'>Assign</button>
              </div>
              <div className='button'>
                <button onClick={() => this.props.history.push('/question')} className='btn-default'>Author Question</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
  renderTable () {
    if (this.props.data.data.length === 0) {
      return <NoData />
    }
    return (
      <div>
        <div className='table'>
          {this.renderHeader()}
          <div className='table-body'>
            {this.renderList()}
          </div>
        </div>
      </div>
    )
  }
  render () {
    return (
      <Loader loading={this.props.data.loading} error={this.props.data.error} >
        {this.renderTable()}
      </Loader>
    )
  }
}

export default withRouter(Table)
