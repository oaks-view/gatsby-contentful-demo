import React from 'react'
import JsxParser from 'react-jsx-parser'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { SectionContext } from '../context'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SEO from '../components/SEO'
import theme from '../themes/theme'
import CMSLib from '../components/cms'

const useStyles = makeStyles(theme => ({
  root: props => ({
    padding: theme.spacing(5, 0),
    '&:nth-child(even)': {
      backgroundColor: '#F8F9FB',
    },
    ...(props.template === 'single column' && { border: '20px solid #ccc' }),
    ...(props.template === 'two columns' && {
      borderLeft: '20px solid red',
      borderRight: '20px solid blue',
    }),
  }),
}))

const RootSection = props => {
  const classes = useStyles(props)
  const { name, body } = props

  let jsx = body ? body.childMarkdownRemark.html : null

  return (
    <Box id={name} className={classes.root}>
      {body && (
        <Container maxWidth="md">
          <JsxParser components={{ ...CMSLib }} jsx={jsx} renderInWrapper={false} />
        </Container>
      )}
    </Box>
  )
}

// const Section = ({ body, template }) => {
//   const classes = useStyles({ template })

//   return (
//     <Box className={classes.root}>
//       <Container maxWidth="md">
//         <MDXRenderer>{body}</MDXRenderer>
//       </Container>
//     </Box>
//   )
// }

// just for the demo to display all active pages by country/lang
// const renderPaths = pages => {
//   return (
//     <Box py={5}>
//       <Container maxWidth="md">
//         <Typography variant="h5" component="h2" color="inherit">
//           Pages - Country and Language
//         </Typography>
//         <Grid container>
//           {Object.keys(pages).map((countryLang, i) => (
//             <Grid item xs={12} sm={6} key={i}>
//               <h3>Pages in {countryLang}</h3>
//               {pages[countryLang].map((path, i) => (
//                 <li key={i}>{path}</li>
//               ))}
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   )
// }

const CityTemplate = props => {
  const ctx = props.pageContext
  const locale = `${ctx.lang}_${ctx.country.toUpperCase()}`

  // TODO see seo related
  // - https://ogp.me/
  // - https://moz.com/learn/seo/canonicalization (view-source:)
  // - http://www.localeplanet.com/icu/en/index.html (locales)
  const meta = [
    {
      property: 'robots',
      content: ctx.robots_no_index ? 'noindex, nofollow' : 'all',
    },
    {
      property: 'og:locale',
      content: locale,
    },
  ]

  const links = []
  if (ctx.seo_canonical) {
    links.push({ rel: 'canonical', href: ctx.seo_canonical })
  }
  if (ctx.seo_alternate) {
    links.push({ rel: 'alternate', href: ctx.seo_alternate })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO lang={locale} link={links} title={ctx.seo_title} description={ctx.seo_description} meta={meta} />
      {/* <JsxParser components={{ ...CMSLib }} jsx={body} renderInWrapper={false} /> */}
      {/* <MDXProvider components={CMSLib}> */}
      {/* {ctx.sections.map((body, i) => (
          <Section key={i} body={body} template={ctx.template} />
        ))} */}

      {/* {ctx.sections.map((body, i) => (
        <JsxParser key={i} components={{ ...CMSLib }} jsx={body} renderInWrapper={false} />
      ))} */}

      {ctx.sections.map((section, i) => (
        <SectionContext.Provider key={i} value={section}>
          <RootSection {...section} />
        </SectionContext.Provider>
      ))}
      {/* </MDXProvider> */}
      {/* {renderPaths(ctx.pagesByCountry)} */}
    </ThemeProvider>
  )
}

export default CityTemplate
