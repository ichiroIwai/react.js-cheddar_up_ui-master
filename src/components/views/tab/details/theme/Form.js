
import tx from 'theme/utilities'
import { Button } from 'elements'
import { connect } from 'react-redux'
import ThemeFields from './ThemeFields'
import { css } from 'aphrodite/no-important'
import { Field, reduxForm } from 'redux-form'
import { default as React, PropTypes } from 'react'
import { pure, mapProps, setPropTypes, setDisplayName, compose } from 'recompose'

const displayName = 'views/tab/details/theme/Form'

const enhance = compose(
  setDisplayName(displayName),
  connect(({ tabs: { tab }, themes: { themes } }) => ({ tab, themes })),
  mapProps(props => {
    const mapped = { ...props }
    if (props.tab) {
      mapped.initialValues = {
        theme_id: props.tab.theme_id
      }
    }
    return mapped
  }),
  reduxForm({
    form: displayName,
    validate (values) {
      const err = {}
      if (!values.theme_id) {
        err.theme_id = 'Please select a theme'
      }
      return err
    }
  }),
  setPropTypes({
    onSubmit: PropTypes.func.isRequired
  }),
  pure
)

export default enhance(({
  themes,
  onSubmit,
  handleSubmit
}) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name='theme_id'
      themes={themes}
      component={ThemeFields} />
    <div className={css(tx.p2)}>
      <Button backgroundColor='primary'>
        Apply Theme
      </Button>
    </div>
  </form>
)
