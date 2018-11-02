
import React from 'react'
import Page from './Page'
import { Route } from 'react-router-dom'
import { Router as AddItemRouter } from 'views/tab/items/add-item'
import { Router as CreateCategoryRouter } from 'views/tab/items/create-category'
import { Router as ItemRouter } from 'views/tab/items/item'
import { Router as CategoryRouter } from 'views/tab/items/category'

export default () =>
  <div>
    <Route
      exact
      path='/tab/:tab/items'
      component={Page} />
    <ItemRouter />
    <AddItemRouter />
    <CreateCategoryRouter />
    <CategoryRouter />
  </div>
