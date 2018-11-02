
import * as cx from './constants'
import { findIndex, sortBy, reject } from 'lodash'
import { success } from 'redux/modules/async/helpers'

const initialState = {
  categories: [],
  category: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_CATEGORIES):
      return {
        ...state,
        categories: sortBy(action.payload.categories, ['position'])
      }
    case success(cx.GET_CATEGORY):
      return {
        ...state,
        category: action.payload.category
      }
    case cx.CREATE_CATEGORY_SUCCESS: {
      const { category } = action.payload
      const { categories } = state
      categories.unshift(category)
      return {
        ...state,
        categories: sortBy(categories, ['position'])
      }
    }
    case cx.UPDATE_CATEGORY_SUCCESS:
      const { category } = action.payload
      const { categories } = state
      const idx1 = findIndex(categories, { id: category.id })
      categories.splice(idx1, 1, category)
      return {
        ...state,
        categories: sortBy(categories, ['position'])
      }
    case cx.DELETE_CATEGORY_SUCCESS: {
      const { categoryId } = action.payload
      const { categories } = state

      return {
        ...state,
        categories: reject(categories, (o) => (o.id === categoryId))
      }
    }
    case cx.SORT_CATEGORIES: {
      const { order } = action.payload
      const { categories } = state
      categories.forEach(category => {
        category.position = order.indexOf(category.id)
      })
      return {
        ...state,
        categories: sortBy(categories, ['position'])
      }
    }
    default:
      return state
  }
}
