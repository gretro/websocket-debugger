declare module 'react-jss' {
  import * as React from 'react'
  import jss from 'jss'

  export type JSSStyle = <TStyle>(theme: any) => TStyle
  export type Classes<T> = { [K in keyof (T)]: string }

  export interface JSSProps<TStyle> {
    classes: Classes<TStyle>
  }

  export type StylesProps<TStyle, TProps> = TProps & JSSProps<TStyle>

  export default function injectSheet<TStyle, TProps>(
    classes: JSSStyle<TStyle>,
  ): (
    Component: React.ComponentType<StylesProps<TStyle, TProps>>,
  ) => React.ComponentType<TProps>

  export type ThemeProviderProps = {
    theme: any
  }

  export const ThemeProvider: React.ComponentType<ThemeProviderProps> = props =>
    React.Component

  export type JSSProviderProps = {
    jss: typeof jss
  }

  export const JssProvider: React.ComponentType<JSSProviderProps> = props =>
    React.Component
}
