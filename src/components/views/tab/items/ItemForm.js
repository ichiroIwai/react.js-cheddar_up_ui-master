
import tx from 'theme/utilities'
import { get } from 'lodash'
import { connect } from 'react-redux'
import AmountFields from './AmountFields'
import SettingsField from './SettingsField'
import { Field, reduxForm } from 'redux-form'
import { default as React, PropTypes } from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import HelpIcon from 'react-icons/lib/io/ios-help-outline'
import { setPropTypes, setDisplayName, compose, withState, withHandlers } from 'recompose'
import { colors, breakpoints, borderColor, borderStyle, borderWidth } from 'theme/constants'
import { Status, QuestionForm, Tooltip, FileInput, AddImageIconText, Button, Input, Select } from 'elements'
import QuestionControl from 'views/tab/items/QuestionControl'

export const displayName = 'views/tab/items/ItemForm'
export const imageFieldName = 'image_file'

const settings = [
  { id: 'allow_quantity', name: 'allow_quantity', label: 'Show a quantity selector', tooltip: 'Let your participants select more than one of this item.' },
  { id: 'quantity_limit', name: 'quantity_limit', label: 'Set available quantity', tooltip: '"Sold out" will appear when all items are purchased.' },
  { id: 'required', name: 'required', label: 'Make item required', tooltip: 'Participants must select this item to proceed to checkout.' }
]

const sx = StyleSheet.create({
  itemNameInput: {
    width: 600,
    maxWidth: '100%'
  },
  img: {
    [`@media (min-width: ${breakpoints.medium}px)`]: {
      borderLeftColor: borderColor,
      borderLeftStyle: borderStyle,
      borderLeftWidth: borderWidth
    },
    [`@media (max-width: ${breakpoints.medium}px)`]: {
      borderTopColor: borderColor,
      borderTopStyle: borderStyle,
      borderTopWidth: borderWidth
    }
  },
  imgPreview: {
    maxWidth: '100%',
    maxHeight: 265
  },
  fullWidth: {
    width: '100%'
  }
})

const enhance = compose(
  setDisplayName(displayName),
  reduxForm({
    form: displayName,
    validate (values) {
      const err = {}
      if (!values.name) {
        err.name = 'Required'
      }
      if (typeof values.amount_type === 'undefined') {
        err.amount_type = 'Please select one'
      }
      return err
    }
  }),
  connect(({ items: { item, imageUpload }, form: { [displayName]: { values: { amount_type } } } }) => ({
    img: get(item, 'image.image_file.url', get(imageUpload, 'preview')),
    amountType: amount_type
  })),
  withState('questions', 'setQuestions', props => (props.initialQuestions ? props.initialQuestions.length : 0)),
  withState('questionsQueue', 'setQuestionsQueue', props => (props.initialQuestions ? props.initialQuestions : [])),
  setPropTypes({
    img: PropTypes.string,
    questions: PropTypes.number,
    setQuestions: PropTypes.func,
    showExactAmt: PropTypes.bool,
    shouldShowExactAmt: PropTypes.func,
    showTotalAvail: PropTypes.bool,
    shouldShowTotalAvail: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    initialQuestions: PropTypes.array
  }),
  withHandlers({
    preProcessSubmit: props => data => {
      props.onSubmit({
        ...data,
        questions: props.questionsQueue
      })
    },
    questionFormOnSubmit: props => data => {
      const queue = props.questionsQueue
      queue[data.idx] = data
      props.setQuestionsQueue(queue)
    },
    questionFormOnCancel: props => idx => {
      const queue = props.questionsQueue
      queue[idx]._resType = 'cancel'
      props.setQuestionsQueue(queue)
    }
  })
)

