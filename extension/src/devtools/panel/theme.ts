import { remUnits } from './default-units'

export const theme = {
  colors: {
    text: '#000',
    background: '#fff',
  },
}

export type Theme = typeof theme

export const globalStyle = {
  '@global': {
    html: {
      boxSizing: 'border-box',
      fontSize: '62.5%',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      fontSize: 1.6,
      lineHeight: 1.5,
    },
  },
}

export const presetOptions = {
  defaultUnit: remUnits,
}
