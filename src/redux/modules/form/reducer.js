
import * as cx from './constants'
import { findIndex, sortBy, reject } from 'lodash'
import { success } from 'redux/modules/async/helpers'
import { LOCATION_CHANGE } from '@bentatum/react-router-redux'
import { CHANGE as FORM_CHANGE } from 'redux-form/lib/actionTypes'
import { displayName as addItemForm, imageFieldName as addItemImageFieldName } from 'views/tab/forms/ItemForm'

const initialState = {
  forms: [],
  form: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_FORMS):
      return {
        ...state,
        forms: sortBy(action.payload.forms, ['position'])
      }
    case success(cx.GET_FORM):
      return {
        ...state,
        form: action.payload.form
      }
    case success(cx.CREATE_FORM): {
      const { form } = action.payload
      const { forms } = state
      forms.push(form)
      return {
        ...state,
        forms
      }
    }
    case success(cx.UPDATE_FORM):
      const { form } = action.payload
      const { forms } = state
      const idx = findIndex(forms, { id: form.id })
      forms.splice(idx, 1, form)
      return {
        ...state,
        forms: sortBy(forms, ['position'])
      }
    case success(cx.DELETE_FORM): {
      const { formId } = action.payload
      const { forms } = state

      return {
        ...state,
        forms: reject(forms, (o) => (o.id === formId))
      }
    }
    case LOCATION_CHANGE:
      return {
        ...state,
        form: null
      }
    case cx.SORT_FORMS: {
      const { order } = action.payload
      const forms = state.forms.map(form => {
        const index = order.indexOf(form.id)
        if (index < 0) {
          return form
        }
        form.parent_id = action.payload.parent_id
        form.position = index
        return form
      })
      return {
        ...state,
        forms: sortBy(forms, ['position'])
      }
    }
    default:
      return state
  }
}
