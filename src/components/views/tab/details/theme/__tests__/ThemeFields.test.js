
import React from 'react'
import ThemeFields from '../ThemeFields'
import { render } from 'react-dom'
import { TestProvider } from 'helpers'
import { StyleSheetTestUtils } from 'aphrodite'

describe('view/details/theme/ThemeFields', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  })

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  })

  it('renders', () => {
    const div = document.createElement('div')
    const component = (
      <TestProvider>
        <ThemeFields
          meta={{}}
          themes={[]} />
      </TestProvider>
    )
    render(component, div)
  })
})
