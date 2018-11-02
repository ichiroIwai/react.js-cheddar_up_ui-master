
import React from 'react'
import numeral from 'numeral'
import tx from 'theme/utilities'
import { StyleSheet, css } from 'aphrodite/no-important'
import { setDisplayName, compose, pure } from 'recompose'
import { SmallMoreButton } from 'elements'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { borderWidth, colors, borderStyle } from 'theme/constants'

const sx = StyleSheet.create({
  payment: {
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.lighterGray,
    borderBottomStyle: borderStyle
  },
  img: {
    backgroundImage: `url(${require('theme/images/ProfileGeneric.svg')})`,
    height: 40,
    width: 40,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '100%'
  }
})

const enhance = compose(
  setDisplayName('views/tab/manage/Payment'),
  pure
)

export default enhance(({ payment }) =>
  <div className={css(sx.payment, tx.flex, tx.alignCenter, tx.justifySpaceBetween, tx.py1)}>
    <div className={css(tx.flex)}>
      <div className={css(sx.img)} />
      <div className={css(tx.pl1)}>
        <h4>Username</h4>
        <div>{moment(payment.updated_at).format('M/D/YYYY')}</div>
      </div>
    </div>
    {numeral(payment.total).format('$0,0.00')}
    <Link to='/'>
      <SmallMoreButton />
    </Link>
  </div>
)
