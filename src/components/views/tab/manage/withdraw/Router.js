
import React from 'react'
import { pure } from 'recompose'
import { Route } from 'react-router-dom'
import { Page } from 'views/tab/manage/withdraw'

export default pure(() =>
  <Route
    exact
    path='/tab/:tab/manage/withdraw'
    component={Page} />
)
