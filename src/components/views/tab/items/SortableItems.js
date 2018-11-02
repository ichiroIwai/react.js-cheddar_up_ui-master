
import React from 'react'
import tx from 'theme/utilities'
import { scale } from 'theme/constants'
import { StyleSheet, css } from 'aphrodite'
import { TabItem } from 'views/tab/items'
import { default as ReactSortable } from 'react-sortablejs'
import { setDisplayName, compose } from 'recompose'
import { connect } from 'react-redux'
import { sortItems } from 'redux/modules/items/actions'

const sx = StyleSheet.create({
  sortableEmpty: {
    padding: `${scale[2]}px 0 ${scale[2]}px 0`
  },
  sortable: {
    padding: scale[0]
  }
})

const enhance = compose(
  setDisplayName('views/tab/items/SortableItems'),
  connect(
    ({ tabs: { tab } }) => ({ tab }),
    { sortItems }
  )
)
export default enhance(({items, tab, categoryId, sortItems, sortableOptions}) =>
  <ReactSortable
    className={css(items.length === 0 ? sx.sortableEmpty : sx.sortable)}
    options={{
      ...sortableOptions,
      group: 'items'
    }}
    onChange={order =>
      sortItems({
        type: 'items',
        parent_id: categoryId,
        tab,
        order: order.map(i => i - 0)
      })
    }
  >
    {items.map((item, key) =>
      <div key={key} data-id={item.id} className={css(tx.mb1)}>
        <TabItem
          item={item}
          tab={tab}
        />
      </div>
    )}
  </ReactSortable>
)
