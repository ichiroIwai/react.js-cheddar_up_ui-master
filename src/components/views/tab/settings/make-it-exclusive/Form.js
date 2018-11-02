
import tx from 'theme/utilities'
import { default as React, PropTypes } from 'react'
import { setPropTypes, setDisplayName, compose, pure, withState } from 'recompose'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Field, reduxForm } from 'redux-form'
import { Input, SwitchBox, Button } from 'elements'
import { connect } from 'react-redux'

const sx = StyleSheet.create({
  input: {
    maxWidth: 700
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
  withState('showFields', 'toggleFields', (props) => props.tab && props.tab.access_code !== ''),
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
      <h2 className={css(tx.py3)}>
        Make your tab exclusive by creating a code that visitors must
        <br />
        enter to access your tab
      </h2>
      <SwitchBox
        id='switch'
        label='Require Entry Code'
        input={{value: showFields}}
        onChange={e => {
          toggleFields(e.target.checked)
          if (!e.target.checked) {
            onSubmit({access_code: ''})
          }
        }} />
    </div>
    <hr className={css(tx.my3)} />
    <Choose>
      <When condition={showFields}>
        <div className={css(tx.px3)}>
          <div className={css(sx.input, tx.mb2)}>
            <Field
              component={Input}
              id='access_code'
              name='access_code'
              placeholder='Create Entry Code' />
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
            src={require(browser.lessThan.large ? 'theme/images/Settings.Code.jpg' : 'theme/images/Settings.Code.Text.jpg')} />
        </div>
      </Otherwise>
    </Choose>
  </form>
)
