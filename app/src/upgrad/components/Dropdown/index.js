import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      selected: this.props.selected
    }
    this.onOptionClick = this.onOptionClick.bind(this)
  }
  handleClickOutside (evt) {
    this.setState({expanded: false, selected: this.props.selected})
  }
  onOptionClick (item) {
    this.setState({
      selected: item,
      expanded: false
    }, () => this.props.onSubmit(this.state.selected))
  }
  renderOptions () {
    return this.props.data.map((item, i) => {
      return (
        <div key={i} className={this.state.selected === item ? 'dropdown-option-item active' : 'dropdown-option-item'} onClick={() => this.onOptionClick(item)}>
          {item}
        </div>
      )
    })
  }
  renderContent () {
    if (this.state.expanded) {
      return (
        <div className='dropdown-content'>
          <div className='dropdown-option'>
            {this.renderOptions()}
          </div>
        </div>
      )
    }
    return null
  }
  render () {
    return (
      <div className='disp-flex'>
        <div className='dropdown'>
          <div className='dropdown-container' onClick={() => this.setState({expanded: true})}>
            <div className='dropdown-box'>{this.props.title}</div>
          </div>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default onClickOutside(Dropdown)
