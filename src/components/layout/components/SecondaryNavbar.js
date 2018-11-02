
import { get } from 'lodash'
import tx from 'theme/utilities'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { default as React, PropTypes } from 'react'
import { boxShadow, breakpoints, fontSizes, colors } from 'theme/constants'
import { SecondaryNavbarNav, DrawerMenuControl } from 'layout/components'
import ArrowIcon from 'react-icons/lib/io/arrow-down-b'
import { StyleSheet, css } from 'aphrodite/no-important'
import OpenInNewIcon from 'react-icons/lib/md/open-in-new'
import { pure, setPropTypes, setDisplayName, compose } from 'recompose'
import { zIndex as drawerMenuZIndex } from 'layout/components/DrawerMenu'

export const height = 60
const zIndex = drawerMenuZIndex

const sx = StyleSheet.create({
  outer: {
    boxShadow,
    backgroundColor: colors.darkGray,
    color: colors.white,
    fontSize: fontSizes[5],
    overflow: 'hidden'
  },
  openInNew: {
    height,
    width: height
  },
  saveExit: {
    height,
    width: height * 2
  },
  titleAndNav: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.darkGray,
    [`@media (min-width: ${breakpoints.medium}px)`]: {
      justifyContent: 'space-between',
      fontSize: fontSizes[3]
    },
    [`@media (max-width: ${breakpoints.medium}px)`]: {
      zIndex
    }
  },
  arrow: {
    zIndex,
    position: 'absolute',
    right: 0,
    height,
    width: height
  }
})

const enhance = compose(
  setDisplayName('layout/components/SecondaryNavbar'),
  withRouter,
  connect(({ browser }) => ({ browser })),
  setPropTypes({ tab: PropTypes.object }),
  pure
)

export default enhance(({ tab }) =>
  <div className={css(tx.flex, tx.alignCenter, sx.outer, tx.relative)}>
    <div className={css(sx.titleAndNav, tx.flex, tx.alignCenter, tx.px2)}>
      <div className={css(tx.hide_medium)}>
        {get(tab, 'name') || 'Untitled'}
      </div>
      <div className={css(tx.flex, tx.justifyCenter)}>
        <SecondaryNavbarNav tab={tab} />
      </div>
    </div>
    <div className={css(tx.hide_medium, tx.flex, tx.justifyFlexEnd)}>
      <If condition={tab && tab.slug}>
        <a
          target='_blank'
          href={`${process.env.REACT_APP_RAILS_PATH}tabs/${tab.slug}`}
          className={css(
            sx.openInNew, tx.backgroundColor_gray, tx.color_white,
            tx.flex, tx.alignCenter, tx.justifyCenter
          )}>
          <OpenInNewIcon size={30} />
        </a>
      </If>
      <Link
        to='/tabs'
        className={css(
          sx.saveExit, tx.backgroundColor_teal,
          tx.fontSize5, tx.flex, tx.alignCenter, tx.justifyCenter,
          tx.textAlignCenter, tx.color_white
        )}>
        Save and Exit
      </Link>
    </div>
    <div className={css(sx.arrow, tx.flex, tx.alignCenter, tx.justifyCenter, tx.show_medium)}>
      <DrawerMenuControl
        finish={height}
        style={{ width: '100%' }}>
        <ArrowIcon color={colors.white} />
      </DrawerMenuControl>
    </div>
  </div>
)
