import * as React from 'react'
import injectSheet, { JSSProps } from 'react-jss'
import { Theme } from './theme'
import { ConnectionList } from './ConnectionList/ConnectionList'

interface Style {
  container: React.CSSProperties
  left: React.CSSProperties
  right: React.CSSProperties
}

const styles = (theme: Theme): Style => ({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.colors.background,
    display: 'grid',
    gridTemplateColumns: '30rem 1fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: '"left right"',
  },
  left: {
    gridArea: 'left',
    backgroundColor: 'red',
  },
  right: {
    gridArea: 'right',
    backgroundColor: 'blue',
  },
})

export const Container = (props: JSSProps<Style>) => {
  return (
    <div className={props.classes.container}>
      <div className={props.classes.left}>
        <ConnectionList />
      </div>
      <div className={props.classes.right} />
    </div>
  )
}

export const App = injectSheet(styles)(Container)
