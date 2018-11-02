
import React from 'react'
import { Page } from 'views/tab/details'
import ThemeRouter from './theme/Router'
import { Redirect, Route } from 'react-router-dom'
import { pure, compose, setDisplayName } from 'recompose'

function handleRedirect ({ match }) {
  return <Redirect to={`/tab/${match.params.tab}/details`} />
}

const enhance = compose(
  setDisplayName('views/details/Router'),
  pure
)

export default enhance(() =>
  <div>
    <Route
      exact
      path='/tab/:tab'
      render={handleRedirect} />
    <Route
      exact
      path='/tab/:tab/'
      render={handleRedirect} />
    <Route
      exact
      path='/tab/:tab/details'
      component={Page} />
    <ThemeRouter />
  </div>
)
