
import React from 'react'
import tx from 'theme/utilities'
import { StyleSheet, css } from 'aphrodite/no-important'
import { setDisplayName, compose, pure } from 'recompose'

const sx = StyleSheet.create({
  img: {
    width: 100
  }
})

const enhance = compose(
  setDisplayName('views/tab/manage/NoPayments'),
  pure
)

export default enhance(props =>
  <div className={css(tx.textAlignCenter, tx.py4)}>
    <h2>
      You don't have any payments.
      <br />
      Share your tab!
    </h2>
    <img
      role='presentation'
      className={css(sx.img, tx.mt2)}
      src={require('theme/images/ShareTab.svg')} />
  </div>
)
