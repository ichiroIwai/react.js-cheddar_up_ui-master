
import React from 'react'
import { pure } from 'recompose'
import { Redirect, Route } from 'react-router-dom'
import { Router as InviteRouter } from 'views/tab/share/invite'
import { Router as LinkRouter } from 'views/tab/share/link'

export default pure(() =>
  <div>
    <Route
      exact
      path='/tab/:tab/share'
      render={({ match }) =>
        <Redirect to={`/tab/${match.params.tab}/share/link`} />
      } />
    <LinkRouter />
    <InviteRouter />
  </div>
)
