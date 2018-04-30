import * as React from 'react'
import { render } from 'react-dom'
import * as JSS from 'jss'
import { JssProvider, ThemeProvider } from 'react-jss'
const preset = require('jss-preset-default').default
const normalize = require('normalize-jss')

import { App } from './App'
import * as Theme from './theme'

const jss = JSS.create()
jss.setup(preset(Theme.presetOptions))
jss.createStyleSheet(normalize, { meta: 'normalize' }).attach()
let globalStylesheet = attachGlobalStyles(Theme.globalStyle)

const rootElement = document.querySelector('#root')
renderComponent(App, rootElement, Theme.theme)

if (module.hot) {
  module.hot.accept(['./App', './theme'], () => {
    const NextApp = require('./App').App
    const NextThemeModule = require<typeof Theme>('./theme')

    if (globalStylesheet) {
      globalStylesheet.detach()
      globalStylesheet = attachGlobalStyles(NextThemeModule.globalStyle)
    }

    renderComponent(NextApp, rootElement, NextThemeModule.theme)
  })
}

function attachGlobalStyles(globalStyles: any) {
  const style = jss.createStyleSheet(globalStyles, { meta: 'global-styles' })
  return style.attach()
}

function renderComponent(Component: React.ComponentType, container: Element, theme: any) {
  const appRoot = (
    <JssProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </JssProvider>
  )

  render(appRoot, container)
}
