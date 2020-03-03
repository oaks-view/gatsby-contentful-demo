import React from 'react'
import { Link, graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import SEO from '../components/seo'

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
    <Box mt={5}>
      <SEO {...meta} />
      <Container maxWidth="md">
        {pages.map(({ node }) => (
          <ul key={node.slug}>
            <li>
              <Link to={`/umzug/${node.slug}`} className={classes.link}>
                {node.slug} - {node.title}
              </Link>
            </li>
          </ul>
        ))}
      </Container>
    </Box>
  )
}

export default HomePage

export const query = graphql`
  query HomeQuery {
    allContentfulPage(
      filter: { slug: { in: ["hamburg", "berlin"] }, node_locale: { eq: "de" } }
    ) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`
