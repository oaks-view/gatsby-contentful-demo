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
    type contentfulSectionBodyTextNode implements Node {
      body: String
      childMdx: Mdx
    }

    type contentfulPageBodyTextNode implements Node {
      body: String
      childMdx: Mdx
    }

    type contentfulPageHeroTextNode implements Node {
      hero: String
      childMdx: Mdx
    }

    type ContentfulSection implements Node {
      name: String
      body: contentfulSectionBodyTextNode
    }

    type ContentfulPage implements Node {
      contentful_id: String!
      title: String
      description: String
      category: String
      template: String
      country: String
      lang: String
      path: String
      active: Boolean
      hero: contentfulPageHeroTextNode
      body: contentfulPageBodyTextNode
      rel_canonical: String
      rel_alternate: String
      robots_noindex: String
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
      allContentfulPage(filter: { active: { eq: true }, category: { in: ["city", "service"] } }) {
        edges {
          node {
            id
            contentful_id
            title
            description
            category
            template
            country
            lang
            path
            active
            rel_canonical
            rel_alternate
            robots_noindex
            hero {
              childMdx {
                body
              }
            }
            body {
              childMdx {
                body
              }
            }
            sections {
              body {
                childMdx {
                  body
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

  const templates = {
    city: path.resolve('./src/templates/city.js'),
    service: path.resolve('./src/templates/service.js'),
  }

  // NOTE watch behaviour|performance when generating hundreds of pages
  for (const { node } of pages) {
    const templatePath = templates[node.category]

    if (!templatePath) {
      console.warn(
        `[createPages][warn] category "${node.category}" is not supported yet. Skipping page "${node.path} - ${node.lang}" generation`,
      )
      continue
    }

    const sections = node.sections.map(s => get(s, 'body.childMdx.body'))

    const fields = {
      country: node.country,
      lang: node.lang,
      pagePath: node.path,
      title: node.title,
      template: node.template,
      category: node.category,
    }

    console.log(`[createPages] generating page "${node.path}". %j`, fields)

    createPage({
      path: node.path,
      component: templatePath,
      context: {
        ...fields,
        sections,
        description: node.description,
        hero: get(node, 'hero.childMdx.body'),
        body: get(node, 'body.childMdx.body'),
        robotsNoIndex: node.robots_noindex,
        relCanonical: node.rel_canonical,
        relAlternate: node.rel_alternate,
      },
    })

    console.log(`[createPages] page "${node.path}" created.`)
  }
}
