import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { getBlockComponent } from '../../utils'

const useStyles = makeStyles(theme => ({
  root: props => ({
    width: '100%',
    display: 'flex',
    flexDirection: props.orientation || 'column',
    padding: get(props, `caller.ContentfulSection.padding`, '50px 0'),
  }),
  bgImage: ({ backgroundImage: img }) =>
    img
      ? {
          backgroundImage: `url('${img.file.url}')`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }
      : {},
}))

// TODO rethink titlePosition field. for now we hardcode position as `justifyPosition=center`

const ContentfulSection = props => {
  const classes = useStyles(props)

  const caller = {
    ContentfulSection: {
      // remove padding on nested sections
      padding: 0,
    },
  }

  // when displaying a section within tabs, hide title
  const hideTitle = get(props, 'caller.ContentfulSection.hideTitle', false)

  const Section = () => (
    <>
      {!hideTitle && props.title && (
        <Box
          component={Typography}
          component="h3"
          display="flex"
          justifyContent="center"
          color="primary.main"
          my={3}
        >
          {props.title}
        </Box>
      )}
      {props.blocks && (
        <Box component={Grid} container width="100%" my={3} spacing={2}>
          {props.blocks.map((block, i) => {
            try {
              const { BlockComponent } = getBlockComponent(block)
              const blockProps = {
                display: 'flex',
                flexDirection: block.orientation || 'column',
                xs: 12, // by default on mobile stack element upon each other. TODO: add config on contentful for mobile?
                sm: block.orientation !== 'row',
              }
              return (
                <Box component={Grid} item key={`b-${i}`} {...blockProps}>
                  <BlockComponent {...block} caller={caller} />
                </Box>
              )
            } catch (error) {
              console.error(error)
              return (
                <Box component={Grid} item width="100%" bgcolor="#FDECEA">
                  <Typography variant="subtitle1">
                    ERROR: {error.message}
                  </Typography>
                </Box>
              )
            }
          })}
        </Box>
      )}
    </>
  )

  // only first level is rendered with Container as wrapper
  return (
    <Box
      className={`${classes.root} ${classes.bgImage} ${props.className || ''}`}
    >
      {get(props, `caller.ContentfulSection`) ? (
        <Section />
      ) : (
        <Container maxWidth="md">
          <Section />
        </Container>
      )}
    </Box>
  )
}

export default ContentfulSection
