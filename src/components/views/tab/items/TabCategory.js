
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Panel } from 'elements'
import { filter } from 'lodash'
import tx from 'theme/utilities'
import { mapProps, setDisplayName, compose, withState } from 'recompose'
import { SortableItems } from 'views/tab/items'
import { StyleSheet, css } from 'aphrodite/no-important'
import MinimizeIcon from 'react-icons/lib/io/minus'
import MaximizeIcon from 'react-icons/lib/io/plus'
import MoveIcon from 'react-icons/lib/io/arrow-move'
import CloseIcon from 'react-icons/lib/io/close-circled'
import SettingIcon from 'react-icons/lib/io/android-settings'
import LinkIcon from 'react-icons/lib/io/link'
import { colors, scale } from 'theme/constants'
import { deleteCategory } from 'redux/modules/categories/actions'

const sx = StyleSheet.create({
  category: {
    borderRadius: 0,
    height: scale[2],
    padding: `0 ${scale[1]}px`
  },
  title: {
    textTransform: 'uppercase'
  },
  control: {
    padding: `0 ${scale[0]}px`,
    color: colors.gray,
    [`:hover`]: {
      color: colors.darkGray
    }
  }
})

const enhance = compose(
  setDisplayName('views/tab/items/TabCategory'),
  withState('minimized', 'toggleMinimize', false),
  connect(
    ({ tabs: { tab }, items: { items } }) => ({ tab, items }),
    { deleteCategory }
  ),
  mapProps(props => ({
    ...props,
    items: filter(props.items, { parent_id: props.id })
  }))
)

export default enhance(({ tab, items, minimized, toggleMinimize, ...props }) => {
  return (
    <Panel>
      <div className={css(tx.flex, tx.backgroundColor_lightGray, tx.justifySpaceBetween, sx.category)}>
        <span className={css(tx.flex, tx.alignCenter, tx.justifyFlexStart)}>
          <a className={css(sx.control, tx.cursorPointer)} onClick={() => toggleMinimize(!minimized)} >
            <Choose>
              <When condition={minimized}>
                <MaximizeIcon />
              </When>
              <Otherwise>
                <MinimizeIcon />
              </Otherwise>
            </Choose>
          </a>
          <a href='#' className={css(sx.control)}>
            <LinkIcon />
          </a>
        </span>
        <span className={css(tx.flex, tx.alignCenter, tx.fontSize6, sx.title)}>
          {props.name} ({items.length})
        </span>
        <span className={css(tx.flex, tx.alignCenter, tx.justifyFlexEnd)}>
          <a href='#' className={css(sx.control)} onClick={() => props.deleteCategory({id: props.id, tab_id: tab.id})} >
            <CloseIcon />
          </a>
          <a href='#' className={css(sx.control)}>
            <MoveIcon />
          </a>
          <Link to={`/tab/${tab.id}/items/category/${props.id}/edit`} className={css(sx.control)}>
            <SettingIcon />
          </Link>
        </span>
      </div>
      <If condition={!minimized}>
        <SortableItems
          sortableOptions={props.sortableOptions}
          items={items}
          categoryId={props.id}
        />
      </If>
    </Panel>
  )
})
