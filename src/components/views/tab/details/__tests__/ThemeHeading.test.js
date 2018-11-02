
import React from 'react'
import ThemeHeading from '../ThemeHeading'
import { render } from 'react-dom'
import { TestProvider } from 'helpers'
import { StyleSheetTestUtils } from 'aphrodite'

describe('view/details/ThemeHeading', () => {
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
        <ThemeHeading onSubmit={() => 'noop'} />
      </TestProvider>
    )
    render(component, div)
  })
})
