
import React from 'react'
import Color from 'color'
import shortid from 'shortid'
import tx from 'theme/utilities'
import { Link } from 'react-router-dom'
import * as fonts from 'theme/fonts'
import { tabsPathHelper } from 'helpers'
import CloseIcon from 'react-icons/lib/md/close'
import { StyleSheet, css } from 'aphrodite/no-important'
import applyThemeIcon from 'theme/images/ApplyTheme.svg'
import { pure, compose, setDisplayName } from 'recompose'
import { Panel, ThemeBannerWithPrimaryImg } from 'elements'
import { borderWidth, fontSizes, colors, mediaQueries, scale } from 'theme/constants'

const closeIconId = shortid.generate()
const height = 195

const sx = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    [`:hover #${closeIconId}`]: {
      display: 'block'
    }
  },
  closeIcon: {
    position: 'absolute',
    top: borderWidth,
    right: borderWidth,
    display: 'none',
    backgroundColor: Color(colors.black).fade(0.8).rgb().string()
  },
  textarea: {
    resize: 'vertical',
    height: '100%'
  },
  textareaOuter: {
    [mediaQueries.max_medium]: {
      marginBottom: scale[1]
    }
  },
  imgContainer: {
    [mediaQueries.min_medium]: {
      paddingLeft: scale[1]
    }
  },
  applyThemeIcon: {
    height: 63
  },
  tabImg: {
    maxWidth: '100%'
  },
  themeHeader: {
    height,
    fontFamily: fonts.AvenirRoman,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }
})

const enhance = compose(
  setDisplayName('views/tab/details/ThemeHeading'),
  pure
)

export default enhance(({ onCancel, tab, theme }) =>
  <div className={css(sx.container, tx.relative, tx.borderRadius)}>
    <Link to={tabsPathHelper(tab, 'details/theme')}>
      <Panel>
        <Choose>
          <When condition={theme && theme.banner_background_image.url}>
            <ThemeBannerWithPrimaryImg
              theme={theme}
              banner={{
                style: {
                  height,
                  width: '100%'
                }
              }}
              primary={{
                style: {
                  height: 150,
                  width: 150
                }
              }} />
          </When>
          <When condition={theme && !theme.banner_background_image.url}>
            <div className={css(sx.themeHeader)} />
          </When>
          <Otherwise>
            <div className={css(
              sx.themeHeader,
              tx.flex,
              tx.flexColumn,
              tx.alignCenter,
              tx.justifyCenter,
              tx.p2,
              tx.color_gray
            )}>
              <img
                role='presentation'
                src={applyThemeIcon}
                className={css(sx.applyThemeIcon, tx.mb1)} />
              <h4>Apply a Theme</h4>
            </div>
          </Otherwise>
        </Choose>
      </Panel>
    </Link>
    <If condition={theme}>
      <div>
        <div
          id={closeIconId}
          onClick={onCancel}
          className={css(sx.closeIcon, tx.borderRadius)}>
          <CloseIcon
            color={colors.white}
            size={fontSizes[2]} />
        </div>
      </div>
    </If>
  </div>
)
