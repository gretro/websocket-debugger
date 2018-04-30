import * as React from 'react'
import injectSheet, { JSSProps } from 'react-jss'
import { Theme } from '../theme'

interface Style {
  container: React.CSSProperties
  list: React.CSSProperties
  info: React.CSSProperties
}

const styles = (theme: Theme): Style => ({
  container: {
    display: 'grid',
    height: '100%',
    gridTemplateRows: '1fr 3rem',
    gridTemplateColumns: '1fr',
    gridTemplateAreas: '"list" "info"',
  },
  list: {
    gridArea: 'list',
  },
  info: {
    gridArea: 'info',
    backgroundColor: 'black',
    color: 'white',
  },
})

const Component = (props: JSSProps<Style>) => {
  return (
    <div className={props.classes.container}>
      <div className={props.classes.list}>LIST</div>
      <div className={props.classes.info}>INFO</div>
    </div>
  )
}

export const ConnectionList = injectSheet(styles)(Component)
