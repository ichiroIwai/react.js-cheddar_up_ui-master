
import React from 'react'
import TabItem from '../TabItem'
import { render } from 'react-dom'
import { TestProvider } from 'helpers'
import { StyleSheetTestUtils } from 'aphrodite'

describe('views/items/TabItem', () => {
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
        <TabItem tab={{}} item={{}} />
      </TestProvider>
    )
    render(component, div)
  })
})
