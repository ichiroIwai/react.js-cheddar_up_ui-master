
import { connect } from 'react-redux'
import { reject } from 'lodash'
import { SortableTab } from 'views/tab/items'
import { updateItem } from 'redux/modules/items/actions'
import { default as React, PropTypes } from 'react'
import { mapProps, setPropTypes, setDisplayName, compose } from 'recompose'

const onSortEnd = ({oldIndex, newIndex, collection}) => {
  console.log(oldIndex, newIndex, collection)
}

const enhance = compose(
  setDisplayName('views/tab/items/ItemsList'),
  connect(
    ({
      items: { items },
      categories: { categories }
    }) => ({
      items,
      categories
    }),
    { updateItem }
  ),
  setPropTypes({
    tab: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  }),
  mapProps(props => ({
    ...props,
    uncategorizedItems: reject(props.items, 'parent_id')
  }))
)
export default enhance(({categories, uncategorizedItems, tab}) =>
  <SortableTab
    categories={categories}
    uncategorizedItems={uncategorizedItems}
    tab={tab}
    onSortEnd={onSortEnd}
    useDragHandle
  />
)
