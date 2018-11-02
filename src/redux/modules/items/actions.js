
import * as cx from './constants'

export function getItems (payload) {
  return { type: cx.GET_ITEMS, payload }
}

export function getItem (payload) {
  return { type: cx.GET_ITEM, payload }
}

export function createItem (payload) {
  return { type: cx.CREATE_ITEM, payload }
}

export function updateItem (payload) {
  return { type: cx.UPDATE_ITEM, payload }
}

export function deleteItem (payload) {
  return { type: cx.DELETE_ITEM, payload }
}

export function sortItems (payload) {
  return { type: cx.SORT_ITEMS, payload }
}
