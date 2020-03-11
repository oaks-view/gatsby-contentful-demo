/*
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import CommonTemplate from './common-template'
import Header from '../components/types/CityHeader'
import Footer from '../components/CityFooter'

const CityTemplate = props => {
  const page = props.data.contentfulPage
  const [section, ...blocks] = page.blocks

  if (!(section.internal.type === 'ContentfulSection' && section.type === 'banner')) {
    throw new Error(`For template city first section must be of type banner`)
  }

  const CityHeader = () => <Header {...section} />

  return <CommonTemplate {...page} blocks={blocks} header={CityHeader} footer={Footer} />
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
    subtitle
    body {
      body
      childMarkdownRemark {
        html
      }
    }
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
    contentfulPage(id: { eq: $id }, blocks: { elemMatch: { node_locale: { eq: $locale } } }) {
      id
      title
      path
      template
      blocks {
        ...sectionType
      }
    }
  }
`
*/
