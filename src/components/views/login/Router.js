
import React from 'react'
import { pure } from 'recompose'
import { Page } from 'views/login'
import { Route } from 'react-router-dom'
import { Router as ForgotPasswordRouter } from 'views/login/forgot-password'

export default pure(() =>
  <div>
    <Route
      exact
      path='/login'
      component={Page} />
    <ForgotPasswordRouter />
  </div>
)
