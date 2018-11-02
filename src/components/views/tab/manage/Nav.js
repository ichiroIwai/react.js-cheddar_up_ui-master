
import React from 'react'
import tx from 'theme/utilities'
import { tabsPathHelper } from 'helpers'
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
        to: tabsPathHelper(tab, 'share'),
        children: <SecondarySidebarNavItem
          label='Share Tab'
          img={{
            src: require('theme/images/PaperPlane.svg'),
            className: css(sx.navItemIcon, tx.mr1)
          }} />
      },
      {
        to: tabsPathHelper(tab, 'details'),
        children: <SecondarySidebarNavItem
          label='Edit Tab'
          img={{
            src: require('theme/images/Gear.svg'),
            className: css(sx.navItemIcon, tx.mr1)
          }} />
      },
      {
        to: tabsPathHelper(tab, 'manage/collection-summary'),
        children: <SecondarySidebarNavItem
          label='Collection Summary'
          img={{
            src: require('theme/images/Withdraw.svg'),
            className: css(sx.navItemIcon, tx.mr1)
          }} />
      },
      {
        to: tabsPathHelper(tab, 'manage/visitor-report'),
        children: <SecondarySidebarNavItem
          label='Visitor Report'
          img={{
            src: require('theme/images/Users.svg'),
            className: css(sx.navItemIcon, tx.mr1)
          }} />
      }
    ]} />
