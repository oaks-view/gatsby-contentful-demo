import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStaticQuery, graphql } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import * as contentful from 'contentful'
import * as _ from 'lodash'
import ContentfulSection from '../types/ContentfulSection'
import { normalizeEntry } from '../../utils/previewHelper'

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
      .getEntry(props.entryId, {
        content_type: 'section',
        locale: 'de',
        include: 5, // indicates how many level to go when retrieving links. max is 10
      })
      .then(entry => {
        setEntryId(props.entryId)

        const normalisedSection = normalizeEntry(entry)
        setSection(normalisedSection)
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
      {section && <ContentfulSection {...section} />}
    </>
  )
}

export default SectionPreview
