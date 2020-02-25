import React from "react"
import { graphql } from "gatsby";
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const DemoPage = ({ data }) => {
    console.log(data);
    return <Layout>
        {/* <SEO title="Home" /> */}
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        {/* <h6>Thies is query title: </h6><p><b>{ data.site.siteMetadata.title }</b></p> */}
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            {/* <Image /> */}
        </div>
        {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
}

export default DemoPage;

export const query = graphql`
query MyQuery {
    allContentfulPageSection(filter: {page: {eq: "Home"}}) {
      edges {
        node {
          sectionIndex
          medias {
            title
            file {
              url
              fileName
            }
          }
          body {
            childMarkdownRemark {
              html
              rawMarkdownBody
            }
            body
          }
          title
          backgroundImage {
            file {
              url
            }
          }
          subSections {
            title
            page
            body {
              childMarkdownRemark {
                html
                rawMarkdownBody
              }
            }
            backgroundImage {
              file {
                url
              }
            }
            medias {
              file {
                url
                fileName
              }
            }
          }
        }
      }
    }
  }  
`
