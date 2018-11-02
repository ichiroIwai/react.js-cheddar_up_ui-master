
import React from 'react'
import { pure } from 'recompose'
import { Page } from 'views/tab/manage'
import { Route } from 'react-router-dom'
import { Router as WithdrawRouter } from 'views/tab/manage/withdraw'

export default pure(() =>
  <div>
    <Route
      exact
      path='/tab/:tab/manage'
      component={Page} />
    <WithdrawRouter />
  </div>
)
