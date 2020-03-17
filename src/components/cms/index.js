import React from 'react'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Link as GatsbyLink } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'

import Section from './Section'
import BoxImg from './BoxImg'
import icons from './Icon'
import tabs from './Tabs'

export const Row = ({ children, ...props }) => (
  <Grid container spacing={2} {...props}>
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

const useStylesImg = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
  },
}))

const Image = ({ src, className = '', ...props }) => {
  const classes = useStylesImg()
  return <img src={src} className={clsx(classes.root, className)} {...props} />
}

// https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links
const MvLink = ({ href, children, activeClassName, partiallyActive, ...other }) => {
  // start with exact one slash, anything else is external
  const internal = /^\/(?!\/)/.test(href)
  const props = internal
    ? { to: href, activeClassName, partiallyActive, component: GatsbyLink, ...other }
    : { href, ...other }

  console.log(props)
  return <Link {...props}>{children}</Link>
}

// All custom elements allowed on Contentful editor besides native HTML elements
const Lib = {
  Box: MvBox,
  BoxImg,
  Row,
  Col,
  Title,
  Subtitle,
  Image,
  Section,
  Link: MvLink,
  ...tabs,
  ...icons,
}

export default Lib
