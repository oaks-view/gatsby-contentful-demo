# gatsby-contentful-demo
In this demo we built a simple [Gatsby site](https://www.gatsbyjs.com/) powered by a **Headless CMS** [Contentful](https://www.contentful.com/)

Basically we built built the homepage of the following site https://www.movinga.com/ using Gatsby. Then we stored and
managed the contents on Contentful.
To view the demo just visit the following link https://build-57cd8f98-ac25-45b0-9b72-26f8de56a8a9.gtsb.io/.


Static sites are scalable, secure and have very little required maintenance. They come with a drawback though. Not everybody feels good editing files, building a project and uploading it somewhere. This is where Contentful comes into play.

With Contentful and Gatsby you can connect your favorite static site generator with an API that provides an easy to use interface for people writing content and automate the publishing using services like [Travis CI](https://travis-ci.org/) or [Netlify](https://www.netlify.com/).


- [gatsby-starter-material-ui](https://www.gatsbyjs.org/starters/dominicabela/gatsby-starter-material-ui/)

#### TODO

- [ ] Consider using gatsby-mdx plugin to parse markdown and jsx from Contentful. Using it would result in replacing `react-jsx-parser`.
      Right now our current setup doesnt support parsing markdown within tags. mdx supports that.
  - [ ] See gatsby-mdx contentful example in the [mdx plugin repository](https://github.com/ChristopherBiscardi/gatsby-mdx/tree/master/examples/using-contentful)
  - [ ] Confirm that with gatsby-mdx that production common.js bundle is smaller, 60kb. With `react-jsx-parser` this bundle is around 107kb


