
import tx from 'theme/utilities'
import { default as React, PropTypes } from 'react'
import { Failure } from 'elements/status-indicators'
import { StyleSheet, css } from 'aphrodite/no-important'
import { compose, setPropTypes, setDisplayName } from 'recompose'
import { ThemeBannerWithPrimaryImg, BigRadioButton } from 'elements'

const sx = StyleSheet.create({
  container: {
    height: 168
  },
  themeBannerImg: {
    width: 300,
    maxWidth: '100%'
  }
})

const enhance = compose(
  setDisplayName('views/tab/details/theme/ThemeFields'),
  setPropTypes({
    meta: PropTypes.object.isRequired,
    themes: PropTypes.array.isRequired
  })
)

export default enhance(({
  input,
  meta: { touched, error, warning },
  themes,
  ...props
}) =>
  <div>
    {themes.map((theme, key) =>
      <div
        key={key}
        className={css(
          sx.container,
          tx.flex,
          tx.alignCenter,
          tx.py2,
          tx.borderBottom
        )}
        onClick={() => input.onChange(theme.id)}>
        <div className={css(tx.mx3)}>
          <BigRadioButton
            name='theme'
            id={`theme-${key}`}
            checked={theme.id === input.value}
            onChange={() => input.onChange(theme.id)} />
        </div>
        <If condition={theme.header_image && theme.header_image.url}>
          <div className={css(sx.themeBannerImg, tx.mr2)}>
            <ThemeBannerWithPrimaryImg
              theme={theme}
              banner={{
                style: {
                  height: 115,
                  width: 300
                }
              }}
              primary={{
                style: {
                  height: 100,
                  width: 100
                }
              }} />
          </div>
        </If>
        <h3>
          {theme.name}
        </h3>
      </div>
    )}
    <If condition={touched && (warning || error)}>
      <div className={css(tx.flex, tx.alignCenter, tx.p2, tx[`color_${error ? 'error' : 'warning'}`])}>
        <Failure />
        <div className={css(tx.ml0)}>{warning || error}</div>
      </div>
    </If>
  </div>
)
