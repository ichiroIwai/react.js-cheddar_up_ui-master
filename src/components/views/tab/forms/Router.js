
import React from 'react'
import Page from './Page'
import { pure } from 'recompose'
import { Route } from 'react-router-dom'
import { Router as AddFormRouter } from 'views/tab/forms/add-form'

export default pure(() =>
  <div>
    <Route
      exact
      path='/tab/:tab/forms'
      component={Page} />
    <AddFormRouter />
  </div>
)
