import 'react-hot-loader/patch'
import {AppContainer} from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import RootComponent from './root.web'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>, document.getElementById('root'))
}

render(RootComponent)

if (module.hot) {
  module
    .hot
    .accept('./root.web', () => {
      render(RootComponent)
    })
}
