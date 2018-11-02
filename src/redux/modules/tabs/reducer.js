
import * as cx from './constants'
import { success } from 'redux/modules/async/helpers'
import { applyImage } from 'redux/modules/tabs/helpers'
import { get, indexOf, compact, map, uniqBy } from 'lodash'
import { LOCATION_CHANGE } from '@bentatum/react-router-redux'
import { CHANGE as FORM_CHANGE } from 'redux-form/lib/actionTypes'
import { displayName as tabDetailsForm } from 'views/tab/details/Form'
import { displayName as makeItExclusiveForm } from 'views/tab/settings/make-it-exclusive/Form'

const initialState = {
  tab: null,
  tabs: [],
  imageId: null, // we keep a reference to the imageId for the api.
  folders: [],
  tabIsNew: true // we redirect the user only when the tab is new.
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_TAB): {
      const { tab } = action.payload
      return {
        ...state,
        tabIsNew: false,
        tab: applyImage(tab),
        imageId: get(tab, 'images[0].id', null)
      }
    }
    case success(cx.GET_TABS): {
      const { tabs } = action.payload
      const folders = uniqBy(compact(map(tabs, 'folder')), 'id')
      return {
        ...state,
        ...action.payload,
        folders
      }
    }
    case success(cx.CREATE_TAB): {
      const { tab } = action.payload
      const { tabs } = state
      tabs.unshift(tab)
      return {
        ...state,
        tab: applyImage(tab),
        tabs
      }
    }
    case success(cx.UPDATE_TAB):
      const { tab } = action.payload
      const { imageId, tabs } = state
      const idx = indexOf(tabs, { id: tab.id })
      tabs.splice(idx, 1, tab)
      return {
        ...state,
        tabs,
        imageId,
        tabIsNew: false,
        tab: applyImage(tab)
      }
    case LOCATION_CHANGE: {
      // clear the tab when we leave the dashboard
      const { pathname } = action.payload.location
      if (pathname.indexOf('/tab/') === -1) {
        return {
          ...state,
          tab: null,
          tabIsNew: true
        }
      }
      return state
    }
    case FORM_CHANGE: {
      const { tab } = state
      const { form, field } = action.meta
      switch (form) {
        case tabDetailsForm:
        case makeItExclusiveForm:
          return {
            ...state,
            tab: {
              ...tab,
              [field]: action.payload
            }
          }
        default:
          return state
      }
    }
    default:
      return state
  }
}
