import React from "react";
import PropTypes from "prop-types";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SEO from "../components/SEO";
import theme from "../themes/theme";
import CMSLib from "../components/cms";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 0),
    "&:nth-child(even)": {
      backgroundColor: "#F8F9FB"
    }
  }
}));

const Section = ({ body }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <MDXRenderer>{body}</MDXRenderer>
      </Container>
    </Box>
  );
};

// just for the demo to display all active pages by country/lang
const renderPaths = pages => {
  return (
    <Box py={5}>
      <Container maxWidth="md">
        <Typography variant="h5" component="h2" color="inherit">
          Pages by country and language
        </Typography>
        {Object.keys(pages).map(country => (
          <Grid container key={country}>
            {Object.keys(pages[country]).map((lang, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <h3>
                  {country}/{lang}
                </h3>
                <ul>
                  {pages[country][lang].map((path, i) => (
                    <li key={i}>{path}</li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
        ))}
      </Container>
    </Box>
  );
};

const CityTemplate = ({ pageContext }) => {
  // TODO use commented SEO fields, hero, body, ...
  const {
    // pagePath,
    country,
    lang,
    seoTitle,
    seoDescription,
    // template,
    // category,
    sections,
    // hero,
    // body,
    seoNoIndex,
    seoCanonical,
    seoAlternate,
    pagesByCountry
  } = pageContext;

  const locale = `${lang}_${country.toUpperCase()}`;

  // TODO see seo related
  // - https://ogp.me/
  // - https://moz.com/learn/seo/canonicalization (view-source:)
  // - http://www.localeplanet.com/icu/en/index.html (locales)
  const meta = [
    {
      property: "robots",
      content: seoNoIndex ? "noindex, nofollow" : "all"
    },
    {
      property: "og:locale",
      content: locale
    }
  ];

  const links = [];
  if (seoCanonical) {
    links.push({ rel: "canonical", href: seoCanonical });
  }
  if (seoAlternate) {
    links.push({ rel: "alternate", href: seoAlternate });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO
        lang={locale}
        link={links}
        title={seoTitle}
        description={seoDescription}
        meta={meta}
      />
      <MDXProvider components={CMSLib}>
        {sections.map((body, i) => (
          <Section key={i} body={body} />
        ))}
      </MDXProvider>
      {renderPaths(pagesByCountry)}
    </ThemeProvider>
  );
};

CityTemplate.propTypes = {
  lang: PropTypes.string,
  sections: PropTypes.array
};

export default CityTemplate;
