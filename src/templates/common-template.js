import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import SEO from '../components/seo'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

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
  const { previewBlock = false } = props

  let renderComponent = () => {
    if (previewBlock) {
      return (
        <Box className={`${classes.root} ${props.className}`}>
          <Container maxWidth="md">{props.children}</Container>
        </Box>
      )
    } else {
      const Header = props.header
      const Footer = props.footer
      return (
        <>
          <SEO title={props.title} />
          <Box className={`${classes.root} ${props.className}`}>
            {Header && <Header />}
            <main className={classes.main}>
              {props.blocks.map((block, i) => {
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
        </>
      )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderComponent()}
    </ThemeProvider>
  )
}

CommonTemplate.propTypes = {
  blocks: PropTypes.array,
  title: PropTypes.string.isRequired,
  header: PropTypes.elementType,
  footer: PropTypes.elementType,
  previewBlock: PropTypes.bool,
}

export default CommonTemplate
