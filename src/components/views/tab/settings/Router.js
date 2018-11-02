
import React from 'react'
import { Page } from 'views/tab/settings'
import { Route } from 'react-router-dom'
import { Router as MakeItExclusiveRouter } from 'views/tab/settings/make-it-exclusive'
import { Router as GatherDataRouter } from 'views/tab/settings/gather-data'
import { Router as SetTimingRouter } from 'views/tab/settings/set-timing'

export default () =>
  <div>
    <Route
      exact
      path='/tab/:tab/settings'
      component={Page} />
    <MakeItExclusiveRouter />
    <GatherDataRouter />
    <SetTimingRouter />
  </div>
