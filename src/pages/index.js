import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import theme from '../themes/theme'
import SEO from '../components/SEO'
import Footer from '../components/Footer'

const meta = {
  title: 'Movinga | The new way of moving',
  description:
    'With Movinga, moving is as easy and convenient as never before. Book your move according to your needs with just a few clicks. Our qualified moving teams are at your side throughout Germany. Thanks to modern technology, moving with us is cheap and economical.',
  meta: [{ name: 'twitter:card', content: 'summary' }],
}

const HomePage = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box mt={5} width="100%" textAlign="center" my={5}>
      <SEO {...meta} />
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" color="primary">
          Welcome to Movinga
        </Typography>
        <Typography component="h4" variant="h5" color="inherit">
          Removals are more than our job, they are our passion. In order to share this passion, we’ve made it our
          mission to provide exceptional removals at fair prices.
        </Typography>
      </Container>
    </Box>
    <Footer />
  </ThemeProvider>
)

export default HomePage
