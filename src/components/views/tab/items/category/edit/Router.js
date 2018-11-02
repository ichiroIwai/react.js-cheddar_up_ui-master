
import React from 'react'
import { Page } from 'views/tab/items/category/edit'
import { Route } from 'react-router-dom'

export default () =>
  <div>
    <Route
      exact
      path='/tab/:tab/items/category/:category/edit'
      component={Page} />
  </div>
