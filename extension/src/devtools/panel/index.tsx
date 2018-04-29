import * as React from 'react'
import { render } from 'react-dom'
import { App } from './App'

const rootElement = document.querySelector('#root')
renderComponent(App, rootElement)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').App
    renderComponent(NextApp, rootElement)
  })
}

function renderComponent(Component: React.SFC<any>, container: Element) {
  render(<Component />, container)
}
