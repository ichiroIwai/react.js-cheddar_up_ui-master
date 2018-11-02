
import React from 'react'
import { Page } from 'views/tab/items/create-category'
import { Route } from 'react-router-dom'

export default () =>
  <div>
    <Route
      exact
      path='/tab/:tab/items/create-category'
      component={Page} />
  </div>
