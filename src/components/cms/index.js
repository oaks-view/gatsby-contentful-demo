import React from 'react'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Tabs from './tabs'
import Tab from './tab'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import BoxImg from './BoxImg'

export const Row = ({ children, ...props }) => (
  <Grid container {...props}>
    {children}
  </Grid>
)

export const Col = ({ children, ...props }) => (
  <Grid item xs={12} sm {...props}>
    {children}
  </Grid>
)

const MvBox = ({ children, ...props }) => (
  <Box width="100%" {...props}>
    {children}
  </Box>
)

const useStylesTitle = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
}))

const Title = ({ children, className = '', ...props }) => {
  const classes = useStylesTitle(props)

  return (
    <Typography
      component="h1"
      variant="h5"
      color="primary"
      align="center"
      className={clsx(classes.root, className)}
      {...props}
    >
      {children}
    </Typography>
  )
}

const useStylesSubtitle = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
}))

const Subtitle = ({ children, className = '', ...props }) => {
  const classes = useStylesSubtitle(props)

  return (
    <Typography
      component="h2"
      variant="h5"
      color="primary"
      align="center"
      className={clsx(classes.root, className)}
      {...props}
    >
      {children}
    </Typography>
  )
}

// All custom elements allowed on Contentful editor besides native HTML elements
const Lib = {
  Box: MvBox,
  BoxImg,
  Row,
  Col,
  Box: MvBox,
  Tabs,
  Tab,
  Title,
  Subtitle,
}

export default Lib
