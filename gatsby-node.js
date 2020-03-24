/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const get = require('lodash/get')

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

// https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // TODO handle `sections` fields for ContentfulPage and then add `@dontInfer`
  // relying of inferring fields may slow things down as the content grows
  const typeDefs = `
    type contentfulMarkdownChildHtml implements Node {
      html: String
    }
    type contenfulLongText implements Node {
      childMarkdownRemark: contentfulMarkdownChildHtml
    }

    type ContentfulPage implements Node {
      id: ID!
      active: Boolean!
      category: String!
      path: String!
      template: String
      seo_title: String!
      seo_description: String
      seo_no_index: Boolean
      seo_canonical: String
      seo_alternate: String
      hero: contenfulLongText
      body: contenfulLongText
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      site {
        siteMetadata {
          languages {
            langs
            defaultLangKey
          }
        }
      }
      allContentfulPage(filter: { active: { eq: true } }) {
        edges {
          node {
            id
            active
            category
            path
            template
            seo_title
            seo_description
            seo_no_index
            seo_canonical
            seo_alternate
            hero {
              childMarkdownRemark {
                html
              }
            }
            body {
              childMarkdownRemark {
                html
              }
            }
            sections {
              body {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const pages = get(result, 'data.allContentfulPage.edges', [])

  if (!pages.length) {
    throw new Error(
      `[createPage][error] there are no pages to render. Double check the query or create pages on Contentful`,
    )
  }

  const categories = {
    city: path.resolve('./src/templates/city.js'),
    service: path.resolve('./src/templates/service.js'),
    movings: path.resolve('./src/templates/movings.js'),
    movers: path.resolve('./src/templates/movers.js'),
    articles: path.resolve('./src/templates/articles.js'),
    static: path.resolve('./src/templates/static.js'),
  }

  const pagesByCountry = getPagesByCountry(pages)

  // NOTE watch behaviour|performance when generating hundreds of pages
  for (const { node } of pages) {
    const { path: pagePath, ...fields } = node

    const categoryPath = categories[node.category]

    if (!categoryPath) {
      console.warn(
        `[createPages][warn] category "${node.category}" is not supported yet. Skipping page "${node.path}" generation`,
      )
      continue
    }

    const [country, lang] = pagePath.substring(1).split('/')

    console.log(`[createPages] generating page "${node.path}".`)

    createPage({
      path: node.path,
      component: categoryPath,
      context: {
        ...fields,
        pagePath,
        country,
        lang,
      },
    })

    console.log(`[createPages] page "${node.path}" created.`)
  }
}

function getPagesByCountry(pages) {
  const res = { Germany: [], German: [] }

  for (const page of pages) {
    const path = page.node.path.toLowerCase()

    // /de/*
    if (path.startsWith('/de/')) {
      res.Germany.push(path)
    }

    // */de/*
    if (/^\/.*\/de\/.*/i.test(path)) {
      res.German.push(path)
    }
  }

  return res
}
