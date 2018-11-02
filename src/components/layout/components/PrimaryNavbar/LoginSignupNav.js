
import React from 'react'
import { Nav } from 'elements'
import tx from 'theme/utilities'
import { css } from 'aphrodite/no-important'

export default () =>
  <Nav
    items={[
      {
        to: '/login',
        className: css(tx.mr2, tx.color_teal),
        children: 'Log in'
      },
      {
        to: '/signup',
        className: css(tx.color_orange),
        children: 'Sign up'
      }
    ]} />
