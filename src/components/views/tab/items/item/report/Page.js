
import React from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { asyncConnect } from 'helpers'
import { Nav as TabNav } from 'views/tab'
import { Nav as ItemsNav } from 'views/tab/items'
import { compose, pure } from 'recompose'
import { GET_TAB } from 'redux/modules/tabs/constants'
import { getTab } from 'redux/modules/tabs/actions'
import { GET_ITEM } from 'redux/modules/items/constants'
import { getItem } from 'redux/modules/items/actions'
import { PanelOverlayLayout } from 'layout'
import { StyleSheet, css } from 'aphrodite/no-important'
import tx from 'theme/utilities'
import numeral from 'numeral'
import { UserDrawerNav, Button } from 'elements'
import { borderStyle, borderWidth, borderColor } from 'theme/constants'

const sx = StyleSheet.create({
  exportButtonBar: {
    borderTopStyle: borderStyle,
    borderTopWidth: borderWidth,
    borderTopColor: borderColor,
    borderBottomStyle: borderStyle,
    borderBottomWidth: borderWidth,
    borderBottomColor: borderColor
  }
})

const enhance = compose(
  asyncConnect(props => {
    const promises = []
    const { tab, item } = props.match.params
    if (tab && tab !== 'create') {
      promises.push({ key: GET_TAB, promise: getTab, payload: { tab } })
      promises.push({ key: GET_ITEM, promise: getItem, payload: { tab, item } })
    }
    return promises
  }),
  connect(
    ({
      tabs: { tab },
      items: { item }
    }) => ({
      tab,
      item
    })
  ),
  pure
)

export default enhance(({ tab, item }) =>
  <PanelOverlayLayout
    primarySidebar={{ tab, nav: <TabNav /> }}
    secondaryNavbar={{ tab }}
    drawerMenu={{ children: <UserDrawerNav /> }}
    secondarySidebar={{ nav: <ItemsNav /> }}>
    <div className={css(tx.px2)}>
      <h2 className={css(tx.py2)}>
        {get(item, 'name')}
      </h2>
      <div>
        Collected: {numeral(get(item, 'collected')).format('$0,0.00')}
      </div>
      <div>
        Sold {get(item, 'amount', 0)}
      </div>
      <div className={css(tx.py1, tx.my1, tx.flex, tx.justifyFlexEnd, sx.exportButtonBar)}>
        <Button small backgroundColor='lightGray' color='darkGray'>
          Export spreadsheet
        </Button>
      </div>
    </div>
  </PanelOverlayLayout>
)
