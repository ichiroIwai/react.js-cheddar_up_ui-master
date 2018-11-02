
import React from 'react'
import tx from 'theme/utilities'
import { setDisplayName, withState } from 'recompose'
import { BigRadioButton, Input } from 'elements'
import { StyleSheet, css } from 'aphrodite/no-important'

const sx = StyleSheet.create({
  settingItem: {
    height: 40
  },
  exactAmtInput: {
    width: 150,
    maxWidth: '100%'
  }
})

@setDisplayName('views/tab/items/SettingsField')
@withState('showExactAmt', 'shouldShowExactAmt', (props) => (typeof props.input.value === 'number'))
@withState('exactValue', 'setExactValue', (props) => (typeof props.input.value === 'number' ? props.input.value : 0))

export default class AmountField extends React.Component {
  render () {
    const {
      input,
      meta: { touched, error, warning },
      showExactAmt,
      shouldShowExactAmt,
      setExactValue,
      exactValue
    } = this.props

    return (
      <div>
        <div className={css(tx.mb2, tx.flex, tx.alignCenter)}>
          Each person should pay:
          <If condition={touched && (error || warning)}>
            <div className={css(tx.ml1, tx.fontSize6, tx[`color_${error ? 'error' : 'warning'}`])}>
              {error || warning}
            </div>
          </If>
        </div>
        <div className={css(tx.flex, tx.alignCenter, tx.my2, sx.settingItem)}>
          <BigRadioButton
            checked={input.value === 'open'}
            id='open-amount'
            name='amount'
            label='Any Amount (Donation)'
            onChange={() => {
              input.onChange('open')
              shouldShowExactAmt(false)
            }} />
        </div>
        <div className={css(tx.flex, tx.alignCenter, tx.my2, sx.settingItem)}>
          <BigRadioButton
            checked={typeof input.value === 'number'}
            id='exact-amount'
            name='amount'
            label='Exact Amount'
            onChange={() => {
              input.onChange(exactValue - 0)
              shouldShowExactAmt(true)
            }} />
          <If condition={showExactAmt}>
            <Input
              placeholder='$0'
              name='exact-amount-value'
              onChange={({ target: { value } }) => {
                setExactValue(value, () => {
                  input.onChange(value - 0)
                })
              }}
              className={css(sx.exactAmtInput, tx.ml1)}
              value={exactValue}
            />
          </If>
        </div>
      </div>
    )
  }
}
