import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

// When there's a bg image the text color is set to white
const useStyles = makeStyles(theme => ({
  root: props => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
    ...(props.src && {
      background: `linear-gradient(rgba(0, 0, 0, ${props.darken}), rgba(0, 0, 0, ${props.darken})), url('${props.src}')`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      backgroundAttachment: props.fixed ? 'fixed' : 'inherit',
    }),
    '& *': {
      color: theme.palette.common.white,
    },
    '& h1, & h2': {
      textShadow: '1px 1px 4px rgba(0, 0, 0, .5)',
    },
  }),
}))

/**
 * props:
 *  - src
 *  - children
 *  - darken (number; 0 = no darkness, 0.5 is 50% dark, 1 is black)
 *  - fixed (boolean)
 *  - height
 *
 *
 * <BgImage src="" height="" darken="" fixed>
 *   <Title></Title>
 *   <Subtitle></Subtitle>
 * </BgImage>
 */
const BgImage = ({ src, children, darken = 0, ...props }) => {
  const classes = useStyles({ src, darken, ...props })

  return (
    <Box width="100%" className={classes.root} {...props}>
      {children}
    </Box>
  )
}

export default BgImage
