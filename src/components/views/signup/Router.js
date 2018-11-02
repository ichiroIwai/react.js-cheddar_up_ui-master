
import React from 'react'
import { pure } from 'recompose'
import { Page } from 'views/signup'
import { Route } from 'react-router-dom'

export default pure(() =>
  <Route
    path='/signup'
    component={Page} />
)
