/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

// TODO: remove header that came with material-ui boilerplate. Each template may define its own header.
// maybe this layout file can be removed alltogether and templates define the header
const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div style={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              paddingTop: 65,
            }}
          >
            <main>{children}</main>
            <footer style={{ paddingTop: 10 }}>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </footer>
          </div>
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
