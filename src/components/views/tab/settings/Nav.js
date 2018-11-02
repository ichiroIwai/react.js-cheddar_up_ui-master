
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
        to: tabsPathHelper(tab, 'settings/add-attachment'),
        children: <SecondarySidebarNavItem
          label='Add Attachment'
          img={{
            src: require('theme/images/Attachment.Sm.svg'),
            className: css(tx.mr1, sx.navItemIcon)
          }} />
      },
      {
        to: tabsPathHelper(tab, 'settings/set-timing'),
        children: <SecondarySidebarNavItem
          label='Set Timing'
          img={{
            src: require('theme/images/Timing.Sm.svg'),
            className: css(tx.mr1, sx.navItemIcon)
          }} />
      },
      {
        to: tabsPathHelper(tab, 'settings/make-it-exclusive'),
        children: <SecondarySidebarNavItem
          label='Make It Exclusive'
          img={{
            src: require('theme/images/Code.Sm.svg'),
            className: css(tx.mr1, sx.navItemIcon)
          }} />
      },
      {
        to: tabsPathHelper(tab, 'settings/gather-data'),
        children: <SecondarySidebarNavItem
          label='Gather Data'
          img={{
            src: require('theme/images/Data.Sm.svg'),
            className: css(tx.mr1, sx.navItemIcon)
          }} />
      }/*,
      {
        to: tabsPathHelper('settings/offer-discount'),
        children: <SecondarySidebarNavItem
          label='Offer Discount'
          img={{
            src: require('theme/images/Data.svg'),
            className: css(tx.mr1, sx.navItemIcon)
          }} />
      } */
    ]} />
