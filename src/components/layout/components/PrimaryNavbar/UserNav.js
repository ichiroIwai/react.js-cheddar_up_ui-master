
import React from 'react'
import { Nav } from 'elements'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'

export default () =>
  <Nav
    items={[
      {
        to: '/tabs',
        className: css(tx.mr2, tx.color_black),
        children: 'My Tabs'
      },
      {
        to: `${process.env.REACT_APP_RAILS_PATH}samples`,
        className: css(tx.color_black),
        target: '_blank',
        children: 'Examples'
      }
    ]} />
