
import React from 'react'
import shortid from 'shortid'
import { get, isEmpty, range } from 'lodash'
import tx from 'theme/utilities'
import { colors } from 'theme/constants'
import { Input, Button, Checkbox, Select } from 'elements'
import { StyleSheet, css } from 'aphrodite'
import PlusIcon from 'react-icons/lib/io/plus-circled'
import MinusIcon from 'react-icons/lib/io/minus-circled'
import { reduxForm, Field } from 'redux-form'
import { mapProps, setDisplayName, compose, withState, withHandlers } from 'recompose'
import { default as Controls, className as controlsClassName } from './Controls'

const types = [
  { children: 'Open Text', value: 'text' },
  { children: 'Multiple Choice', value: 'multiple_choice' }
]

const sx = StyleSheet.create({
  container: {
    [`:hover .${controlsClassName} > div`]: {
      opacity: 1
    }
  },
  select: {
    width: 300
  }
})

const displayName = 'views/tab/items/add-item/QuestionForm'

const enhance = compose(
  setDisplayName(displayName),
  withState('questionType', 'setQuestionType', (props) => get(props.initialValues, 'field_type', 'text')),
  withState('multipleChoiceInputs', 'setMultipleChoiceInputs', (props) => get(props.initialValues, 'options.length', 1)),
  withState('multipleChoiceOptions', 'setMultipleChoiceOptions', (props) => {
    const options = get(props.initialValues, 'options', [])
    const mcoptions = {}
    options.forEach(o => { mcoptions[o.value] = o.children })
    return mcoptions
  }),
  mapProps(props => ({
    ...props,
    form: `${displayName}-${props.idx}`
  })),
  reduxForm({
    validate (values, props) {
      const err = {}
      if (!values['name']) {
        err['name'] = 'Required'
      }
      return err
    }
  }),
  withHandlers({
    handleDelete: props => () => {
      props.onCancel(props.idx)
    },
    preProcessSubmit: props => formData => {
      const data = {
        ...formData,
        idx: props.idx,
        field_type: props.questionType,
        _type: props.initialValues._type,
        _resType: 'done'
      }

      if (!isEmpty(props.multipleChoiceOptions)) {
        data.options = Object.keys(props.multipleChoiceOptions).map(i => ({
          value: i,
          children: props.multipleChoiceOptions[i]
        }))
      }
      props.onSubmit(data)
    }
  })
)

export default enhance(({
  setQuestionType,
  questionType,
  multipleChoiceInputs,
  setMultipleChoiceInputs,
  setMultipleChoiceOptions,
  multipleChoiceOptions,
  handleSubmit,
  onSubmit,
  onCancel,
  initialValues,
  idx,
  handleDelete,
  preProcessSubmit
}) =>
  <div className={css(tx.backgroundColor_lighterGray, tx.p2, tx.borderRadius, sx.container)}>
    <div className={css(tx.flex, tx.justifySpaceBetween, tx.relative)}>
      <div className={css(sx.select, tx.mb2)}>
        <Field
          name='field_type'
          options={types}
          component={Select}
          input={{ onChange: e => setQuestionType(e.target.value), value: questionType }}
        />
      </div>
      <Controls onDelete={handleDelete} />
    </div>
    <Field
      name='name'
      component={Input}
      className={css(tx.mb2)}
      placeholder='Enter a question' />
    <If condition={questionType === 'multiple_choice'}>
      {range(multipleChoiceInputs).map(i =>
        <div
          key={i}
          className={css(tx.flex, tx.mb2)}>
          <div className={css(tx.col10, tx.col11xl)}>
            <input
              type='text'
              placeholder='Choice'
              onChange={e => {
                setMultipleChoiceOptions({
                  ...multipleChoiceOptions,
                  [i]: e.target.value
                })
              }}
              value={multipleChoiceOptions[i]}
            />
          </div>
          <div className={css(tx.pl1, tx.col2, tx.col1xl, tx.flex, tx.alignCenter, tx.justifySpaceAround)}>
            <PlusIcon
              color={colors.teal}
              onClick={() => {
                if (multipleChoiceOptions[i]) {
                  setMultipleChoiceInputs(multipleChoiceInputs + 1)
                }
              }} />
            <MinusIcon
              color={colors.teal}
              onClick={() => setMultipleChoiceInputs(
                multipleChoiceInputs > 1 ? multipleChoiceInputs - 1 : 1
              )} />
          </div>
        </div>
      )}
    </If>
    <div className={css(tx.mb2)}>
      <Field
        id={shortid.generate()}
        name='required'
        component={Checkbox}
        defaultChecked={initialValues.required}
        label='Make answer required' />
    </div>
    <Button
      small
      type='button'
      backgroundColor='teal'
      onClick={handleSubmit(preProcessSubmit)}>
      Done
    </Button>
  </div>
)
