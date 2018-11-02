
import React from 'react'
import tx from 'theme/utilities'
import { Field, reduxForm } from 'redux-form'
import { css } from 'aphrodite/no-important'
import { Input, Button } from 'elements'
import { pure, compose, setDisplayName } from 'recompose'

const displayName = 'views/tab/items/create-category/Form'

const enhance = compose(
  setDisplayName(displayName),
  reduxForm({
    form: displayName,
    validate (values) {
      const errors = {}
      if (!values.name) {
        return 'Name is required'
      }
      return errors
    }
  }),
  pure
)

export default enhance(({ handleSubmit, formType, onSubmit }) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <h2 className={css(tx.py2)}>
      { formType === 'Edit' ? 'Edit' : 'Create' } a Category
    </h2>
    <h3 className={css(tx.mb2)}>
      { formType === 'Edit' ? 'Edit' : 'Add' } a category header and drag into place on your item list.
    </h3>
    <Field
      name='name'
      component={Input}
      className={css(tx.mb2)}
      placeholder='Category Name' />
    <Button backgroundColor='primary'>
      Save Category
    </Button>
  </form>
)
