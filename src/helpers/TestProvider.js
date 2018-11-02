
import { Provider } from 'react-redux'
import createStore from 'redux/createStore'
import { BrowserRouter } from 'react-router-dom'
import { default as React, cloneElement } from 'react'

export default props =>
  <Provider store={createStore(props.initialState)}>
    <BrowserRouter>
      {cloneElement(props.children, { match: { params: {} } })}
    </BrowserRouter>
  </Provider>
