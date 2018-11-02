
import React from 'react'
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { PanelOverlayLayout } from 'layout'
import { css } from 'aphrodite/no-important'
import { Nav as ItemsNav, CategoryForm } from 'views/tab/items'
import { setDisplayName, withHandlers, mapProps } from 'recompose'
import { getCategory, updateCategory } from 'redux/modules/categories/actions'
import { GET_CATEGORY, UPDATE_CATEGORY } from 'redux/modules/categories/constants'
import asyncConnect from 'helpers/asyncConnect'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { Nav as TabNav } from 'views/tab'
import { UserDrawerNav } from 'elements'

export const displayName = 'views/tab/items/category/edit/Page'

@setDisplayName(displayName)
@asyncConnect(props => {
  const promises = []
  const { tab, category } = props.match.params
  if (tab && tab !== 'create') {
    promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
    promises.push({ key: GET_CATEGORY, promise: getCategory, payload: { tab, category } })
  }
  return promises
})
@connect(
  ({
    tabs: { tab },
    items: { category },
    async: { statuses }
  }) => ({
    tab,
    category,
    status: statuses[UPDATE_CATEGORY]
  }), {
    updateCategory
  }
)
@withHandlers({
  handleSubmit: props => data => {
    const { tab, category } = props.match.params

    props.updateCategory({
      id: category,
      tab_id: tab,
      ...data
    })
  }
})
@mapProps(props => {
  const mapped = { ...props }
  if (props.category) {
    mapped.initialValues = {
      name: props.category.name
    }
  }
  return mapped
})

export default class Page extends React.PureComponent {
  componentWillReceiveProps (next) {
    if (this.props.status !== 'success' && next.status === 'success') {
      return this.props.push(`/tab/${next.tab.id}/items`)
    }
  }

  render () {
    const { tab, initialValues, handleSubmit } = this.props

    return (
      <PanelOverlayLayout
        primarySidebar={{ tab, nav: <TabNav /> }}
        secondaryNavbar={{ tab }}
        drawerMenu={{ children: <UserDrawerNav /> }}
        secondarySidebar={{ nav: <ItemsNav /> }}>
        <If condition={initialValues}>
          <div className={css(tx.px2)}>
            <CategoryForm initialValues={initialValues} onSubmit={handleSubmit} formType='Edit' />
          </div>
        </If>
      </PanelOverlayLayout>
    )
  }
}
