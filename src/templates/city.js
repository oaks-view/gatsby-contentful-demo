import _ from 'lodash'
import React from 'react'
import * as PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import { getBlockComponent } from '../utils'

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
          const { BlockComponent } = getBlockComponent(block)
          return <BlockComponent {...block} key={`b-${i}`} />
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
        type
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
          order
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
