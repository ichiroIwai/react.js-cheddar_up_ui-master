
import React from 'react'
import tx from 'theme/utilities'
import { TabCategory, SortableItems } from 'views/tab/items'
import { default as ReactSortable } from 'react-sortablejs'
import { setDisplayName, compose } from 'recompose'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite/no-important'
import { sortCategories } from 'redux/modules/categories/actions'
import { colors } from 'theme/constants'

const sx = StyleSheet.create({
  ghost: {
    opacity: 0.4
  },
  drag: {
    backgroundColor: colors.lightAqua
  }
})

const enhance = compose(
  setDisplayName('views/tab/items/SortableTab'),
  connect(
    ({ tabs: { tab } }) => ({ tab }),
    { sortCategories }
  )
)
const sortableOptions = {
  ghostClass: css(sx.ghost),
  dragClass: css(sx.drag)
}
export default enhance(({categories, uncategorizedItems, tab, sortCategories}) =>
  <div>
    <ReactSortable
      options={{
        ...sortableOptions,
        delay: 50,
        group: 'categories'
      }}
      onChange={order =>
        sortCategories({
          type: 'categories',
          tab,
          order: order.map(i => i - 0)
        })
      }
    >
      {categories.map((category, key) =>
        <div key={key} data-id={category.id} className={css(tx.mb1)}>
          <TabCategory
            {...category}
            sortableOptions={sortableOptions}
            ghostClass={css(sx.ghost)}
            tab={tab}
          />
        </div>
      )}
    </ReactSortable>
    <SortableItems
      sortableOptions={sortableOptions}
      items={uncategorizedItems}
    />
  </div>
)
