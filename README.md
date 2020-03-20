# gatsby-contentful-demo

In this demo we built a simple [Gatsby site](https://www.gatsbyjs.com/) powered by a **Headless CMS** [Contentful](https://www.contentful.com/)

Basically we built built the homepage of the following site https://www.movinga.com/ using Gatsby. Then we stored and
managed the contents on Contentful.
To view the demo just visit the following link https://build-57cd8f98-ac25-45b0-9b72-26f8de56a8a9.gtsb.io/.

Static sites are scalable, secure and have very little required maintenance. They come with a drawback though. Not everybody feels good editing files, building a project and uploading it somewhere. This is where Contentful comes into play.

With Contentful and Gatsby you can connect your favorite static site generator with an API that provides an easy to use interface for people writing content and automate the publishing using services like [Travis CI](https://travis-ci.org/) or [Netlify](https://www.netlify.com/).

- [gatsby-starter-material-ui](https://www.gatsbyjs.org/starters/dominicabela/gatsby-starter-material-ui/)

#### TODO

- [ ] remove boilerplate files like `bin/*` and packages related
- [ ] If we host our site on S3 we need to make sure [this issue](https://github.com/gatsbyjs/gatsby/issues/15080) doesn't affect us.
      If so we'd have to use [`jaredsilver's solution`](https://github.com/gatsbyjs/gatsby/issues/15080#issuecomment-514285964).
      So far we haven't had that issue cause Netlify seems to handle that for us
