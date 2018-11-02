
import React from 'react'
import { Route } from 'react-router-dom'
import { Page } from 'views/tabs'
import { pure } from 'recompose'

export default pure(() =>
  <Route
    exact
    path='/tabs'
    component={Page} />
)
