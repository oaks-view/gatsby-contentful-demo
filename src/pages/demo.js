import React from "react"
import { graphql } from "gatsby";
import get from 'lodash/get'
import Navbar from "../components/navbar"

const DemoPage = ({ data }) => {
    const sections = get(data, 'contentfulPage.sections');
    return <>
        <Navbar />
        <div style={{ marginBottom: `1.45rem` }}>
            {sections.map(node => {
                console.log(node);
                if (node.sectionIndex === 1) {
                    const bgImageUrl = get(node, 'backgroundImage.file.url');
                    const body = get(node, 'body.childMarkdownRemark.html');
                    console.log('bgImageUrl: => ', bgImageUrl.slice(2, bgImageUrl.length))
                    console.log('body => ', body);
                    return (
                        <section key={node.id}
                            style={{
                                minHeight: '400px',
                                backgroundImage: `url(${bgImageUrl.slice(2, bgImageUrl.length)})`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                paddingLeft: '10rem',
                                paddingRight: '10rem',
                                lineHeight: 'normal',
                            }}>

                            <h1 style={{
                                marginBottom: '0px',
                                fontWeight: 'bold',
                                fontSize: '40px',
                            }}>{node.title}</h1>

                            <div
                                style={{
                                    fontSize: '0.88rem',
                                    fontWeight: 'bold',
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    padding: '0px'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: body,
                                }}
                            />
                        </section>
                    )
                }
                else {
                    return (
                        <section key={node.id}>
                            {node.title}
                        </section>
                    )
                }
            })}
        </div>
    </>
}

export default DemoPage;

export const query = graphql`
query DemoPageQuery {
    contentfulPage(title: {eq: "Home"}) {
      sections {
        id
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
`
