// import React from 'react'
// import { graphql } from 'gatsby'
// import MovingaDE from '../components/pages/MovingaDE'
//
// export default props => <MovingaDE {...props} />
//
// export const query = graphql`
//   query MovingaEnQuery {
//     contentfulPage(
//       slug: { eq: "movinga-de" }
//       sections: { elemMatch: { node_locale: { eq: "en" } } }
//     ) {
//       title
//       sections {
//         title
//         slug
//         body {
//           body
//         }
//         medias {
//           file {
//             url
//           }
//           title
//         }
//         backgroundImage {
//           file {
//             url
//           }
//         }
//         subSections {
//           backgroundImage {
//             file {
//               url
//             }
//           }
//           title
//           body {
//             body
//           }
//           medias {
//             file {
//               url
//             }
//           }
//           linkTo
//         }
//       }
//     }
//   }
// `
//
