import { graphql } from 'gatsby'
import MovingaDE from '../components/pages/MovingaDE'

export default props => <MovingaDE {...props} />

export const query = graphql`
  query MovingaDeQuery {
    allContentfulPage(filter: { slug: { eq: "movinga-de" } }) {
      edges {
        node {
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
    }
  }
`
