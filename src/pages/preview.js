import React from 'react'
import { Router } from '@reach/router'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import SectionPreview from '../components/preview/section'
import ActionPreview from '../components/preview/action'
import CardPreview from '../components/preview/card'

// only considering the theme for city template
// TODO use a more generic one once we have more templates
import theme from '../themes/city'

const Preview = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box width="100%" mt={2}>
        <Container maxWidth="md">
          <Router basepath="/preview">
            <SectionPreview path="/section/:entryId" />
            <ActionPreview path="/action/:entryId" />
            <CardPreview path="/card/:entryId" />
            {/* Todo handle default routes */}
            {/*<Default path="/" /> */}
          </Router>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Preview
