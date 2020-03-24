// TODO handle preview with MDX before enabling this wrapper
//
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
const pageCategories = { city: templates.CityTemplate }

function normalizeBody(body) {
  if (!body) return null

  // TODO replace remark with MDX
  const html = remark()
    .use(remarkHtml)
    .processSync(body).contents

  return { childMarkdownRemark: { html } }
}

function normalizeData(data) {
  const contentfulType = capitalize(get(data, 'sys.contentType.sys.id'))

  if (!contentfulType) {
    console.error(`Couldn't get contentful type`, data)
    throw new Error(`Couldn't get contentful type`)
  }

  // body contains our custom CMS tags, bultin HTML and markdown. first it runs through markdown parser
  // blocks are for page sections and need to recursively normalized
  // TODO maybe standardize asset fiel. instead of image,backgroundImage just name image|asset|file
  const { sections = [], body, ...fields } = data.fields

  let result = {
    internal: { type: `Contentful${contentfulType}` },
    ...fields,
    ...(body && { body: normalizeBody(body) }),
    ...(sections.length && {
      sections: sections.map(section => normalizeData(section)),
    }),
  }

  return result
}

const PreviewWrapper = props => {
  const {
    site: {
      siteMetadata: { contentfulConfig: config },
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

  const [entryId, setEntryId] = React.useState(props.entryId)
  const [data, setData] = React.useState()
  const [loading, setLoading] = React.useState(false)

  const client = getContentfulClient({ config })

  React.useEffect(() => {
    if (!data) {
      setLoading(true)
      client
        .getEntry(props.entryId, { include: LINKS_LEVEL })
        .then(entry => {
          setEntryId(props.entryId)
          setData({ ...data, ...normalizeData(entry) })
          setLoading(false)
        })
        .catch(console.error)
    }
  }, [entryId, data])

  let PreviewComponent

  if (data) {
    if (data.internal.type === 'ContentfulPage') {
      const [country, lang] = data.path.substring(1).split('/')
      if (Object.keys(pageCategories).includes(data.category)) {
        const Page = pageCategories[data.category]
        PreviewComponent = () => <Page pageContext={{ ...data, country, lang }} />
      } else {
        PreviewComponent = () => (
          <Typography variant="body1" align="center">
            Page <b>{data.category}</b> not supported. To enable this page enter a <i>path</i>, select a <i>template</i>{' '}
            and add <i>sections</i>.
          </Typography>
        )
      }
    } else {
      PreviewComponent = () => (
        <Typography variant="body1" align="center">
          Page <b>No preview support for {data.title}</b>.
        </Typography>
      )
    }
  }

  return (
    <>
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
      </Box>
      <div style={{ height: 4 }}>{loading && <LinearProgress color="secondary" />}</div>
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
