import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStaticQuery, graphql } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'

const contentful = require('contentful')

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
        setSection(entry)
        console.log(entry)
      })
      .catch(console.error)
  }, [entryId])

  return (
    <>
      <Box
        ox
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
