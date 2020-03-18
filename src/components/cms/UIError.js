import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export default function UIError({ error, ...other }) {
  console.error(error)

  if (process.env.NODE_ENV === 'production') {
    return (
      <Box bgcolor="#FFCDCD" p={1}>
        <Typography variant="subtitle1">
          <Box color="red">Something went wrong</Box>
          <Box>{error && error.message}</Box>
        </Typography>
      </Box>
    )
  } else {
    return (
      <Box bgcolor="#FFCDCD" p={1}>
        <Typography variant="subtitle1">
          <Box color="red">ERROR: {error.message}</Box>
        </Typography>
        <details style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</details>
      </Box>
    )
  }
}
