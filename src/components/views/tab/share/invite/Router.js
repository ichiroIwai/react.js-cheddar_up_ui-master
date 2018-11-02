
import React from 'react'
import Page from './Page'
import { pure } from 'recompose'
import { Route } from 'react-router-dom'

export default pure(() =>
  <Route
    exact
    path='/tab/:tab/share/invite'
    component={Page} />
)
