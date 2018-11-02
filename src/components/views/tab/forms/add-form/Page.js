
import React from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { setDisplayName, withHandlers } from 'recompose'
import { PanelOverlayLayout } from 'layout'
import asyncConnect from 'helpers/asyncConnect'
import { Nav as FormsNav, Form } from 'views/tab/forms'
import { Nav as TabNav } from 'views/tab'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { createForm } from 'redux/modules/forms/actions'
import { CREATE_FORM } from 'redux/modules/forms/constants'

@setDisplayName('views/tab/forms/add-form/Page')
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
    status: statuses[CREATE_FORM]
  }),
  {
    createForm
  }
)
@withHandlers({
  handleSubmit: ({ createForm, tab, questions }) => data => {
    createForm({
      ...data,
      tab_id: get(tab, 'id')
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
        secondarySidebar={{ nav: <FormsNav /> }}>
        <Form onSubmit={handleSubmit} />
      </PanelOverlayLayout>
    )
  }
}
