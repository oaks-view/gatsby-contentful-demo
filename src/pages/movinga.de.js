import React from 'react'
import { graphql } from 'gatsby'
import MovingaDE from '../components/pages/MovingaDE'

export default props => <MovingaDE {...props} />

export const query = graphql`
  query MovingaDeQuery {
    contentfulPage(
      slug: { eq: "movinga-de" }
      sections: { elemMatch: { node_locale: { eq: "de" } } }
    ) {
      title
      sections {
        title
        slug
        body {
          body
        }
        medias {
          file {
            url
          }
          title
        }
        backgroundImage {
          file {
            url
          }
        }
        subSections {
          backgroundImage {
            file {
              url
            }
          }
          title
          body {
            body
          }
          medias {
            file {
              url
            }
          }
          linkTo
        }
      }
    }
  }
`
