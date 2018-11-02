
import React from 'react'
import Page from './Page'
import { Route } from 'react-router-dom'

export default () =>
  <div>
    <Route
      exact
      path='/tab/:tab/details/theme'
      component={Page} />
  </div>
