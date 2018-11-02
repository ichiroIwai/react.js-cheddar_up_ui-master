
import React from 'react'
import { get } from 'lodash'
import storage from 'store2'
import { Router } from 'components'
import { connect } from 'react-redux'
import { asyncConnect } from 'helpers'
import { withRouter } from 'react-router'
import ThemeProvider from 'theme/ThemeProvider'
import { SESSION, GET_SESSION } from 'redux/modules/session/constants'
import { storeSession, getSession } from 'redux/modules/session/actions'

@withRouter
@asyncConnect(props => {
  const promises = []

  if (props.location.pathname.indexOf('logout') === -1) {
    promises.push({
      key: GET_SESSION,
      promise: getSession
    })
  }

  return promises
})
@connect(
  ({ session }) => ({ session }),
  { storeSession }
)
export default class App extends React.PureComponent {
  componentWillReceiveProps (nextProps) {
    // login
    if (!get(storage.get(SESSION), 'user') && nextProps.session.user) {
      this.props.storeSession(nextProps.session)
      return this.props.replace('/tabs')
    }

    // logout
    if (this.props.session.user && !nextProps.session.user) {
      return this.props.replace('/login')
    }
  }

  render () {
    return (
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    )
  }
}
