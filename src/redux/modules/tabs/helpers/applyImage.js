
import { get } from 'lodash'

export default (tab = {}) => {
  tab.image = get(tab, 'images[0]', null)
  return tab
}
