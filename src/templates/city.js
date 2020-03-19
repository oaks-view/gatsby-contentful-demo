import React from 'react'
import PropTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import SEO from '../components/SEO'
import theme from '../themes/theme'
import CMSLib from '../components/cms'
import Footer from '../components/Footer'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
  },
}))

const Section = ({ body }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Box>
  )
}

const CityTemplate = ({ pageContext }) => {
  const { lang, sections, title, description, pagePath } = pageContext

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO title={title} description={description} />
      <MDXProvider components={CMSLib}>
        {sections.map((body, i) => (
          <Section key={i} body={body} />
        ))}
      </MDXProvider>
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  )
}

CityTemplate.propTypes = {
  lang: PropTypes.string,
  sections: PropTypes.array,
}

export default CityTemplate
