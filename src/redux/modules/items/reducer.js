
import * as cx from './constants'
import { findIndex, sortBy, reject } from 'lodash'
import { success } from 'redux/modules/async/helpers'
import { LOCATION_CHANGE } from '@bentatum/react-router-redux'
import { CHANGE as FORM_CHANGE } from 'redux-form/lib/actionTypes'
import { displayName as addItemForm, imageFieldName as addItemImageFieldName } from 'views/tab/items/ItemForm'

const initialState = {
  items: [],
  item: null,
  imageUpload: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_ITEMS):
      return {
        ...state,
        items: sortBy(action.payload.items, ['position'])
      }
    case success(cx.GET_ITEM):
      return {
        ...state,
        item: action.payload.item
      }
    case cx.CREATE_ITEM_SUCCESS: {
      const { item } = action.payload
      const { items } = state
      items.push(item)
      return {
        ...state,
        items
      }
    }
    case cx.UPDATE_ITEM_SUCCESS:
      const { item } = action.payload
      const { items } = state
      const idx = findIndex(items, { id: item.id })
      items.splice(idx, 1, item)
      return {
        ...state,
        items: sortBy(items, ['position'])
      }
    case cx.DELETE_ITEM_SUCCESS: {
      const { itemId } = action.payload
      const { items } = state

      return {
        ...state,
        items: reject(items, (o) => (o.id === itemId))
      }
    }
    case LOCATION_CHANGE:
      return {
        ...state,
        item: null
      }
    case FORM_CHANGE: {
      const { form, field } = action.meta
      if (form === addItemForm &&
        field === addItemImageFieldName) {
        return {
          ...state,
          imageUpload: action.payload
        }
      }
      return state
    }
    case cx.SORT_ITEMS: {
      const { order } = action.payload
      const items = state.items.map(item => {
        const index = order.indexOf(item.id)
        if (index < 0) {
          return item
        }
        item.parent_id = action.payload.parent_id
        item.position = index
        return item
      })
      return {
        ...state,
        items: sortBy(items, ['position'])
      }
    }
    default:
      return state
  }
}
