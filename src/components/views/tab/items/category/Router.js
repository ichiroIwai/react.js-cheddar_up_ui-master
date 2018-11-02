
import React from 'react'
import { pure } from 'recompose'
import { Redirect, Route } from 'react-router-dom'
import { Router as EditCategoryRouter } from 'views/tab/items/category/edit'

export default pure(() =>
  <div>
    <Route
      exact
      path='/tab/:tab/items/category/:category'
      render={({ match: { params } }) =>
        <Redirect to={`/tab/${params.tab}/items/category/${params.category}/edit`} />
      } />
    <EditCategoryRouter />
  </div>
)
