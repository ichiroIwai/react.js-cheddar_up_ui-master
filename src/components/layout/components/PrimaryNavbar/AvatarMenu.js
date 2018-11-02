
import React from 'react'
import { get } from 'lodash'
import tx from 'theme/utilities'
import { pure } from 'recompose'
import ArrowDown from 'react-icons/lib/fa/caret-down'
import { css, StyleSheet } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  container: {
    cursor: 'pointer'
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: '100%',
    backgroundSize: 'cover'
  }
})

export default pure(({ user }) =>
  <div className={css(sx.container, tx.flex, tx.alignCenter, tx.justifyFlexEnd)}>
    <div
      className={css(sx.avatar, tx.mr1)}
      style={{ backgroundImage: `url(${get(user, 'profile_pic.url', null)})` }} />
    Hi, {get(user, 'first_name', 'Human')} <div className={css(tx.ml0)}><ArrowDown size={14} /></div>
  </div>
)
