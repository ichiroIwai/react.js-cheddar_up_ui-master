
import 'babel-polyfill'
import React from 'react'
import storage from 'store2'
import { App } from 'components'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createStore from 'redux/createStore'
import { SESSION } from 'redux/modules/session/constants'
import { ConnectedRouter } from '@bentatum/react-router-redux'

const session = storage.get(SESSION)
const initialState = {}

if (session) {
  initialState.session = session
}

render(
  <Provider store={createStore(initialState)}>
    <ConnectedRouter>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
