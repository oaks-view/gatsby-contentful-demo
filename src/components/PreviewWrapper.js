import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useStaticQuery, graphql } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import * as contentful from 'contentful'
import remark from 'remark'
import remarkHtml from 'remark-html'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'

import templates from '../templates'

// how many levels Contentful should resolve
const LINKS_LEVEL = 6
// const pages = { home: HomeTemplate, city: CityTemplate, custom: CustomTemplate }
const pages = { custom: templates.CustomTemplate }

function normalizeBody(body) {
  if (!body) return null

  const html = remark()
    .use(remarkHtml)
    .processSync(body).contents

  return { body, childMarkdownRemark: { html } }
}

function supportedPage(props) {
  return props && props.internal.type === 'ContentfulPage' && Object.keys(pages).includes(props.template)
}

function normalizeData(data) {
  const contentfulType = capitalize(get(data, 'sys.contentType.sys.id'))

  if (!contentfulType) {
    console.error(`Couldn't get contentful type`, data)
    throw new Error(`Couldn't get contentful type`)
  }

  // we standardize long text fields name as `body` whenever a `body` is present we parse its content with remark
  // TODO maybe standardize asset fiel. instead of image,backgroundImage just name image|asset|file
  // TODO we only handle single file now. handle list of images when available
  const { blocks = [], body, image, backgroundImage, ...fields } = data.fields

  const normalizeBlock = block => normalizeData(block)

  let result = {
    internal: { type: `Contentful${contentfulType}` },
    ...fields,
    ...(body && { body: normalizeBody(body) }),
    ...(image && { image: { ...image.fields } }),
    ...(backgroundImage && { backgroundImage: { ...backgroundImage.fields } }),
    ...(blocks.length && {
      blocks: blocks.map(normalizeBlock),
    }),
  }

  return result
}

const PreviewWrapper = props => {
  const {
    site: {
      siteMetadata: {
        contentfulConfig: config,
        languages: { langs, defaultLangKey },
      },
    },
  } = useStaticQuery(
    graphql`
      query WrapperPreviewQuery {
        site {
          siteMetadata {
            languages {
              langs
              defaultLangKey
            }
            contentfulConfig {
              spaceId
              accessToken
            }
          }
        }
      }
    `,
  )

  const [entryId, setEntryId] = React.useState(props.entryId)
  const [data, setData] = React.useState()
  const [lang, setLang] = React.useState(defaultLangKey)
  const [loading, setLoading] = React.useState(false)

  const client = getContentfulClient({ config })

  React.useEffect(() => {
    if (!data || !data[lang]) {
      setLoading(true)
      const locale = lang || defaultLangKey
      client
        .getEntry(props.entryId, { locale, include: LINKS_LEVEL })
        .then(entry => {
          setEntryId(props.entryId)
          // setData(normalizeData(entry))
          setData({ ...data, [locale]: normalizeData(entry) })
          setLoading(false)
        })
        .catch(console.error)
    }
  }, [entryId, data, lang])

  const langData = data && data[lang]
  let PreviewComponent

  if (langData) {
    if (langData.internal.type === 'ContentfulPage') {
      if (Object.keys(pages).includes(langData.template)) {
        const Page = pages[langData.template]
        PreviewComponent = () => <Page data={{ contentfulPage: { ...langData } }} />
      } else {
        PreviewComponent = () => (
          <Typography variant="body1" align="center">
            Page <b>{langData.title}</b> not supported. To enable this page enter a <i>path</i>, select a{' '}
            <i>template</i> and add <i>sections</i>.
          </Typography>
        )
      }
    } else {
      PreviewComponent = () => (
        <Typography variant="body1" align="center">
          Page <b>No preview support for {langData.title}</b>.
        </Typography>
      )
    }
  }

  return (
    <>
      <div>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          position="sticky"
          bgcolor="#fff"
          top={0}
        >
          <Box component={Typography} display="flex" alignItems="center" justifyContent="center" variant="h4">
            {capitalize(props.type)} Preview
            <IconButton onClick={() => setData(null)}>
              <ReplayIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" px={2}>
            {langs.map(lan => (
              <Typography
                key={lan}
                style={{ padding: '0 5px', cursor: 'pointer' }}
                variant={lan === lang ? 'h6' : 'body2'}
                onClick={() => setLang(lan)}
              >
                {lan}
              </Typography>
            ))}
          </Box>
        </Box>
        <div style={{ height: 4 }}>{loading && <LinearProgress color="secondary" />}</div>
      </div>
      {PreviewComponent && <PreviewComponent />}
    </>
  )
}

PreviewWrapper.propTypes = {
  entryId: PropTypes.string,
  component: PropTypes.elementType,
  type: PropTypes.string,
}

export default PreviewWrapper

function getContentfulClient({ config, preview = true }) {
  return contentful.createClient({
    space: config.spaceId,
    accessToken: config.accessToken,
    host: `${preview ? 'preview' : 'cdn'}.contentful.com`,
  })
}
