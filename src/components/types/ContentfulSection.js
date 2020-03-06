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

  // when displaying a section within tabs, hide title
  const hideTitle = get(props, 'caller.ContentfulSection.hideTitle', false)

  const Section = () => (
    <>
      {!hideTitle && props.title && (
        <Box
          component={Typography}
          component="h2"
          display="flex"
          justifyContent="center"
          color="primary.main"
          mt={0}
        >
          {props.title}
        </Box>
      )}
      {props.blocks && (
        <Box
          component={Grid}
          container
          width="100%"
          my={3}
          spacing={2}
          className={classes.root}
        >
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
                  <BlockComponent {...block} />
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

  return (
    <Box
      className={`${classes.root} ${classes.bgImage} ${props.className || ''}`}
    >
      {props.parentBlock ? (
        <Container maxWidth="md">
          <Section />
        </Container>
      ) : (
        <Section />
      )}
    </Box>
  )
}

export default ContentfulSection
