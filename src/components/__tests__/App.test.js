
import React from 'react'
import { render } from 'react-dom'
import App from '../App'
import { TestProvider } from 'helpers'

it('renders without crashing', () => {
  render(
    <TestProvider>
      <App />
    </TestProvider>,
    document.createElement('div')
  )
})
