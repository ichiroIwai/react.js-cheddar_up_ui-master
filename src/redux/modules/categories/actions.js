
import * as cx from './constants'

export function getCategories (payload) {
  return { type: cx.GET_CATEGORIES, payload }
}

export function getCategory (payload) {
  return { type: cx.GET_CATEGORY, payload }
}

export function createCategory (payload) {
  return { type: cx.CREATE_CATEGORY, payload }
}

export function updateCategory (payload) {
  return { type: cx.UPDATE_CATEGORY, payload }
}

export function deleteCategory (payload) {
  return { type: cx.DELETE_CATEGORY, payload }
}

export function sortCategories (payload) {
  return { type: cx.SORT_CATEGORIES, payload }
}
