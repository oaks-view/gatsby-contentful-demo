/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

// https://github.com/gatsbyjs/gatsby/issues/11934#issuecomment-538662592
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPage(filter: { template: { in: ["city", "home", "custom"] }, node_locale: { eq: "de" } }) {
          edges {
            node {
              title
              template
              path
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

      edges.forEach(edge => {
        const templatePath = path.resolve(`./src/templates/${edge.node.template}.js`)

        createPage({
          // path: `/${edge.node.node_locale}/${edge.node.path}`, // with locale in the path
          path: edge.node.path,
          component: templatePath,
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
