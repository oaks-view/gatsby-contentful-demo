import React, { useEffect } from 'react'

// https://www.gatsbyjs.org/docs/debugging-html-builds/#how-to-check-if-window-is-defined
if (typeof window !== 'undefined') {
  const $ = require('jquery')
  window.jQuery = window.$ = $
}

import Helmet from 'react-helmet'
import '../../styles/movinga-de.css'
import Footer from '../footer'
import Navbar from '../navbar'

const isOdd = num => num % 2 > 0

const MovingaDE = props => {
  const { sections } = props.data.contentfulPage

  const section1 = sections.find(x => x.slug.startsWith('more-than-just'))
  const section2 = sections.find(x => x.slug.startsWith('just-move-with-movinga'))
  const section3 = sections.find(x => x.slug.startsWith('basic-package-and-additional-services'))
  const section4 = sections.find(x => x.slug.startsWith('always-included-in-your-move'))
  const section5 = sections.find(x => x.slug.startsWith('optional-services'))
  const section6 = sections.find(x => x.slug.startsWith('movinga-move-your-home-professional-moving-companies-all-over-germany'))
  const section7 = sections.find(x => x.slug.startsWith('heres-how-it-works'))
  const section8 = sections.find(x => x.slug.startsWith('thats-what-our-customers-say'))
  const section9 = sections.find(x => x.slug.startsWith('movinga-awards-2'))
  // thats-what-our-customers-say

  useEffect(() => {
    const script1 = document.createElement('script')
    script1.src =
      'https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/scripts/intlTelInput.js'
    script1.defer = true
    const script2 = document.createElement('script')
    script2.src =
      'https://s3.eu-central-1.amazonaws.com/movinga-leadgen/DE/final-widget/dist/scripts/app.js'
    script2.defer = true

    document.body.appendChild(script1)
    document.body.appendChild(script2)

    return () => {
      document.body.removeChild(script1)
      document.body.removeChild(script2)
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
                <p className="text-phone-cta">{section1.subSections[0].title}</p>
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
          <h3 className="h3-general city">{section2.title}</h3>
          <div className="columns-icons w-hidden-tity w-row">
            {section2.subSections.map((item, i) => (
              <div className={`column-center-icon w-col w-col-${isOdd(i) ? 3 : 2}`} key={i}>
                <img
                  src={item.backgroundImage.file.url}
                  height="60"
                  alt=""
                  className="image-53 w-hidden-small w-hidden-tiny"
                />
              </div>
            ))}
          </div>
          <div className="columns-text w-row">
            {section2.subSections.map((item, i) => (
              <div className={`column-text w-col w-col-${isOdd(i) ? 3 : 2}`} key={i}>
                <div className="subtitle-general small">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-general gray-background">
        <div className="container-general w-container">
          <h3 className="h3-general city">{section3.title}</h3>
          <div className="white-background">
            <div className="columns-services w-row">
              <div className="column-services w-col w-col-6 w-col-small-small-stack">
                <div className="subtitle-general left-subtitle">{section4.title}</div>
                {section4.subSections.map((item, i) => (
                  <div className="columns-services w-row" key={i}>
                    <div className="column-checks centered w-col w-col-1 w-col-small-1 w-col-tiny-1"><img
                      src={item.backgroundImage.file.url}
                      alt="" className="image-89" /></div>
                    <div className="column-checks w-col w-col-11 w-col-small-11 w-col-tiny-11">
                      <div className="text-general">{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="column-services w-col w-col-6 w-col-small-small-stack">
                <div className="subtitle-general left-subtitle">{section5.title}</div>
                {section5.subSections.map((item, i) => (
                  <div className="columns-services w-row" key={i}>
                    <div className="column-checks w-col w-col-1 w-col-small-1 w-col-tiny-1"><img
                      src={item.backgroundImage.file.url}
                      alt="" className="image-89" /></div>
                    <div className="column-checks w-col w-col-11 w-col-small-11 w-col-tiny-11">
                      <div className="text-general">{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-general blue-background">
        <div className="container-general w-container">
          <div className="text-banner">{section6.title}
          </div>
          <div className="div-cta"><a href="#heroplus" className="cta-general w-button">{section6.subSections[0].title}</a></div>
        </div>
      </div>

      <div className="section-general">
        <div className="container-general w-container">
          <h3 className="h3-general city">{section7.title}</h3>
          <div className="columns-general center w-row">
            <div className="column-images w-col w-col-4">
              <img
                src={section7.backgroundImage.file.url}
                alt="" className="image-99" />
            </div>
            <div className="column-general w-col w-col-8">
              {section7.subSections.map((item, i) => (
                <>
                  <div className="subtitle-general left-subtitle" key={i}>{item.title}</div>
                  <div className="text-general">{item.body.body}</div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="section-general gray-background">
        <div className="container-general w-container">
          <h3 className="h3-general city">{section8.title}</h3>
          <div className="columns-blog w-row">
            {section8.subSections.map((item, i) => (
              <div className="column-general w-col w-col-4" key={i}>
                <div className="div-testimonials"><img
                  src={item.backgroundImage.file.url}
                  alt="" />
                  <div className="text-general">{item.body.body}</div>
                  {/* <div className="text-general">„Alles lief super, die Umzugshelfer waren sehr nett und pünktlich. Meine
                        Sachen wurden sicher in die neue Wohnung transportiert. Jederzeit wieder.“<br />‍<br />‍<em>von
                            Essen nach Berlin</em></div> */}
                </div>
              </div>
            ))}
          </div>
          {/* Todo Translate */}
          <div className="div-cta"><a href="/bewertungen" className="cta-general w-button">Read more</a></div>
        </div>
      </div>

      <div className="section-general badges">
        <div className="container-general w-container">
          <div className="columns-trusted-shop-big w-row">
            {section9.subSections.slice(0, section9.subSections.length - 1).map((item, i) => (
              <div className="column-icon-trusted-shop w-col w-col-2 w-col-small-small-stack" key={i}>
                <a href={item.linkTo}
                  className="link-badges w-inline-block"><img
                    src={item.backgroundImage.file.url}
                    height="75" alt="" /></a></div>
            ))}
            <div className="column-icon-trusted-shop w-col w-col-3 w-col-small-small-stack">
              <div className="div-block-215">
                <div className="text-block-21">{section9.subSections.slice(-1)[0].body.body}</div><a href="/auszeichnungen"
                  className="link-badges w-inline-block w-clearfix"><img
                    src={section9.subSections.slice(-1)[0].backgroundImage.file.url}
                    height="42" alt="certificates-item" className="image-58" /></a>
              </div>
            </div>
          </div>
          <div className="columns-trusted-shop-small hide w-row">
            <div className="column-icon-trusted-shop-2 w-col w-col-3"><a href="#" className="link-badges w-inline-block"><img
              src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5c669f452f71d6889deb1d5b_Siegel-Fair-Unterwegs-Movinga.png"
              height="75" alt="" /></a></div>
            <div className="column-icon-trusted-shop-2 w-col w-col-3"><a href="#" className="link-badges w-inline-block"><img
              src="https://assets-global.website-files.com/5e1c72a86a0073eba5f27dfa/5e1c72a86a00732e6ef27f61_kunden-empehlung.svg"
              height="75" alt="" /></a></div>
            <div className="column-icon-trusted-shop-2 w-col w-col-3"><a href="#" className="link-badges w-inline-block"><img
              src="https://assets-global.website-files.com/5e1c72a86a0073eba5f27dfa/5e1c72a86a00734f54f27f54_IAM.svg"
              height="60" alt="" /></a></div>
            <div className="column-icon-trusted-shop-2 w-col w-col-3">
              <div className="div-block-215">
                <div className="text-block-21">Bekannt aus dem TV</div><a href="#"
                  className="link-badges w-inline-block w-clearfix"><img
                    src="https://assets-global.website-files.com/5a857fcd20c95100013eacc2/5b61b796dcbf28850904c218_channels-1.png"
                    height="42" alt="certificates-item" className="image-58" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MovingaDE
