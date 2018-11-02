
import React from 'react'
import { pure } from 'recompose'
import { Redirect, Route } from 'react-router-dom'
import { Router as EditItemRouter } from 'views/tab/items/item/edit'
import { Router as ItemReportRouter } from 'views/tab/items/item/report'

export default pure(() =>
  <div>
    <Route
      exact
      path='/tab/:tab/items/item/:item'
      render={({ match: { params } }) =>
        <Redirect to={`/tab/${params.tab}/items/item/${params.item}/report`} />
      } />
    <ItemReportRouter />
    <EditItemRouter />
  </div>
)
