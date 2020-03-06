import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import CommonTemplate from './common-template'
import Footer from '../components/CityFooter'

const useStyles = makeStyles(theme => ({
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

const HomeTemplate = props => {
  const classes = useStyles()

  const page = props.data.contentfulPage

  return <CommonTemplate {...page} className={classes.home} footer={Footer} />
}

HomeTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomeTemplate

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

  query homeQuery($id: String!, $locale: String!) {
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
