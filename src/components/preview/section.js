import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStaticQuery, graphql } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import * as contentful from 'contentful'
import * as _ from 'lodash'
import remark from 'remark'
import html from 'remark-html'
import ContentfulSection from '../types/ContentfulSection'

function parseBody(body) {
  const value = remark()
    .use(html)
    .processSync(body)

  return value.contents
}

function normaliseContentfulSection(contentfulSection) {
  const { fields } = contentfulSection

  const normalisedContent = {
    ...fields,
    internal: {
      type: 'ContentfulSection',
    },
  }

  const { body, backgroundImage } = fields

  if (backgroundImage) {
    normalisedContent.backgroundImage = {
      file: { url: backgroundImage.fields.file.url },
    }
  }

  if (body) {
    console.log(body)
    const html = parseBody(body)
    normalisedContent.body = {
      body,
      childMarkdownRemark: {
        html,
      },
    }
  }

  return normalisedContent
}

function SectionPreview(props) {
  const [section, setSection] = useState()
  const [entryId, setEntryId] = useState()

  const {
    site: {
      siteMetadata: { contentfulConfig },
    },
  } = useStaticQuery(
    graphql`
      query SectionPreviewQuery {
        site {
          siteMetadata {
            contentfulConfig {
              spaceId
              accessToken
            }
          }
        }
      }
    `
  )

  const client = contentful.createClient({
    space: contentfulConfig.spaceId,
    accessToken: contentfulConfig.accessToken,
    host: 'preview.contentful.com',
  })

  useEffect(() => {
    client
      .getEntry(props.entryId)
      .then(entry => {
        setEntryId(props.entryId)

        const normalisedSection = normaliseContentfulSection(entry)
        setSection(normalisedSection)
        // console.log(entry)
      })
      .catch(console.error)
  }, [entryId])

  return (
    <>
      <Box
        component={Typography}
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={4}
        variant="h4"
      >
        Preview Section
        <IconButton
          onClick={() => {
            setEntryId(null)
          }}
        >
          <ReplayIcon fontSize="large" />
        </IconButton>
      </Box>
      {section && (
        <Box component={Typography} variant="body1">
          {JSON.stringify(section, null, 2)}
        </Box>
      )}
    </>
  )
}

export default SectionPreview
