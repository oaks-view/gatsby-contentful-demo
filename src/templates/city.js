import React from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import ContentfulSection from '../components/ContentfulSection'
import ContentfulCard from '../components/ContentfulCard'

// When content is fetched, it get an internal.type prop which is Contentful + content type
// At Page can have many blocks, and block maybe of different type. This example only supports
// two types `Section` and `Card`.
const PageComponents = {
  ContentfulSection,
  ContentfulCard,
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
  },
}))

const CityTemplate = props => {
  const classes = useStyles()
  const page = props.data.contentfulPage

  // TODO:
  // create styles for this template
  // create header
  // create footer
  return (
    <Layout>
      <SEO title={page.title} />
      <Box className={classes.root}>
        {page.blocks.map((block, i) => {
          const BlockComponent = PageComponents[block.internal.type]
          return <BlockComponent {...block} key={`block-${i}`} />
        })}
      </Box>
    </Layout>
  )
}

CityTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CityTemplate

export const pageQuery = graphql`
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
      title
      slug
      id
      template
      blocks {
        id
        backgroundColor
        backgroundImage {
          file {
            url
          }
        }
        orientation
        slug
        title
        titlePosition
        internal {
          type
        }
        blocks {
          body {
            childMarkdownRemark {
              html
            }
          }
          image {
            file {
              url
            }
          }
          orientation
          title
          titlePosition
          internal {
            type
          }
        }
      }
    }
  }
`
