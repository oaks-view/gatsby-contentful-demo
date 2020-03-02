import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import MovingaLogo from '../MovingaLogo'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 600,
  },
  banner: ({ backgroundImage: img }) =>
    img
      ? {
          backgroundImage: `url('${img.file.url}')`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }
      : {},
  text: props => ({
    display: 'flex',
    flexDirection: props.orientation || 'column',
    '& > *': {
      marginLeft: '10%',
    },
  }),
  image: {
    height: 30,
    color: 'white',
    marginTop: theme.spacing(2),
  },
  title: {
    maxWidth: '65%',
    textShadow: '1px 1px 4px rgba(0, 0, 0, .5)',
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      height: 'auto',
    },
    title: {
      fontSize: '30px',
    },
  },
}))

const ContentfulSection = props => {
  const classes = useStyles(props)

  return (
    <Box component={Grid} container className={classes.root} height="100%">
      <Box
        component={Grid}
        item
        sm={12}
        md={8}
        className={`${classes.banner} ${classes.text}`}
      >
        <div className={classes.image}>
          <MovingaLogo style={{ height: '100%' }} />
        </div>
        <Box
          component={Typography}
          className={classes.title}
          mt="6%"
          variant="h1"
          component="h1"
          color="white"
        >
          {props.title}
        </Box>
      </Box>
      <Box
        component={Grid}
        item
        sm={12}
        md={4}
        bgcolor="white"
        height="100%"
      >
        <Typography component="h5">leadgen form</Typography>
      </Box>
    </Box>
  )
}

export default ContentfulSection
