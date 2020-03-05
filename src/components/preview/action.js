import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { useStaticQuery, graphql } from 'gatsby'
import * as _ from 'lodash'
import ReplayIcon from '@material-ui/icons/Replay'

const contentful = require('contentful')
import ContentfulAction from '../types/ContentfulAction'

function ActionPreview(props) {
  const [action, setAction] = useState()

  const {
    site: {
      siteMetadata: { contentfulConfig },
    },
  } = useStaticQuery(
    graphql`
      query ActionPreviewQuery {
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
        console.log('entry => %j', entry)

        const imageUrl = _.get(entry.fields, 'image.fields.file.url')

        const contenfulAction = {
          ...entry.fields,
          ...(imageUrl && { image: { file: { url: imageUrl } } }),
        }

        setAction(contenfulAction)
      })
      .catch(console.error)
  }, [action])

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
        Action Preview
        <IconButton
          onClick={() => {
            setAction(null)
          }}
        >
          <ReplayIcon fontSize="large" />
        </IconButton>
      </Box>
      {action && <ContentfulAction {...action} />}
    </>
  )
}

export default ActionPreview
