
import React from 'react'
import { withRouter } from 'react-router'
import tx from 'theme/utilities'
import { omit } from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { colors } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite/no-important'
import { deleteItem, createItem } from 'redux/modules/items/actions'

export const id = 'ItemControls'

const sx = StyleSheet.create({
  controls: {
    top: 0,
    right: 0,
    opacity: 0
  }
})

const enhance = compose(
  connect(() => ({}), { deleteItem, createItem }),
  withRouter
)

export default enhance(props => {
  const controls = [
    {
      children: require('react-icons/lib/io/ios-close-outline'),
      onClick: () => props.deleteItem(props.item)
    },
    {
      children: require('react-icons/lib/io/eye-disabled')
    },
    {
      children: require('react-icons/lib/io/ios-photos-outline'),
      onClick: () => props.createItem(omit(props.item, ['id']))
    },
    { children: require('react-icons/lib/io/arrow-move') },
    { children: require('react-icons/lib/io/gear-b'),
      onClick: () => props.push(`/tab/${props.item.tab_id}/items/item/${props.item.id}/edit`)
    }
  ]
  return <div id={id} className={css(tx.flex, tx.absolute, sx.controls)}>
    {controls.map(({ children, ...props }, key) =>
      <div key={key} className={css(tx.ml1, tx.cursorPointer)}>
        {React.createElement(children, {
          size: 22,
          color: colors.gray,
          ...props
        })}
      </div>
    )}
  </div>
})
