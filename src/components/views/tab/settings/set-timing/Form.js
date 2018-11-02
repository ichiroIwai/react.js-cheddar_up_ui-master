
import tx from 'theme/utilities'
import { default as React, PropTypes } from 'react'
import { setPropTypes, setDisplayName, compose, pure, withState } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important'
import { reduxForm, Field } from 'redux-form'
import { TimeInput, DateInput, SwitchBox, Button } from 'elements'
import { connect } from 'react-redux'

const sx = StyleSheet.create({
  maxWidth750: {
    maxWidth: 750
  }
})

const displayName = 'views/tab/settings/make-it-exclusive/Form'

const enhance = compose(
  setDisplayName(displayName),
  setPropTypes({
    onSubmit: PropTypes.func.isRequired,
    tab: React.PropTypes.object
  }),
  connect(({ browser }) => ({ browser })),
  reduxForm({
    form: displayName
  }),
  withState('showFields', 'toggleFields', (props) => !!props.isSwitchOpen),
  pure
)

export default enhance(({
  browser,
  onSubmit,
  handleSubmit,
  showFields,
  toggleFields,
  ...props
}) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className={css(tx.px3)}>
      <h2 className={css(tx.py3, sx.maxWidth750)}>
        Control when people can access your tab. Prior to start time, visitors see a snazzy countdown timer.
      </h2>
      <SwitchBox
        id='switch'
        label='Set Timing'
        input={{value: showFields}}
        onChange={e => {
          toggleFields(e.target.checked)
          if (!e.target.checked) {
            onSubmit({ openDate: null, closeDate: null })
          }
        }}
      />
    </div>
    <hr className={css(tx.my3)} />
    <Choose>
      <When condition={showFields}>
        <div className={css(tx.px3)}>
          <div className={css(sx.maxWidth750, tx.mb2)}>
            <label>Tab Start Date</label>
            <div className={css(tx.flex, tx.mb2)}>
              <div className={css(tx.col6, tx.pr1)}>
                <Field
                  component={DateInput}
                  name='openDate' />
              </div>
              <div className={css(tx.col6)}>
                <Field
                  component={TimeInput}
                  name='openTime' />
              </div>
            </div>

            <label>Tab End Date</label>
            <div className={css(tx.flex)}>
              <div className={css(tx.col6, tx.pr1)}>
                <Field
                  component={DateInput}
                  name='closeDate' />
              </div>
              <div className={css(tx.col6)}>
                <Field
                  component={TimeInput}
                  name='closeTime' />
              </div>
            </div>
          </div>
          <Button backgroundColor='primary'>
            Save
          </Button>
        </div>
      </When>
      <Otherwise>
        <div className={css(tx.textAlignCenter)}>
          <img
            role='presentation'
            className={css(tx.maxWidth100)}
            src={require(browser.lessThan.large ? 'theme/images/Settings.Timing.jpg' : 'theme/images/Settings.Timing.Text.jpg')} />
        </div>
      </Otherwise>
    </Choose>
  </form>
)
