
import React from 'react'
import Page from './Page'
import { Route } from 'react-router-dom'
import { pure } from 'recompose'

export default pure(() =>
  <Route
    exact
    path='/tab/:tab/items/add-item'
    component={Page} />
)
