
import React from 'react'
import { pure } from 'recompose'
import { Route } from 'react-router-dom'
import { Page } from 'views/tab/items/item/report'

export default pure(() =>
  <Route
    exact
    path='/tab/:tab/items/item/:item/report'
    component={Page} />
)
