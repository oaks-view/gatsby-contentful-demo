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

// https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  // infer `sections` field
  // TODO use @dontInfer and add fields on contentful  `sections:[ContentfulSection]`
  const typeDefs = `
    type contentfulSectionBodyEnTextNode implements Node {
      body_en: String
      childMdx: Mdx
    }
    type contentfulSectionBodyDeTextNode implements Node {
      body_de: String
      childMdx: Mdx
    }
    type contentfulSectionBodyFrTextNode implements Node {
      body_fr: String
      childMdx: Mdx
    }
    type contentfulSectionBodySvTextNode implements Node {
      body_sv: String
      childMdx: Mdx
    }
    type contentfulSectionBodyNoTextNode implements Node {
      body_no: String
      childMdx: Mdx
    }
    type contentfulSectionBodyItTextNode implements Node {
      body_it: String
      childMdx: Mdx
    }

    type ContentfulSection implements Node {
      slug: String!
      body_en: contentfulSectionBodyEnTextNode
      body_de: contentfulSectionBodyDeTextNode
      body_fr: contentfulSectionBodyFrTextNode
      body_sv: contentfulSectionBodySvTextNode
      body_no: contentfulSectionBodyNoTextNode
      body_it: contentfulSectionBodyItTextNode
    }

    type ContentfulPage implements Node {
      title: String!
      template: String!
      type: String!
      active: Boolean!
      country: String
      html_lang: String
      contentful_id: String

      path_en: String
      path_de: String
      path_fr: String
      path_sv: String
      path_no: String
      path_it: String

      title_en: String
      title_de: String
      title_fr: String
      title_sv: String
      title_no: String
      title_it: String

      description_en: String
      description_de: String
      description_fr: String
      description_sv: String
      description_no: String
      description_it: String

      robots_noindex_en: String
      robots_noindex_de: String
      robots_noindex_fr: String
      robots_noindex_sv: String
      robots_noindex_no: String
      robots_noindex_it: String

      rel_canonical_en: String
      rel_canonical_de: String
      rel_canonical_fr: String
      rel_canonical_sv: String
      rel_canonical_no: String
      rel_canonical_it: String

      rel_alternate_en: String
      rel_alternate_de: String
      rel_alternate_fr: String
      rel_alternate_sv: String
      rel_alternate_no: String
      rel_alternate_it: String

      hero_en: String
      hero_de: String
      hero_fr: String
      hero_sv: String
      hero_no: String
      hero_it: String

      body_en: String
      body_de: String
      body_fr: String
      body_sv: String
      body_no: String
      body_it: String
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
      allContentfulPage(filter: { active: { eq: true }, template: { in: ["city", "service"] } }) {
        edges {
          node {
            title
            template
            type
            active
            country
            html_lang
            contentful_id
            path_en
            path_de
            path_fr
            path_sv
            path_no
            path_it
            title_en
            title_de
            title_fr
            title_sv
            title_no
            title_it
            description_en
            description_de
            description_fr
            description_sv
            description_no
            description_it
            robots_noindex_en
            robots_noindex_de
            robots_noindex_fr
            robots_noindex_sv
            robots_noindex_no
            robots_noindex_it
            rel_canonical_en
            rel_canonical_de
            rel_canonical_fr
            rel_canonical_sv
            rel_canonical_no
            rel_canonical_it
            rel_alternate_en
            rel_alternate_de
            rel_alternate_fr
            rel_alternate_sv
            rel_alternate_no
            rel_alternate_it
            hero_en
            hero_de
            hero_fr
            hero_sv
            hero_no
            hero_it
            body_en
            body_de
            body_fr
            body_sv
            body_no
            body_it
            sections {
              body_en {
                childMdx {
                  body
                }
              }
              body_de {
                childMdx {
                  body
                }
              }
              body_fr {
                childMdx {
                  body
                }
              }
              body_sv {
                childMdx {
                  body
                }
              }
              body_no {
                childMdx {
                  body
                }
              }
              body_it {
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
    return result.errors
  }

  const { site, allContentfulPage } = result.data
  const {
    languages: { langs, defaultLangKey },
  } = site.siteMetadata

  const templates = {
    city: path.resolve('./src/templates/city.js'),
    service: path.resolve('./src/templates/service.js'),
  }

  for (const lang of langs) {
    allContentfulPage.edges.forEach(({ node }) => {
      const pathField = `path_${lang}`
      if (node[pathField]) {
        const sectionsByLang = node.sections.map(section => {
          if (section[`body_${lang}`]) return section[`body_${lang}`].childMdx.body
        })

        createPage({
          path: node[pathField],
          component: templates[node.template],
          context: {
            lang,
            id: node.id,
            type: node.type,
            htmlLang: node.html_lang,
            country: node.country,
            sections: sectionsByLang,
            pagePath: node[pathField],
            title: node[`title_${lang}`],
            description: node[`description_${lang}`],
            hero: node[`hero_${lang}`],
            heroBody: node[`body_${lang}`],
            robotsNoIndex: node[`robots_noindex_${lang}`],
            relCanonical: node[`rel_canonical_${lang}`],
            relAlternate: node[`rel_alternate_${lang}`],
          },
        })
      }
    })
  }
}
