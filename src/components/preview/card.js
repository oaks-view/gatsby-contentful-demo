import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useStaticQuery, graphql } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import * as contentful from 'contentful'
import * as _ from 'lodash'
import ContentfulCard from '../types/ContentfulCard'

import { normalizeEntry } from '../../utils/previewHelper'

function CardPreview(props) {
  const [card, setCard] = useState()
  const [entryId, setEntryId] = useState()

  const {
    site: {
      siteMetadata: { contentfulConfig },
    },
  } = useStaticQuery(
    graphql`
      query CardPreviewQuery {
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

        const normalisedCard = normalizeEntry(entry)
        setCard(normalisedCard)
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
        Card Preview
        <IconButton
          onClick={() => {
            setEntryId(null)
          }}
        >
          <ReplayIcon fontSize="large" />
        </IconButton>
      </Box>
      {card && <ContentfulCard {...card} />}
    </>
  )
}

export default CardPreview
