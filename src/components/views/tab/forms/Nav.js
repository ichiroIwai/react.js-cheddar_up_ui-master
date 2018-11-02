
import React from 'react'
import tx from 'theme/utilities'
import { tabsPathHelper } from 'helpers'
import plusIcon from 'theme/images/AddOrangePlus.svg'
import { StyleSheet, css } from 'aphrodite/no-important'
import { SecondarySidebarNav, SecondarySidebarNavItem } from 'layout/components'

const sidebarIconSize = 25

const sx = StyleSheet.create({
  navItemIcon: {
    height: sidebarIconSize
  }
})

export default ({ tab }) =>
  <SecondarySidebarNav
    items={[
      {
        to: tabsPathHelper(tab, 'forms/add-form'),
        children: <SecondarySidebarNavItem
          label='Add Form'
          img={{
            src: plusIcon,
            className: css(sx.navItemIcon, tx.mr1)
          }} />
      }
    ]} />
