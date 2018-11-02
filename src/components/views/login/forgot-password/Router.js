
import React from 'react'
import { pure } from 'recompose'
import { Route } from 'react-router-dom'
import { Page } from 'views/login/forgot-password'

export default pure(() =>
  <Route
    path='/login/forgot-password'
    component={Page} />
)
