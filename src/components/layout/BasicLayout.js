
import React from 'react'
import { Layout } from 'layout'
import tx from 'theme/utilities'
import { pure } from 'recompose'
import { PrimaryNavbar } from 'layout/components'
import { StyleSheet, css } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  outer: {
    minHeight: '100vh'
  }
})

export default pure(({
  children,
  ...props
}) =>
  <Layout {...props}>
    <PrimaryNavbar />
    <div className={css(tx.backgroundColor_white, sx.outer)}>
      <div className={css(tx.relative, tx.container)}>
        {children}
      </div>
    </div>
  </Layout>
)
