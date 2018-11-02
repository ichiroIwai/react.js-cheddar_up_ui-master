
import { combineReducers } from 'redux'
import { breakpoints } from 'theme/constants'
import { reducer as formReducer } from 'redux-form'
import { reducer as tabs } from 'redux/modules/tabs'
import { reducer as categories } from 'redux/modules/categories'
import { reducer as items } from 'redux/modules/items'
import { reducer as forms } from 'redux/modules/forms'
import { reducer as fields } from 'redux/modules/fields'
import { reducer as async } from 'redux/modules/async'
import { reducer as themes } from 'redux/modules/themes'
import { reducer as session } from 'redux/modules/session'
import { routerReducer } from '@bentatum/react-router-redux'
import { createResponsiveStateReducer } from 'redux-responsive'
import { reducer as drawerMenu } from 'redux/modules/drawerMenu'
import { reducer as payments } from 'redux/modules/payments'

export default combineReducers({
  tabs,
  async,
  categories,
  items,
  forms,
  themes,
  session,
  payments,
  fields,
  drawerMenu,
  form: formReducer,
  router: routerReducer,
  browser: createResponsiveStateReducer(breakpoints)
})
