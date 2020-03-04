import _ from 'lodash'
import React from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'

import theme from '../themes/city'
import { getBlockComponent } from '../utils'
import CityHeader from '../components/types/CityHeader'
import Footer from '../components/CityFooter'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    '& > div:nth-child(odd)': {
      backgroundColor: '#F8F9FB'
    }
  },
}))

const CityTemplate = props => {
  const classes = useStyles()
  const { title, blocks } = props.data.contentfulPage
  const [headerBlock, ...pageBlocks] = blocks

  if (
    !(
      headerBlock.internal.type === 'ContentfulSection' &&
      headerBlock.type === 'banner'
    )
  ) {
    throw new Error(
      `First block in city template must be a Section of type banner`
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <SEO title={title} />
        <CityHeader {...headerBlock} />
        {pageBlocks.map((block, i) => {
          const { BlockComponent } = getBlockComponent(block)
          return <BlockComponent {...block} key={`b-${i}`} />
        })}
      </Box>
      <Footer />
    </ThemeProvider>
  )
}

CityTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CityTemplate

export const pageQuery = graphql`
  fragment cardType on ContentfulCard {
    id
    body {
      body
      childMarkdownRemark {
        html
      }
    }
    image {
      file {
        url
      }
    }
    order
    orientation
    title
    subtitle
    titleAlignment
    internal {
      type
    }
  }

  fragment actionType on ContentfulAction {
    id
    urlTo
    title
    size
    image {
      file {
        url
      }
    }
    openInNewTab
    internal {
      type
    }
  }

  fragment sectionFields on ContentfulSection {
    id
    type
    title
    slug
    titleAlignment
    orientation
    backgroundImage {
      file {
        url
      }
    }
    internal {
      type
    }
  }

  fragment sectionType on ContentfulSection {
    ...sectionFields
    blocks {
      ...actionType
      ...cardType
      ... on ContentfulSection {
        ...sectionFields
        blocks {
          ...actionType
          ...cardType
        }
      }
    }
  }

  query cityQuery($id: String!, $locale: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    contentfulPage(
      id: { eq: $id }
      blocks: { elemMatch: { node_locale: { eq: $locale } } }
    ) {
      id
      title
      slug
      template
      blocks {
        ...sectionType
      }
    }
  }
`
