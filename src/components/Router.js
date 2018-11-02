
import React from 'react'
import { compose, pure } from 'recompose'
import { Router as TabRouter } from 'views/tab'
import { Router as TabsRouter } from 'views/tabs'
import { Route, Redirect } from 'react-router-dom'
import { Router as LogoutRouter } from 'views/logout'
import { Router as LoginRouter } from 'views/login'
import { Router as SignupRouter } from 'views/signup'
import { connect } from 'react-redux'

const enhance = compose(
  connect(({ session: { user } }) => ({ user })),
  pure
)

export default enhance(({ user }) =>
  <div>
    <Route
      exact
      path='/'
      render={() =>
        <Choose>
          <When condition={user}>
            <Redirect to='/tabs' />
          </When>
          <Otherwise>
            <Redirect to='/login' />
          </Otherwise>
        </Choose>
      } />
    <Choose>
      <When condition={user}>
        <TabRouter />
        <TabsRouter />
        <LogoutRouter />
      </When>
      <Otherwise>
        <LoginRouter />
        <SignupRouter />
      </Otherwise>
    </Choose>
  </div>
)
