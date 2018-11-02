
import React from 'react'
import { compose, pure } from 'recompose'
import { Router as ItemsRouter } from 'views/tab/items'
import { Router as FormsRouter } from 'views/tab/forms'
import { Router as DetailsRouter } from 'views/tab/details'
import { Router as SettingsRouter } from 'views/tab/settings'
import { Router as ShareRouter } from 'views/tab/share'
import { Router as ManageRouter } from 'views/tab/manage'
import { connect } from 'react-redux'

const enhance = compose(
  connect(({ tabs: { tab } }) => ({ tab })),
  pure
)

export default enhance(({ tab }) =>
  <div>
    <DetailsRouter />
    <ItemsRouter />
    <FormsRouter />
    <SettingsRouter />
    <ShareRouter />
    <ManageRouter />
  </div>
)
