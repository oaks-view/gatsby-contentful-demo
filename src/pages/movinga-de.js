import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import '../styles/movinga-de.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const HomeDE = ({ data }) => {
  const {
    node: { sections },
  } = get(data, 'allContentfulPage.edges[0]')

  console.log(sections)

  const section1 = sections.find(x => x.slug.startsWith('more-than-just'))

  useEffect(() => {
    const script1 = document.createElement('script')
    script1.src =
      'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.4.1.min.220afd743d.js'
    script1.integrity = 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo='
    script1.crossOrigin = 'anonymous'
    script1.defer = true
    const script2 = document.createElement('script')
    script2.src =
      'https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/scripts/intlTelInput.js'
    script2.defer = true
    const script3 = document.createElement('script')
    script3.src =
      'https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/scripts/app.js'
    script3.defer = true

    document.body.appendChild(script1)
    document.body.appendChild(script2)
    document.body.appendChild(script3)

    return () => {
      document.body.removeChild(script3)
      document.body.removeChild(script2)
      document.body.removeChild(script1)
    }
  }, [])

  return (
    <>
      <Helmet bodyAttributes={{ class: 'body-general' }}>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"
          rel="stylesheet"
        />
      </Helmet>
      <Navbar />
      <div id="top" className="clean-hero" data-ix="shownavbar-de">
        <div className="top-nav small">
          <div className="columns-23 w-row">
            <div className="w-col w-col-5 w-col-tiny-4 w-col-small-4">
              <a
                href="https://www.movinga.de/auszeichnungen"
                className="link-badges w-inline-block"
              >
                <img
                  src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5e1c535d6a00730ab9f19e37_Movinga%20T%C3%9CV.svg"
                  width="120"
                  alt=""
                  className="image-97"
                />
              </a>
            </div>
            <div className="w-col w-col-2 w-col-tiny-4 w-col-small-4">
              <a
                href="https://www.movinga.de/auszeichnungen"
                className="link-badges w-inline-block"
              >
                <img
                  src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5c669f452f71d6889deb1d5b_Siegel-Fair-Unterwegs-Movinga.png"
                  width="45"
                  alt=""
                />
              </a>
            </div>
            <div className="w-col w-col-4 w-col-tiny-4 w-col-small-4">
              <a
                href="https://www.movinga.de/auszeichnungen"
                className="link-badges w-inline-block"
              >
                <div className="div-block-138 w-clearfix">
                  <div className="text-tv-hero">Bekannt aus dem TV</div>
                  <img
                    src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5b61b7399280a9c8a2368012_channels.png"
                    height="36"
                    alt="certificates-item"
                    className="image-61"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div id="heroplus" className="layout w-clearfix">
          <div className="div-img-ralf">
            <img
              src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5baa3a739a521563b1b28df6_movinga_rm.png"
              alt="ralf-muller-tuv"
              className="ab-ralf"
            />
          </div>
          <div className="div-headline">
            <h1 className="ab-headline">{section1.title}</h1>
            <div className="row-68 main w-row">
              <div className="column-169 w-col w-col-2 w-col-small-2 w-col-tiny-2">
                <a
                  target="_blank"
                  href="tel:+493076758002"
                  className="link-phone-cta w-inline-block"
                >
                  <img
                    src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5b0fb262c3aa5032814c6d36_Phone%20-%20simple-line-icons.png"
                    height="30"
                    width="30"
                    alt="call-item"
                    className="image-57"
                  />
                </a>
              </div>
              <div className="column-168 w-col w-col-10 w-col-small-10 w-col-tiny-10">
                <p className="text-phone-cta">Jetzt beraten lassen</p>
                <a href="tel:+493076758002" className="link-phone">
                  +49 30 76758002
                </a>
              </div>
            </div>
          </div>
          <div className="leadgen-ab">
            <div className="div-block-118">
              <div className="div-block-44 w-clearfix">
                {/* TODO only shows up on mobile */}
              </div>
              <div className="div-block-45">
                <div className="html-embed-6 w-embed">
                  <div className="leadgen" data-lang="de"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-general">
        <div className="container-general w-container">
          <h3 className="h3-general city">Einfach Umziehen mit Movinga</h3>
          <div className="columns-icons w-hidden-tity w-row">
            <div className="column-center-icon w-col w-col-2">
              <img
                src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5d5faf9738c00e100eadbead_01.svg"
                height="60"
                alt=""
                className="image-53 w-hidden-small w-hidden-tiny"
              />
            </div>
            <div className="column-text w-row">
              <div className="column-text w-col w-col-2">
                <div className="subtitle-general small">
                  Persönliche Expertenberatung
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="section-hero"> */}
      {/*   <img src={section1.backgroundImage.file.url} alt="" /> */}
      {/*   <div className="container-hero w-container"> */}
      {/*     <h1 className="h1-general">{section1.title}</h1> */}
      {/*     <h2 className="h2-general">{section1.body.body}</h2> */}
      {/*   </div> */}
      {/* </div> */}
      <Footer />
    </>
  )
}

export default HomeDE

export const query = graphql`
  query MyQuery {
    allContentfulPage(filter: { slug: { eq: "movinga-de" } }) {
      edges {
        node {
          title
          sections {
            title
            slug
            body {
              body
            }
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
