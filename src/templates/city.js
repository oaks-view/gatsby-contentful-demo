import React from 'react'
import * as PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Image from '../components/image'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import StarIcon from '@material-ui/icons/Star'
import InfoIcon from '@material-ui/icons/Info'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Done from '@material-ui/icons/Done'

const propTypes = {
  data: PropTypes.object.isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const CityTemplate = props => {
  const page = props.data.contentfulPage

  return (
    <Layout>
      <SEO title={page.title} />
      <Grid container spacing={3} justify="center">
        <Grid item xs={2}>
          <div style={{ maxWidth: `100px`, marginBottom: `1.45rem` }}>
            <Image />
          </div>
        </Grid>
        <Grid item xs={8}>
          <h1>Gatsby Material UI Starter</h1>
          <h5>
            A responsive, minimalist Gatsby starter based on the world's most
            popular React UI framework.
          </h5>
        </Grid>
      </Grid>
    </Layout>
  )
  // const classes = useStyles()
  // const [features, setFeatures] = React.useState(true)
  // const [info, setInfo] = React.useState(true)
}

CityTemplate.propTypes = propTypes

export default CityTemplate

export const pageQuery = graphql`
  query cityQuery($id: String!) {
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
      blocks: { elemMatch: { node_locale: { eq: "de" } } }
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
        }
      }
    }
  }
`
