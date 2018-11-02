
import React from 'react'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Nav } from 'views/tab/items'
import { DashboardLayout } from 'layout'
import { PageTitle } from 'layout/components'
import { tabsPathHelper } from 'helpers'
import ItemsList from './ItemsList'
import { StyleSheet, css } from 'aphrodite'
import asyncConnect from 'helpers/asyncConnect'
import { UserDrawerNav, Overlay, Button, Panel } from 'elements'
import addItemIcon from 'theme/images/AddItem.svg'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { getItems } from 'redux/modules/items/actions'
import { getCategories } from 'redux/modules/categories/actions'
import { GET_ITEMS } from 'redux/modules/items/constants'
import { GET_CATEGORIES } from 'redux/modules/categories/constants'
import { withState, setDisplayName, compose } from 'recompose'
import { Nav as TabNav } from 'views/tab'

const sidebarIconSize = 25

const sx = StyleSheet.create({
  navItemIcon: {
    height: sidebarIconSize
  },
  addItemIcon: {
    height: 75
  },
  panel: {
    width: '100%',
    maxWidth: 700
  },
  overlay: {
    minHeight: 300
  }
})

const enhance = compose(
  setDisplayName('views/tab/items/Page'),
  asyncConnect(props => {
    const promises = []
    const { tab } = props.match.params
    if (tab && tab !== 'create') {
      promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
      promises.push({ key: GET_ITEMS, promise: getItems, payload: { tab } })
      promises.push({ key: GET_CATEGORIES, promise: getCategories, payload: { tab } })
    }
    return promises
  }),
  connect(({ tabs: { tab }, items: { items }, categories: { categories } }) => ({ tab, items, categories })),
  withState('warnNoItems', 'shouldWarnNoItems', false)
)

export default enhance(({
  tab,
  items,
  categories,
  warnNoItems,
  shouldWarnNoItems,
  push
}) =>
  <DashboardLayout
    primarySidebar={{ tab, nav: <TabNav /> }}
    secondaryNavbar={{ tab }}
    drawerMenu={{ children: <UserDrawerNav /> }}
    secondarySidebar={{ tab, nav: <Nav /> }}>
    <div className={css(tx.container, tx.px2)}>
      <Choose>
        <When condition={tab && (items.length || categories.length)}>
          <PageTitle className={css(tx.py2)}>
            Your item(s):
          </PageTitle>
          <ItemsList tab={tab} />
        </When>
        <Otherwise>
          <div className={css(tx.flex, tx.justifyCenter, tx.pt2)}>
            <div className={css(sx.panel)}>
              <Link to={tabsPathHelper(tab, 'items/add-item')}>
                <Panel>
                  <div className={css(tx.textAlignCenter, tx.p2, tx.color_black)}>
                    <h2 className={css(tx.mb2)}>
                      What are you collecting for?
                      <br />
                      Add items to your tab:
                    </h2>
                    <img
                      className={css(sx.addItemIcon)}
                      src={addItemIcon}
                      role='presentation' />
                  </div>
                </Panel>
              </Link>
            </div>
          </div>
        </Otherwise>
      </Choose>
      <div className={css(tx.flex, tx.mt2)}>
        <Button
          backgroundColor='orange'
          onClick={() => {
            if (!items.length) {
              return shouldWarnNoItems(true)
            }
            push(tabsPathHelper(tab, 'forms'))
          }}>
          Next
        </Button>
      </div>
    </div>
    <If condition={warnNoItems}>
      <Overlay onDismiss={() => shouldWarnNoItems(false)}>
        <div className={css(tx.flex, tx.flexColumn, tx.justifyCenter)}>
          <h3>You haven't added any items for your payers to select. Are you sure you'd like to continue?</h3>
          <div className={css(tx.flex, tx.mt2)}>
            <div className={css(tx.mr1)}>
              <Link to={tabsPathHelper(tab, 'items/add-item')}>
                <Button small backgroundColor='primary' color='white'>
                  Add Item
                </Button>
              </Link>
            </div>
            <Link to={tabsPathHelper(tab, 'forms')}>
              <Button small backgroundColor='lightGray' color='darkGray'>
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </Overlay>
    </If>
  </DashboardLayout>
)
