
import React from 'react'
import { Layout } from 'layout'
import tx from 'theme/utilities'
import { connect } from 'react-redux'
import { mediaQueries, colors } from 'theme/constants'
import { compose, setDisplayName, pure } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important'
import { SecondarySidebar, SecondarySidebarMobile, SecondaryNavbar, PrimaryNavbar, PrimarySidebar } from 'layout/components'
import { default as PrimarySidebarMobile, size as primarySidebarMobileSize } from 'layout/components/PrimarySidebarMobile'

const sx = StyleSheet.create({
  outer: {
    backgroundColor: colors.white,
    minHeight: '90vh'
  },
  children: {
    width: '100%',
    minHeight: '90vh',
    [mediaQueries.max_small]: {
      paddingBottom: primarySidebarMobileSize
    }
  }
})

const enhance = compose(
  setDisplayName('layout/DashboardLayout'),
  connect(({ browser }) => ({ browser })),
  pure
)

export default enhance(({
  browser,
  children,
  drawerMenu,
  panelOverlay,
  primarySidebar,
  secondaryNavbar,
  secondarySidebar
}) =>
  <Layout drawerMenu={drawerMenu}>
    <If condition={browser.greaterThan.medium}>
      <PrimaryNavbar />
    </If>
    <If condition={secondaryNavbar}>
      <SecondaryNavbar {...secondaryNavbar} />
    </If>
    <div className={css(sx.outer, tx.flex)}>
      <If condition={primarySidebar && browser.greaterThan.medium}>
        <div>
          <PrimarySidebar {...primarySidebar} />
        </div>
      </If>
      <div className={css(tx.relative, tx.flex, tx.col12)}>
        <If condition={secondarySidebar}>
          <Choose>
            <When condition={browser.lessThan.large}>
              <SecondarySidebarMobile {...secondarySidebar} />
            </When>
            <Otherwise>
              <div>
                <SecondarySidebar {...secondarySidebar} />
              </div>
            </Otherwise>
          </Choose>
        </If>
        <If condition={panelOverlay}>
          {panelOverlay}
        </If>
        <div className={css(tx.relative, sx.children)}>
          {children}
        </div>
      </div>
    </div>
    <If condition={primarySidebar && browser.lessThan.large}>
      <PrimarySidebarMobile {...primarySidebar} />
    </If>
  </Layout>
)
