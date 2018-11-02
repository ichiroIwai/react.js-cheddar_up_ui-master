
import React from 'react'
import Color from 'color'
import { get } from 'lodash'
import { StyleSheet, css } from 'aphrodite/no-important'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import { mediaQueries, colors } from 'theme/constants'
import { width } from 'layout/components/PrimarySidebar'
import { setDisplayName, mapProps, pure, compose } from 'recompose'
import { withRouter } from 'react-router'

const fadedWhite = Color(colors.white).fade(0.8).rgb().string()
const widthSmall = width / 1.5

const sx = StyleSheet.create({
  item: {
    position: 'relative',
    height: width,
    width: width,
    ':hover': {
      backgroundColor: fadedWhite
    },
    [mediaQueries.max_medium]: {
      height: widthSmall,
      width: widthSmall
    }
  },
  disabled: {
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'inherit'
    }
  },
  activeItem: {
    backgroundColor: fadedWhite
  },
  icon: {
    [mediaQueries.max_medium]: {
      height: 30
    }
  },
  curtain: {
    position: 'absolute',
    backgroundColor: Color(colors.teal).fade(0.3).rgb().string(),
    height: '100%',
    width: '100%'
  }
})

const enhance = compose(
  setDisplayName('layout/components/PrimarySidebarNavItem'),
  withRouter,
  mapProps(props => ({
    ...props,
    cx: css(
      sx.item,
      tx.flex,
      tx.justifyCenter,
      tx.alignCenter,
      tx.color_white,
      props.disabled && sx.disabled,
      get(props, 'match.url') === props.to && sx.activeItem
    ),
    children: (
      <div className={css(tx.flex, tx.flexColumn, tx.alignCenter, tx.color_white)}>
        <img
          className={css(sx.icon, tx.mb0)}
          src={props.imgSrc}
          role='presentation' />
        <div>{props.label}</div>
      </div>
    )
  })),
  pure
)

export default enhance(({ to, cx, disabled, children }) =>
  <Choose>
    <When condition={!disabled}>
      <Link to={to} className={cx}>
        {children}
      </Link>
    </When>
    <Otherwise>
      <div className={cx}>
        <div className={css(sx.curtain)} />
        {children}
      </div>
    </Otherwise>
  </Choose>
)
