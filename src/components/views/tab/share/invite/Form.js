
import React from 'react'
import { Button } from 'elements'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite/no-important'
import tx from 'theme/utilities'
import { Field, reduxForm } from 'redux-form'
import { compose, pure, setDisplayName } from 'recompose'

const displayName = 'views/tab/share/invite/Form'

const enhance = compose(
  setDisplayName(displayName),
  reduxForm({
    form: displayName
  }),
  pure
)

export default enhance(({ handleSubmit, onSubmit }) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className={css(tx.mb2)}>
      <Field
        name='emails'
        component='textarea'
        placeholder='Enter emails or copy and paste from Excel' />
      <Link to='/'>
        Send me a test
      </Link>
    </div>
    <Button backgroundColor='primary'>
      Send
    </Button>
  </form>
)
