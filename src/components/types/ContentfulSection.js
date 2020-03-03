import React from 'react'
import * as PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { getPosition, getBlockComponent } from '../../utils'

const useStyles = makeStyles(theme => ({
  root: props => ({
    width: '100%',
    display: 'flex',
    flexDirection: props.orientation || 'column',
    padding: '50px 0',
    backgroundColor: props.backgroundColor || 'inherit',
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

  return (
    <Box className={`${classes.root} ${classes.bgImage} ${props.className || ''}`}>
      <Container maxWidth="md">
        {props.title && (
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
          <Box component={Grid} container width="100%" my={3} spacing={3}>
            {props.blocks.map((block, i) => {
              try {
                const { BlockComponent } = getBlockComponent(block)
                const blockProps = {
                  display: 'flex',
                  flexDirection: block.orientation || 'column',
                  xs: block.orientation !== 'row',
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
      </Container>
    </Box>
  )
}

export default ContentfulSection
