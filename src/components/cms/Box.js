import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { default as MuiBox } from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import UIError from './UIError'

const useStyle = makeStyles(theme => ({
  root: props => ({
    minHeight: props.height,
    ...(props.img && {
      background: `linear-gradient(rgba(0, 0, 0, ${props.darken}), rgba(0, 0, 0, ${props.darken})), url('${props.img}')`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      backgroundAttachment: props.imgFixed ? 'fixed' : 'inherit',
    }),
  }),
}))

/**
 * Box is container tag which can contain an unspecified set of other tags
 *
 * Its width by default is 100%
 *
 * props:
 *   - children: set of other tags
 *   - img: image to display in the background
 *   - imgFixed: whether or not the image is fixed
 *   - darken: how dark the image in the background should be (0 = no, 0.5 = 50%, 1 = black)
 *   - row: turn it into a row which can group columns
 *   - col: turn it into a column
 *
 *
 * TODO: though any MUI prop could be used, we might allow only a subset to avoid relying too much
 *       on a third party component lib. Doing that would make easier to switch UI libs in the future
 */
export function Box({
  children,
  img,
  row = false,
  col = false,
  imgFixed = false,
  darken = 0,
  height,
  xs, // on extra small screens (mobile) each col is 100% width.
  sm = true, // on small screens (tablet) and up each col is evenly distributed. eg.: 2 cols = 50% each
  md,
  lg,
  xl,
  bgcolor,
  ...other
}) {
  const classes = useStyle({ img, imgFixed, height, darken })

  try {
    if (row && col) throw new Error(`"row" and "col" cannot be set in the same Box`)

    let boxProps = {}
    if (row) {
      boxProps = { component: Grid, container: true, spacing: 2 }
    } else if (col) {
      boxProps = { component: Grid, item: true, xs, sm, md, lg, xl }
    }

    return (
      <MuiBox className={classes.root} {...boxProps} bgcolor={bgcolor}>
        {children}
      </MuiBox>
    )
  } catch (error) {
    return <UIError error={error} />
  }
}

export function Row({ children, col, ...other }) {
  return (
    <Box {...other} row>
      {children}
    </Box>
  )
}

export function Col({ children, row, ...other }) {
  return (
    <Box {...other} col>
      {children}
    </Box>
  )
}

export default { Box, Row, Col }
