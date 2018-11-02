
import React from 'react'
import tx from 'theme/utilities'
import { SwitchBox } from 'elements'
import { css, StyleSheet } from 'aphrodite/no-important'
import { setDisplayName, withState } from 'recompose'

const sx = StyleSheet.create({
  exactAmtInput: {
    width: 150,
    maxWidth: '100%'
  },
  settingItem: {
    height: 40
  }
})

@setDisplayName('views/tab/items/SettingsField')
@withState('showQtyLimit', 'shouldShowQtyLimit', (props) => (props.input.name === 'quantity_limit' && typeof props.input.value === 'number'))
@withState('qtyLimit', 'setQtyLimit', (props) => ((props.input.name === 'quantity_limit' && typeof props.input.value === 'number') ? props.input.value : '0'))

export default class SettingsField extends React.Component {
  render () {
    const {
      input,
      showQtyLimit,
      shouldShowQtyLimit,
      setQtyLimit,
      qtyLimit,
      ...props
    } = this.props

    return (
      <div className={css(tx.flex, tx.alignCenter, sx.settingItem)}>
        <SwitchBox
          input={input}
          onChange={({ target: { checked } }) => {
            if (input.name === 'quantity_limit') {
              shouldShowQtyLimit(checked)
              return input.onChange(!checked ? 0 : qtyLimit)
            }
            input.onChange(checked)
          }}
          {...props} />
        <If condition={showQtyLimit && input.name === 'quantity_limit'}>
          <div className={css(tx.ml2)}>
            <input
              type='text'
              placeholder='Total Available'
              className={css(sx.exactAmtInput)}
              onChange={e => {
                const value = e.target.value
                setQtyLimit(value - 0)
                input.onChange(value - 0)
              }} value={qtyLimit} />
          </div>
        </If>
      </div>
    )
  }
}