export default enhance(({
  setQuestions,
  questions,
  showExactAmt,
  shouldShowExactAmt,
  shouldShowTotalAvail,
  showTotalAvail,
  handleSubmit,
  onSubmit,
  questionsQueue,
  setQuestionsQueue,
  img,
  amountType,
  status,
  statusMessages,
  initialQuestions,
  deleteQuestion,
  preProcessSubmit,
  questionFormOnCancel,
  questionFormOnSubmit
}) =>
  <div>
    <div className={css(tx.borderBottom, tx.px2)}>
      <h2 className={css(tx.py2)}>
        Item Name and Amount
      </h2>
      <div className={css(tx.mb2)}>
        <div className={css(sx.itemNameInput, tx.mb3)}>
          <Field
            name='name'
            component={Input}
            placeholder='e.g., Group Gift, Class Party, Team Dues' />
        </div>
        <Field
          name='amount_type'
          component={AmountFields} />
      </div>
    </div>
    <div className={css(tx.borderBottom)}>
      <div className={css(tx.flex, tx.flexWrap)}>
        <div className={css(tx.col12, tx.col8lg, tx.col6xl, tx.pl2)}>
          <h4 className={css(tx.my2)}>
            Settings
          </h4>
          {settings.map(({ tooltip, ...setting }, key) =>
            <If condition={amountType !== 'open' || setting.id === 'required'}>
              <div
                key={key}
                className={css(tx.flex, tx.alignCenter, tx.my2)}>
                <div className={css(tx.mr0)}>
                  <Field
                    {...setting}
                    component={SettingsField} />
                </div>
                <Tooltip
                  text={tooltip}
                  style={{ width: 300, left: -141, top: -71 }}>
                  <HelpIcon color={colors.teal} />
                </Tooltip>
              </div>
            </If>
          )}
        </div>
        <div className={css(sx.img, tx.col12, tx.col4lg, tx.col6xl)}>
          <Field
            name={imageFieldName}
            component={FileInput}>
            <div className={css(tx.flex, tx.flexColumn, tx.justifyCenter, tx.alignCenter)}>
              <Choose>
                <When condition={img}>
                  <img
                    role='presentation'
                    src={img}
                    className={css(sx.imgPreview)} />
                </When>
                <Otherwise>
                  <AddImageIconText />
                </Otherwise>
              </Choose>
            </div>
          </Field>
        </div>
      </div>
    </div>
    {questionsQueue.map((qq, key) => {
      const resType = get(qq, '_resType', false)
      const actionType = get(qq, '_type', false)
      const { name, field_type: fieldType, options } = qq

      return (
        <Choose>
          <When condition={resType === 'in'}>
            <div key={key} className={css(tx.m2)}>
              <QuestionForm
                idx={key}
                initialValues={qq}
                onSubmit={questionFormOnSubmit}
                onCancel={questionFormOnCancel}
              />
            </div>
          </When>
          <When condition={actionType !== 'delete'}>
            <div
              key={key}
              className={css(tx.m2, tx.flex, tx.justifySpaceBetween)}>
              <div className={css(tx.flex, sx.fullWidth)}>
                <Choose>
                  <When condition={fieldType === 'multiple_choice' && options}>
                    <div className={css(tx.block, sx.fullWidth)}>
                      <Select
                        defaultValue='none'
                        options={[
                          { children: name, value: 'none' },
                          ...options
                        ]}
                      />
                    </div>
                  </When>
                  <Otherwise>
                    <input type='text' placeholder={name} readOnly />
                  </Otherwise>
                </Choose>
              </div>
              <QuestionControl
                onDelete={() => {
                  questionsQueue[key]._type = 'delete'
                  questionsQueue[key]._resType = 'done'
                  setQuestionsQueue(questionsQueue)
                }}
                onEdit={() => {
                  questionsQueue[key]._type = questionsQueue[key]._type === 'new' ? 'new' : 'edit'
                  questionsQueue[key]._resType = 'in'
                  setQuestionsQueue(questionsQueue)
                }}
              />
            </div>
          </When>
        </Choose>
      )
    })}

    <div className={css(tx.pt2, tx.px2)}>
      <Button
        small
        color='darkGray'
        backgroundColor='lightGray'
        onClick={() => {
          setQuestions(questions + 1)
          questionsQueue.push({
            idx: questions,
            field_type: 'text',
            name: '',
            required: false,
            _type: 'new',
            _resType: 'in'
          })
          setQuestionsQueue(questionsQueue)
        }}>
        Add Question
      </Button>
    </div>
    <div className={css(tx.p2, tx.mt2, tx.flex, tx.alignCenter)}>
      <Button
        type='button'
        backgroundColor='primary'
        onClick={handleSubmit(preProcessSubmit)}>
        Save Item
      </Button>
      <div className={css(tx.ml1)}>
        <Status
          messages={statusMessages}
          status={status} />
      </div>
    </div>
  </div>
)
