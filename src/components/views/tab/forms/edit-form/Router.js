
import React from 'react'
import Page from './Page'
import { Route } from 'react-router-dom'

export default () =>
  <Route
    path='/tab/:tab/forms/edit/:id'
    component={Page} />
