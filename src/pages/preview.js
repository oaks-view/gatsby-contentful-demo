import React from 'react'
import { Router } from '@reach/router'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import PreviewWrapper from '../components/PreviewWrapper'
import ContentfulAction from '../components/types/ContentfulAction'
import ContentfulCard from '../components/types/ContentfulCard'
import ContentfulSection from '../components/types/ContentfulSection'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}))

// only considering the theme for city template
// TODO use a more generic one once we have more templates
import theme from '../themes/city'

const types = [
  { type: 'action', component: ContentfulAction },
  { type: 'card', component: ContentfulCard },
  { type: 'section', component: ContentfulSection },
]

const Preview = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Router basepath="/preview">
          {types.map(({ type, component }, i) => (
            <PreviewWrapper
              key={i}
              path={`${type}/:entryId`}
              type={type}
              component={component}
            />
          ))}
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default Preview
