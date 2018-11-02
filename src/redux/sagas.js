
import { sagas as tabs } from 'redux/modules/tabs'
import { sagas as items } from 'redux/modules/items'
import { sagas as forms } from 'redux/modules/forms'
import { sagas as fields } from 'redux/modules/fields'
import { sagas as themes } from 'redux/modules/themes'
import { sagas as session } from 'redux/modules/session'
import { sagas as payments } from 'redux/modules/payments'
import { sagas as categories } from 'redux/modules/categories'

export default function* rootSaga () {
  yield [
    tabs(),
    items(),
    forms(),
    themes(),
    session(),
    payments(),
    categories(),
    fields(),
    session()
  ]
}
