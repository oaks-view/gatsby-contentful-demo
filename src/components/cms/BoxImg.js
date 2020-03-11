import React from 'react'
import clsx from 'clsx'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStylesBoxImg = makeStyles(theme => ({
  root: props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    ...(props.src && {
      backgroundImage: `url('${src}')`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
    }),
    '& h1, & h2': {
      color: theme.palette.common.white,
      textShadow: '1px 1px 4px rgba(0, 0, 0, .5)',
    },
    '& h1': {
      fontSize: 40,
      paddingBottom: theme.spacing(2),
    },
  }),
}))

/*
  <BoxImg src="" height="">
    <Title></Title>
    <Subtitle></Subtitle>
  </BoxImg>
*/
const BoxImg = ({ children, className = '', ...props }) => {
  const classes = useStylesBoxImg(props)

  return (
    <Box width="100%" className={clsx(classes.root, className)} {...props}>
      {children}
    </Box>
  )
}

export default BoxImg
