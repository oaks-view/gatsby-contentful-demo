import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

export const Row = ({ children, ...props }) => (
  <Grid container {...props}>
    {children}
  </Grid>
)

export const Col = ({ children, ...props }) => (
  <Grid item xs={12} sm {...props}>
    {children}
  </Grid>
)

const MvBox = ({ children, ...props }) => (
  <Box width="100%" {...props}>
    {children}
  </Box>
)

// All custom elements allowed on Contentful editor besides native HTML elements
const Lib = {
  Row,
  Col,
  Box: MvBox,
}

export default Lib
