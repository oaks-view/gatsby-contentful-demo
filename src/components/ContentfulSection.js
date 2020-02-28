import React from 'react'
import * as PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import ContentfulCard from '../components/ContentfulCard'

// TODO: Display list of Cards of a given Section
const PageComponents = {
  ContentfulCard,
}

const bgImgPros = img => {
  if (!img) return {}
  return {
    backgroundImage: `url('${img.file.url}')`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    height: 600,
    width: '70%',
  }
}

const titlePosition = pos => {
  return {
    left: { justifySelf: 'flex-start', alignSelf: 'flex-start' },
    center: { justifySelf: 'center', alignSelf: 'center' },
    right: { justifySelf: 'flex-end', alignSelf: 'flex-end' },
  }[pos || 'center']
}

// TODO add prop to model to differentiate sections (banner, tabs, list, generic)

// TODO add material-ui theme, responsive fonts, responsiveness. see trolley example

// const useStyles = makeStyles(theme => ({}))

const ContentfulSection = props => {
  // const classes = useStyles()
  console.log(props)
  console.log(titlePosition(props.titlePosition))
  return (
    <Box
      width="100%"
      style={{
        ...bgImgPros(props.backgroundImage),
      }}
      display="flex"
      flexDirection={props.orientation || 'row'}
    >
      {/* TODO: Handle title position left|center|right. map align-self to them */}
      <Box
        component={Typography}
        variant="h2"
        component="h2"
        {...titlePosition(props.titlePosition)}
        color={props.backgroundImage ? '#fff' : 'primary'}
      >
        {props.title}
      </Box>
    </Box>
  )
}

export default ContentfulSection
