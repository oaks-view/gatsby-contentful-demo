import React from 'react'
import { Link, graphql } from 'gatsby'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import theme from '../themes/city'
import SEO from '../components/seo'
import Footer from '../components/CityFooter'

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}))

const meta = {
  title: 'Movinga | The new way of moving',
  description:
    'With Movinga, moving is as easy and convenient as never before. Book your move according to your needs with just a few clicks. Our qualified moving teams are at your side throughout Germany. Thanks to modern technology, moving with us is cheap and economical.',
  meta: [{ name: 'twitter:card', content: 'summary' }],
}

const HomePage = ({ data }) => {
  const classes = useStyles()
  const pages = get(data, 'allContentfulPage.edges')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box mt={5} width="100%">
        <SEO {...meta} />
        <Container maxWidth="md">
          {pages.map(({ node }, i) => (
            <ul key={i}>
              <li>
                <Link to={node.path} className={classes.link}>
                  {node.path} - {node.title}
                </Link>
              </li>
            </ul>
          ))}
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  )
}

export default HomePage

export const query = graphql`
  query HomeQuery {
    allContentfulPage(filter: { path: { regex: "/^/umzug/" }, node_locale: { eq: "de" } }) {
      edges {
        node {
          id
          title
          path
        }
      }
    }
  }
`
