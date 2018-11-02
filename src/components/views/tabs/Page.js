
import React from 'react'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import { BasicLayout } from 'layout'
import { TabsList } from 'views/tabs'
import asyncConnect from 'helpers/asyncConnect'
import { UserDrawerNav, Button } from 'elements'
import { compose, setDisplayName } from 'recompose'
import { scale, breakpoints } from 'theme/constants'
import { getTabs } from 'redux/modules/tabs/actions'
import { GET_TABS } from 'redux/modules/tabs/constants'
import { StyleSheet, css } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  tabsList: {
    [`@media (max-width: ${breakpoints.medium}px)`]: {
      marginTop: scale[2]
    }
  }
})

const enhance = compose(
  setDisplayName('tabs/Page'),
  asyncConnect([{ key: GET_TABS, promise: getTabs }])
)

export default enhance(() =>
  <BasicLayout drawerMenu={{ children: <UserDrawerNav /> }}>
    <div className={css(tx.container, tx.p2)}>
      <div className={css(
        tx.py2, tx.borderBottom, tx.flex,
        tx.alignCenter, tx.justifySpaceBetween
      )}>
        <h1 className={css(tx.py2)}>
          My Tabs
        </h1>
        <div className={css(tx.hide_medium)}>
          <Link to='/tab/create'>
            <Button backgroundColor='primary'>
              Create a Tab
            </Button>
          </Link>
        </div>
      </div>
      <div className={css(tx.flex, tx.justifyFlexEnd, tx.hide_medium, tx.borderBottom, tx.py1, tx.mb2)}>
        <Button backgroundColor='lighterGray' color='darkGray' small>
          Folders
        </Button>
      </div>
      <div className={css(sx.tabsList)}>
        <TabsList />
      </div>
    </div>
  </BasicLayout>
)
