
import { StyleSheet } from 'aphrodite/no-important'

export const GLOBALS = 'cheddarUp/globalStyles'

const globalExtension = {
  selectorHandler: (selector, baseSelector, generateSubtreeStyles) =>
    baseSelector.includes(GLOBALS) ? generateSubtreeStyles(selector) : null
}

export default StyleSheet.extend([globalExtension])
