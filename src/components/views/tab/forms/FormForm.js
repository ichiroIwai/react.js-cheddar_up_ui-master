
import React from 'react'
import tx from 'theme/utilities'
import { range } from 'lodash'
import { QuestionForm, Input, Button } from 'elements'
import { Field, reduxForm } from 'redux-form'
import { StyleSheet, css } from 'aphrodite/no-important'
import { withState, pure, compose, setDisplayName } from 'recompose'
import { borderWidth, borderStyle, borderColor } from 'theme/constants'

const sx = StyleSheet.create({
  nameInput: {
    maxWidth: 600
  },
  form: {
    borderBottomWidth: borderWidth,
    borderBottomStyle: borderStyle,
    borderBottomColor: borderColor
  }
})

const displayName = 'views/tab/forms/Form'

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
  withState('questions', 'setQuestions', 0),
  withState('questionsQueue', 'setQuestionsQueue', []),
  pure
)

export default enhance(({
  handleSubmit,
  onSubmit,
  setQuestions,
  questions,
  questionsQueue,
  setQuestionsQueue
}) =>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className={css(sx.form, tx.px2, tx.pt3)}>
      <div className={css(sx.nameInput)}>
        <Field
          name='name'
          component={Input}
          className={css(tx.mb2)}
          placeholder='Form Name: (required)' />
      </div>
    </div>
    <div className={css(tx.p2)}>
      <Button
        small
        color='darkGray'
        backgroundColor='lightGray'
        onClick={() => setQuestions(questions + 1)}>
        Add Question
      </Button>

      {range(questions).map(i => {
        if (questionsQueue[i]) {
          return null
        }

        return (
          <div key={i} className={css(tx.mt2)}>
            <QuestionForm
              idx={i}
              onSubmit={data => {
                const queue = questionsQueue
                queue[data.idx] = data
                setQuestionsQueue(queue)
              }} />
          </div>
        )
      })}
    </div>
    <div className={css(tx.p2)}>
      <Button backgroundColor='primary'>
        Save Form
      </Button>
    </div>
  </form>
)
