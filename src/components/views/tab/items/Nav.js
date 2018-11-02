
import React from 'react'
import tx from 'theme/utilities'
import { tabsPathHelper } from 'helpers'
import { colors } from 'theme/constants'
import plusIcon from 'theme/images/AddOrangePlus.svg'
import { StyleSheet, css } from 'aphrodite/no-important'
import ListIcon from 'react-icons/lib/md/format-list-bulleted'
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
        to: tabsPathHelper(tab, 'items/add-item'),
        children: <SecondarySidebarNavItem
          label='Add Item'
          img={{
            src: plusIcon,
            className: css(sx.navItemIcon, tx.mr1)
          }} />
      },
      {
        to: tabsPathHelper(tab, 'items/create-category'),
        children: <SecondarySidebarNavItem
          label='Create Category'
          icon={<ListIcon
            color={colors.teal}
            size={sidebarIconSize}
            className={css(tx.mr1)} />} />
      }
    ]} />
