
import React from 'react'
import Page from '../Page'
import { render } from 'react-dom'
import { TestProvider } from 'helpers'
import { StyleSheetTestUtils } from 'aphrodite'

describe('view/details/theme/Page', () => {
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
        <Page />
      </TestProvider>
    )
    render(component, div)
  })
})
