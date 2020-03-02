/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Contentful graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(`
      {
        allContentfulPage(
          filter: { template: { eq: "city" }, node_locale: { eq: "de" } }
        ) {
          edges {
            node {
              title
              template
              slug
              id
              contentful_id
              node_locale
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      const { edges } = result.data.allContentfulPage
      const cityTemplate = path.resolve('./src/templates/city.js')

      edges.forEach(edge => {
        createPage({
          // path: `/${edge.node.node_locale}/umzug/${edge.node.slug}`, // with locale in the path
          path: `/umzug/${edge.node.slug}`,
          component: cityTemplate,
          context: {
            id: edge.node.id,
            locale: edge.node.node_locale,
          },
        })
      })

      resolve()
    })
    // .then(() => {
    //   // - query pages for another template
    //   // - require template file
    //   // - call createPage
    //   // Repeat this process for each template
    //   graphql(`
    //     // query goes here
    //   `).then(result => {
    //     if (result.errors) {
    //       reject(result.errors)
    //     }
    //   })
    // })
  })
}
