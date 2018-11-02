
import React from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import asyncConnect from 'helpers/asyncConnect'
import { Nav as ItemsNav, ItemForm } from 'views/tab/items'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { withHandlers, setDisplayName } from 'recompose'
import { createItem } from 'redux/modules/items/actions'
import { CREATE_ITEM } from 'redux/modules/items/constants'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

@setDisplayName('views/tab/items/add-item/Page')
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
    tabs: { tab },
    async: { statuses }
  }) => ({
    tab,
    status: statuses[CREATE_ITEM]
  }),
  {
    createItem
  }
)
@withHandlers({
  handleSubmit: ({ createItem, tab, questions }) => data => {
    createItem({
      ...data,
      tab_id: get(tab, 'id'),
      amount_type: data.amount_type !== 'open' ? 'fixed' : 'open',
      amount: data.amount_type !== 'open' && data.amount_type
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
    const { status, handleSubmit, tab } = this.props
    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}
        secondarySidebar={{ nav: <ItemsNav /> }}>
        <ItemForm
          status={status}
          statusMessages={{
            pending: 'Adding item...'
          }}
          initialValues={{ amount_type: 0 }}
          onSubmit={handleSubmit}
        />
      </PanelOverlayLayout>
    )
  }
}
