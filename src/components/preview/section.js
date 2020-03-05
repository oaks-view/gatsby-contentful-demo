import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStaticQuery, graphql } from 'gatsby'

const contentful = require('contentful')

function SectionPreview(props) {
  const [section, setSection] = useState()

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
      .getEntry(props.entry_id)
      .then(entry => {
        console.log(entry)
        setSection(entry)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <h1>Section Preview</h1>
      <Box
        component={Typography}
        display="flex"
        justifyContent="center"
        py={4}
        variant="h4"
      >
        Preview Section <b>"{props.entry_id}"</b>
      </Box>
      {section && (
        <Box component={Typography} variant="body1">
          {JSON.stringify(section, null, 2)}>
        </Box>
      )}
    </>
  )
}

export default SectionPreview
