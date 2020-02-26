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

  const section1 = sections.find(x => x.slug.startsWith('welcome-to-movinga'))
  const section2 = sections.find(x => x.slug.startsWith('where-do-you'))
  const section3 = sections.find(x => x.slug.startsWith('a-reliable-partner'))
  const section4 = sections.find(x => x.slug.startsWith('moving-experts'))
  const section5 = sections.find(x => x.slug.startsWith('your-benefits'))
  const section6 = sections.find(x => x.slug.startsWith('become-a-movinga-partner'))
  const section7 = sections.find(x => x.slug.startsWith('partners'))


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
        <img src={section1.backgroundImage.file.url} alt="" />
        <div className="container-hero w-container">
          <h1 className="h1-general">{section1.title}</h1>
          <h2 className="h2-general">{section1.body.body}</h2>
        </div>
      </div>
      <div id="select" className="section-general gray-background">
        <div className="container-general w-container">
          <h3 className="h3-general">{section2.title}</h3>
          <div className="columns w-row">
            {(section2.subSections || []).map((item, i) => (
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
          <h3 className="h3-general">{section3.title}</h3>
          <p className="text-general">{section3.body.body}</p>
          <div className="column-data w-row">
            {section3.medias.map((item, i) => (
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
      <div className="section-banner">
        <img src={section4.backgroundImage.file.url} alt="" />
        <div className="container-general w-container">
          <div className="test-banner">{section4.body.body}</div>
          {/* TODO add cta button represention on contentful */}
          <div className="div-cta two-cta">
            <a href="tel:+493076758002" className="cta-general w-button">
              +49 30 76758002
            </a>
            <a href="#select" className="cta-general w-button">
              Get a free offer
            </a>
          </div>
        </div>
      </div>
      <div className="section-general">
        <div className="container-general w-container">
          <h3 className="h3-general">{section5.title}</h3>
          <div className="usp-icons w-row">
            {section5.subSections.map((item, i) => (
              <div className="column-usp-icons w-col w-col-3" key={i}><img
                src={item.backgroundImage.file.url}
                alt="Individual-services" className="w-hidden-small w-hidden-tiny benefits-img" /></div>
            ))}
          </div>
          <div className="usp-text w-row">
            {section5.subSections.map((item, i) => (
              <div className="column-17 w-col w-col-3" key={i}>
                <div className="subtitles-general">{item.title}</div>
                <div className="text-general center">{item.body.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-general gray-background">
        <div className="container-general w-container">
          <h3 className="h3-general">{section6.title}</h3>
          <div className="columns-4 w-row">
            {section6.subSections.map((item, i) => (
              <div className="column-14 w-col w-col-6" key={i}>
                <h4 className="h4-general">{item.title}<br /></h4>
                <p className="text-general center">{item.body.body}<br /></p>
              </div>
            ))}
          </div>
          <div className="div-cta"><a href="#select" className="cta-general w-button">Get a free offer</a></div>
        </div>
      </div>
      <div className="section-general newspaper">
        <div className="w-container">
          <div className="div-block-18">
            {section7.subSections.map((item, i) => (
              <a href={item.linkTo}
                target="_blank" className="w-inline-block" key={i}>
                <img
                  src={item.backgroundImage.file.url}
                  alt="" className={`image-${2 + i}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    
    {/* footer */}
    <div class="section-footer">
    <div class="container-general w-container">
        <div class="footer-text">We’re here to help you move.<br />Mo - Fr: 07:30 - 21:00&nbsp;&nbsp; |&nbsp; Sa: 08:00 -
            18:00</div>
        <div class="columns-general footer w-row">
            <div class="column-centered footer-icons w-col w-col-6 w-col-small-6 w-col-tiny-tiny-stack"><a
                    href="tel:+493076758002" class="footer-link-icon w-inline-block"><img
                        src="/images/helpline.svg"
                        alt="" /></a><a href="tel:+493076758002" class="footer-link">+49 30 76758002</a></div>
            <div class="column-centered footer-icons w-col w-col-6 w-col-small-6 w-col-tiny-tiny-stack"><a
                    href="mailto:service@movinga.de" class="footer-link-icon w-inline-block"><img
                        src="/images/mail.svg"
                        alt="" /></a><a href="mailto:service@movinga.de" class="footer-link">service@movinga.de</a></div>
        </div>
        <div class="line"></div>
        <div class="columns-footer w-row">
            <div class="column-footer-text w-col w-col-4 w-col-small-4">
                <h3 class="footer-links categories">Germany</h3><a href="https://www.movinga.de/uber-uns"
                    class="link-footer">Über uns<br /></a><a href="https://careers.movinga.com/"
                    class="link-footer">Karriere<br /></a><a href="https://www.movinga.de/bewertungen"
                    class="link-footer">Bewertungen<br /></a><a href="https://www.movinga.de/hub/"
                    class="link-footer">Blog<br /></a><a href="https://www.movinga.de/faq"
                    class="link-footer">Hilfe<br /></a>
            </div>
            <div class="column-footer-text w-col w-col-4 w-col-small-4">
                <h3 class="footer-links categories">France</h3><a href="https://www.movinga.fr/a-propos"
                    class="link-footer">À propos de nous<br /></a><a href="https://careers.movinga.com/"
                    class="link-footer">Carrière<br /></a><a href="https://www.movinga.fr/avis-clients"
                    class="link-footer">Nos avis clients<br /></a><a href="https://www.movinga.fr/hub/"
                    class="link-footer">Blog<br /></a><a href="https://www.movinga.fr/faq"
                    class="link-footer">Aide<br /></a>
            </div>
            <div class="column-footer-text w-col w-col-4 w-col-small-4">
                <h3 class="footer-links categories">Sweden</h3><a href="https://www.movinga.se/om-oss"
                    class="link-footer">Om oss<br /></a><a href="https://careers.movinga.com/"
                    class="link-footer">Karriär<br /></a><a href="https://www.movinga.se/omdomen"
                    class="link-footer">Omdömen<br /></a><a href="https://www.movinga.se/hub/"
                    class="link-footer">Blogg<br /></a><a href="https://www.movinga.se/fragor-och-svar"
                    class="link-footer">Hjälp<br /></a>
            </div>
        </div>
        <div class="columns-cards w-row">
            <div class="column-general w-col w-col-2 w-col-small-2">
                <div class="text-light-footer gmbh">© 2020 Movinga GmbH</div>
            </div>
            <div class="column-general w-col w-col-2 w-col-small-2"><a href="/data-privacy-notice"
                    class="link-footer center">Data Privacy<br /></a></div>
            <div class="column-general w-col w-col-2 w-col-small-2"><a href="/imprint"
                    class="link-footer center">Imprint<br /></a></div>
            <div class="column-general w-col w-col-2 w-col-small-2"><a href="https://www.movinga.com/about-us"
                    class="link-footer center">About us<br /></a></div>
            <div class="column-card w-col w-col-4 w-col-small-4">
                <div class="text-light-footer gmbh">We accept :</div><img
                    src="/images/payment-methods.png"
                    alt="" class="image-12" />
            </div>
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
