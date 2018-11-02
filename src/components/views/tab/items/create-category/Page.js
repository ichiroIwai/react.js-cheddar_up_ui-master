
import React from 'react'
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import { css } from 'aphrodite/no-important'
import { Nav as ItemsNav, CategoryForm } from 'views/tab/items'
import { setDisplayName, withHandlers } from 'recompose'
import { createCategory } from 'redux/modules/categories/actions'
import { CREATE_CATEGORY } from 'redux/modules/categories/constants'
import { get } from 'lodash'
import asyncConnect from 'helpers/asyncConnect'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

export const displayName = 'views/tab/items/create-category/Page'

@setDisplayName(displayName)
@asyncConnect(props => {
  const promises = []
  const { tab } = props.match.params
  if (tab && tab !== 'create') {
    promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
  }
  return promises
})
@connect(
  ({
    tabs: {tab},
    async: { statuses }
  }) => ({
    tab,
    status: statuses[CREATE_CATEGORY]
  }), {
    createCategory
  }
)
@withHandlers({
  handleSubmit: props => data => {
    props.createCategory({
      ...data,
      tab_id: get(props.tab, 'id')
    })
  }
})
export default class Page extends React.PureComponent {
  componentWillReceiveProps (next) {
    if (this.props.status !== 'success' && next.status === 'success') {
      return this.props.push(`/tab/${next.tab.id}/items`)
    }
  }

  render () {
    const { tab, handleSubmit } = this.props

    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}
        secondarySidebar={{ nav: <ItemsNav /> }}>
        <div className={css(tx.px2)}>
          <CategoryForm onSubmit={handleSubmit} />
        </div>
      </PanelOverlayLayout>
    )
  }
}
