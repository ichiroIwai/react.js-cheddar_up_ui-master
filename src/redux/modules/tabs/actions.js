
import * as cx from './constants'

export const getTab = payload => ({ type: cx.GET_TAB, payload })
export const getTabs = payload => ({ type: cx.GET_TABS, payload })
export const createTab = payload => ({ type: cx.CREATE_TAB, payload })
export const updateTab = payload => ({ type: cx.UPDATE_TAB, payload })
