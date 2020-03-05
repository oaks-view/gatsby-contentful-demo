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

function normalizeBody(body) {
  if (!body) return null

  const html = remark()
    .use(remarkHtml)
    .processSync(body).contents

  return { body, childMarkdownRemark: { html } }
}

function normalizeData(data) {
  const contentfulType = capitalize(get(data, 'sys.contentType.sys.id'))

  if (!contentfulType) {
    console.error(`Couldn't get contentful type`, data)
    throw new Error(`Couldn't get contentful type`)
  }

  // we standardize long text fields name as `body` whenever a `body` is present we parse its content with remark
  const { blocks = [], body, ...fields } = data.fields || {}

  const normalizeBlock = block => normalizeData(block)

  let result = {
    internal: { type: `Contentful${contentfulType}` },
    ...fields,
    ...(body && { body: normalizeBody(body) }),
    ...(blocks.length && {
      blocks: blocks.map(normalizeBlock),
    }),
  }

  return result
}

const PreviewWrapper = props => {
  const [entryId, setEntryId] = React.useState(props.entryId)
  const [data, setData] = React.useState()
  const [lang, setLang] = React.useState()
  const [loading, setLoading] = React.useState(false)

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
    `
  )

  const client = getContentfulClient({ config })

  React.useEffect(() => {
    setLoading(true)
    client
      .getEntry(props.entryId, { locale: lang || defaultLangKey })
      .then(entry => {
        setEntryId(props.entryId)
        setData(normalizeData(entry))
        setLoading(false)
      })
      .catch(console.error)
  }, [entryId, lang])

  // TODO enable support for children prop and add it to propTypes
  const Component = props.component

  return (
    <>
      <Box height="10px">{loading && <LinearProgress color="secondary" />}</Box>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          component={Typography}
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={2}
          variant="h4"
        >
          {props.type} Preview
          <IconButton
            onClick={() => {
              setEntryId(null)
            }}
          >
            <ReplayIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center">
          {langs.map(lan => (
            <Typography
              key={lan}
              style={{ padding: '0 5px', cursor: 'pointer' }}
              variant={lan === (lang || defaultLangKey) ? 'h6' : 'body2'}
              onClick={() => setLang(lan)}
            >
              {lan}
            </Typography>
          ))}
        </Box>
      </Box>
      {data && (
        <Box style={{ border: '1px solid #dbdbdb' }}>
          <Component {...data} lang={lang} />
        </Box>
      )}
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
