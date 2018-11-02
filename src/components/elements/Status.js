
import tx from 'theme/utilities'
import { FadeIn } from 'elements'
import { css } from 'aphrodite/no-important'
import { compose, defaultProps, setPropTypes } from 'recompose'
import { default as React, PropTypes, createElement } from 'react'
import { Loading, Success, Failure } from 'elements/status-indicators'

const enhance = compose(
  defaultProps({
    indicatorProps: {
      pending: {},
      success: {},
      failure: {}
    },
    messages: {},
    statuses: [
      'pending',
      'success',
      'failure'
    ]
  }),
  setPropTypes({
    indicators: PropTypes.object,
    indicatorProps: PropTypes.object,
    status: PropTypes.string,
    messages: PropTypes.object,
    statuses: PropTypes.array
  })
)

export default enhance(({
  status,
  messages,
  statuses: [REQUEST, SUCCESS, FAILURE],
  indicators,
  indicatorProps,
  speed,
  ...props
}) => {
  if (!status) {
    return null
  }

  indicators = indicators || {
    [REQUEST]: Loading,
    [SUCCESS]: Success,
    [FAILURE]: Failure
  }

  const indicator = createElement(indicators[status], indicatorProps[status])
  const message = messages[status]

  return (
    <FadeIn speed={speed}>
      <Choose>
        <When condition={message}>
          <div className={css(tx.flex, tx.alignCenter)}>
            {indicator}
            <div className={css(tx.color_darkGray, tx.fontSize6, tx.ml1)}>
              {message}
            </div>
          </div>
        </When>
        <Otherwise>
          {indicator}
        </Otherwise>
      </Choose>
    </FadeIn>
  )
})
