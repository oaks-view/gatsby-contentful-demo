import React from 'react'
import clsx from 'clsx'
import JsxParser from 'react-jsx-parser'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import SEO from '../components/seo'
import theme from '../themes/city'
import CMSLib from '../components/cms'
import Footer from '../components/CityFooter'

const useStylesPage = makeStyles(theme => ({
  home: {
    '& > main > div:first-child': {
      height: 400,
      flexDirection: 'row',
      alignItems: 'center',
      '& h2, & h3': {
        color: theme.palette.common.white,
        textShadow: '1px 1px 4px rgba(0, 0, 0, .5)',
      },
      '& h2': {
        fontSize: 40,
        paddingBottom: theme.spacing(2),
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    home: {
      '& > main > div:first-child': {
        height: 300,
      },
    },
  },
}))

const useStyles = makeStyles(theme => ({
  root: props => ({
    padding: theme.spacing(5, 0),
    ...(props.backgroundImage && {
      backgroundImage: `url('${props.backgroundImage.file.url}')`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }),
  }),
  title: props => ({}),
}))

const Section = props => {
  const classes = useStyles(props)
  const { slug, body } = props

  return (
    <Box id={slug} className={classes.root}>
      {body && (
        <Container maxWidth="md">
          <JsxParser components={{ ...CMSLib }} jsx={body.body} />
        </Container>
      )}
    </Box>
  )
}

const CustomTemplate = props => {
  const classes = useStylesPage()
  const page = props.data.contentfulPage

  // TODO add more SEO: image, url
  const { title, description: { description } = {} } = page

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO title={title} description={description} />
      {page.blocks.map((section, i) => (
        <Section key={i} {...section} />
      ))}
      <footer>
        <Footer />
      </footer>
    </ThemeProvider>
  )
}

CustomTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CustomTemplate

export const pageQuery = graphql`
  fragment section on ContentfulSection {
    name
    slug
    body {
      body
    }
    backgroundImage {
      file {
        url
      }
    }
  }

  query customQuery($id: String!, $locale: String!) {
    contentfulPage(id: { eq: $id }, blocks: { elemMatch: { node_locale: { eq: $locale } } }) {
      id
      title
      pathname
      description {
        description
      }
      template
      blocks {
        ...section
      }
    }
  }
`
