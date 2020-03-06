import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import SEO from '../components/seo'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import theme from '../themes/city'
import { getBlockComponent } from '../utils'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  main: {
    '& > div': {
      width: '100%',
      padding: theme.spacing(5, 0),
    },
    '& > div:nth-child(even)': {
      backgroundColor: '#F8F9FB',
    },
  },
}))

const CommonTemplate = props => {
  const classes = useStyles()

  const { blocks } = props
  const Header = props.header
  const Footer = props.footer

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO title={props.title} />
      <Box className={`${classes.root} ${props.className}`}>
        {Header && <Header />}
        <main className={classes.main}>
          {blocks.map((block, i) => {
            const { BlockComponent } = getBlockComponent(block)
            return <BlockComponent {...block} key={`b-${i}`} parentBlock={true} />
          })}
        </main>
      </Box>
      {Footer && (
        <footer>
          <Footer />
        </footer>
      )}
    </ThemeProvider>
  )
}

CommonTemplate.propTypes = {
  blocks: PropTypes.array,
  title: PropTypes.string.isRequired,
  header: PropTypes.elementType,
  footer: PropTypes.elementType,
}

export default CommonTemplate
