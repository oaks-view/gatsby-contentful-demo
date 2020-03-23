/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const get = require("lodash/get");
const doSet = require("lodash/set");

// https://github.com/gatsbyjs/gatsby/issues/11934#issuecomment-538662592
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom"
        }
      }
    });
  }
};

// https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

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
      id: ID!
      active: Boolean!
      country: String!
      lang: String!
      category: String!
      path: String!
      template: String
      seo_title: String!
      seo_description: String
      seo_no_index: Boolean
      seo_canonical: String
      seo_alternate: String
      hero: contentfulPageHeroTextNode
      body: contentfulPageBodyTextNode
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

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
      allContentfulPage(
        filter: { active: { eq: true }, category: { in: ["city", "service"] } }
      ) {
        edges {
          node {
            id
            active
            country
            lang
            category
            path
            template
            seo_title
            seo_description
            seo_no_index
            seo_canonical
            seo_alternate
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
  `);

  if (result.errors) {
    throw result.errors;
  }

  const pages = get(result, "data.allContentfulPage.edges", []);

  if (!pages.length) {
    throw new Error(
      `[createPage][error] there are no pages to render. Double check the query or create pages on Contentful`
    );
  }

  const templates = {
    city: path.resolve("./src/templates/city.js"),
    service: path.resolve("./src/templates/service.js")
  };

  const pagesByCountry = getPagesByCountry(pages);

  // NOTE watch behaviour|performance when generating hundreds of pages
  for (const { node } of pages) {
    const templatePath = templates[node.category];

    if (!templatePath) {
      console.warn(
        `[createPages][warn] category "${node.category}" is not supported yet. Skipping page "${node.path} - ${node.country}" generation`
      );
      continue;
    }

    const sections = node.sections.map(s => get(s, "body.childMdx.body"));

    const fields = {
      id: node.id,
      active: node.active,
      country: node.country,
      lang: node.lang,
      category: node.category,
      pagePath: node.path,
      template: node.template,
      seoTitle: node.seo_title,
      seoDescription: node.seo_description,
      seoNoIndex: node.seo_no_index,
      seoCanonical: node.seo_canonical,
      seoAlternate: node.seo_alternate
    };

    console.log(`[createPages] generating page "${node.path}". %j`, fields);

    createPage({
      path: node.path,
      component: templatePath,
      context: {
        ...fields,
        sections,
        hero: get(node, "hero.childMdx.body"),
        body: get(node, "body.childMdx.body"),
        pagesByCountry
      }
    });

    console.log(`[createPages] page "${node.path}" created.`);
  }
};

function getPagesByCountry(pages) {
  const res = { Germany: [], German: [] };

  for (const page of pages) {
    const path = page.node.path.toLowerCase();

    // /de/*
    if (path.startsWith("/de/")) {
      res.Germany.push(path);
    }

    // */de/*
    if (/^\/.*\/de\/.*/i.test(path)) {
      res.German.push(path);
    }
  }

  return res;
}
