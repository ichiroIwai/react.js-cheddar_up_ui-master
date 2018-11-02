
import React from 'react'
import { pure } from 'recompose'
import { Page } from 'views/logout'
import { Route } from 'react-router-dom'

export default pure(() =>
  <div>
    <Route
      exact
      path='/logout'
      component={Page} />
  </div>
)
