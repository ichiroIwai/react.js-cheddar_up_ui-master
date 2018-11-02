
import { get } from 'lodash'

// Get the path to a tab's image.

export default (tab = {}) => {
  if (get(tab, 'image.preview', '').indexOf('blob:') > -1) {
    return tab.image.preview
  }

  return get(tab, 'image.file_name.url')
}
