import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import { useStaticQuery, graphql } from "gatsby"
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'

const contentful = require("contentful");

function CardPreview(props) {
    const [card, setCard] = useState()
    const [entryId, setEntryId] = useState();

    const { site: { siteMetadata: { contentfulConfig } } } = useStaticQuery(
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
        host: "preview.contentful.com"
    });

    useEffect(() => {
        client.getEntry(props.entryId)
            .then((entry) => {
                console.log(entry)
                setEntryId(props.entryId)
                setCard(entry)
            })
            .catch(console.error)
    }, [entryId])

    return (<>
        <Box component={Typography} display="flex" alignItems="center"
            justifyContent="center" py={4} variant='h4'>
            Card Preview
            <IconButton onClick={() => { setEntryId(null) }}>
                <ReplayIcon fontSize="large" />
            </IconButton>
        </Box>
        {card && <Box component={Typography} variant='body1'>{JSON.stringify(card, null, 2)}</Box>}
    </>)
}

export default CardPreview