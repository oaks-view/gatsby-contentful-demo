import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import '../styles/global.css'
import Navbar from '../components/navbar'

// import { Link } from "gatsby"
// import Image from "../components/image"
// import SEO from "../components/seo"

const Demo2Page = ({ data }) => {
  const {
    node: { sections },
  } = get(data, 'allContentfulPage.edges[0]')
  console.log(sections[1])

  return (
    <>
      <Helmet bodyAttributes={{ class: 'body-general' }}>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"
          rel="stylesheet"
        />
      </Helmet>
      <Navbar />
      <div className="section-hero">
        <img src={sections[0].backgroundImage.file.url} alt="" />
        <div className="container-hero w-container">
          <h1 className="h1-general">{sections[0].title}</h1>
          <h2 className="h2-general">{sections[0].body.body}</h2>
        </div>
      </div>
      <div id="select" className="section-general gray-background">
        <div className="container-general w-container">
          <h3 className="h3-general">{sections[1].title}</h3>
          <div className="columns w-row">
            {(sections[1].subSections || []).map((item, i) => (
              <div
                className={`column${i > 0 ? `-${i + 1}` : ''} w-col w-col-4`}
                key={`col-${i}`}
              >
                <a href={item.linkTo} className="link-block-2 w-inline-block">
                  <img
                    src={item.medias[0].file.url}
                    alt=""
                    className="flags-countries"
                  />
                  <div className="titles-countries">{item.title}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-general">
        <div className="container-general w-container">
          <h3 className="h3-general">{sections[2].title}</h3>
          <p className="text-general">{sections[2].body.body}</p>
          <div className="column-data w-row">
            {sections[2].medias.map((item, i) => (
              <div
                className={`column-${[14, 21, 15][i]} w-col w-col-4`}
                key={`img-${i}`}
              >
                <img
                  src={item.file.url}
                  alt=""
                  className={`image-${[13, 15, 14][i]}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Demo2Page

export const query = graphql`
  query MyQuery {
    allContentfulPage(filter: { title: { eq: "Home" } }) {
      edges {
        node {
          title
          sections {
            title
            slug
            body {
              body
            }
            sectionIndex
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
