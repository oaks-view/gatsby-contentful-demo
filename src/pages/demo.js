import React from "react"
import { graphql } from "gatsby";
import Navbar from "../components/navbar"

const DemoPage = ({ data }) => {
    console.log(data);
    return <>
        <Navbar />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        </div>
    </>
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
