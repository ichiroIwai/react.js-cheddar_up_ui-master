
import React from 'react'
import tx from 'theme/utilities'
import { BasicLayout } from 'layout'
import { setDisplayName } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  container: {
    minHeight: '90vh'
  }
})

const enhance = setDisplayName('views/Error404Page')

export default enhance(() =>
  <BasicLayout>
    <div className={css(sx.container, tx.flex, tx.alignCenter, tx.justifyCenter)}>
      <h1>404</h1>
    </div>
  </BasicLayout>
)
