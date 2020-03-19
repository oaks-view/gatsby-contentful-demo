import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import SEO from '../components/SEO'
import theme from '../themes/theme'
import CMSLib from '../components/cms'
import Footer from '../components/Footer'
import { SectionContext } from '../context'

const useStyles = makeStyles(theme => ({
  root: props => ({
    padding: theme.spacing(5, 0),
    ...(props.backgroundImage && {
      backgroundImage: `url('${props.backgroundImage.file.url}')`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }),
  }),
}))

const RootSection = props => {
  const classes = useStyles(props)
  const { slug, body } = props

  return (
    <Box id={slug} className={classes.root}>
      {body && (
        <Container maxWidth="md">
          <MDXRenderer>{body.childMdx.body}</MDXRenderer>
        </Container>
      )}
    </Box>
  )
}

const CustomTemplate = props => {
  const page = props.data.contentfulPage

  // TODO add more SEO: image, url
  const { title, description: { description } = {} } = page

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO title={title} description={description} />
      <MDXProvider components={CMSLib}>
        {page.blocks.map((section, i) => (
          <SectionContext.Provider key={i} value={section}>
            <RootSection {...section} />
          </SectionContext.Provider>
        ))}
      </MDXProvider>
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
  fragment sectionFields on ContentfulSection {
    name
    slug
    body {
      childMarkdownRemark {
        html
      }
    }
    backgroundImage {
      file {
        url
      }
    }
  }

  fragment section on ContentfulSection {
    ...sectionFields
    blocks {
      ... on ContentfulSection {
        ...sectionFields
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
