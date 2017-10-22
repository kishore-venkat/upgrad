import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from './reducers'
import { rootEpic } from './epics'
import '../../assets/styles/main.scss'
import { Main } from './components'
import { Header } from './container'

const epicMiddleware = createEpicMiddleware(rootEpic)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)))

class RootComponent extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Main />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default RootComponent
