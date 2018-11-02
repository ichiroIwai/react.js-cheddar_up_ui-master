
import * as cx from './constants'

export function getForms (payload) {
  return { type: cx.GET_FORMS, payload }
}

export function getForm (payload) {
  return { type: cx.GET_FORM, payload }
}

export function createForm (payload) {
  return { type: cx.CREATE_FORM, payload }
}

export function updateForm (payload) {
  return { type: cx.UPDATE_FORM, payload }
}

export function deleteForm (payload) {
  return { type: cx.DELETE_FORM, payload }
}

export function sortForms (payload) {
  return { type: cx.SORT_FORMS, payload }
}
