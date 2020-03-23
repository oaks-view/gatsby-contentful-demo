import React from "react";
import PropTypes from "prop-types";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import SEO from "../components/SEO";
import theme from "../themes/theme";
import CMSLib from "../components/cms";

const useStyles = makeStyles(theme => ({
  root: props => ({
    padding: theme.spacing(5, 0),
    ...((props.template === 'single column') && { border: '20px solid #ccc'}),
    ...((props.template === 'two columns') && { borderLeft: '20px solid red', borderRight: '20px solid blue' }),
  })
}));

const Section = ({ body, template }) => {
  const classes = useStyles({ template });

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <MDXRenderer>{body}</MDXRenderer>
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
    template,
    // category,
    sections,
    // hero,
    // body,
    seoNoIndex,
    seoCanonical,
    seoAlternate
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
          <Section key={i} body={body} template={template}/>
        ))}
      </MDXProvider>
    </ThemeProvider>
  );
};

CityTemplate.propTypes = {
  lang: PropTypes.string,
  sections: PropTypes.array
};

export default CityTemplate;
