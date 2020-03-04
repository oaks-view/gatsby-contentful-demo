import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'

function SectionPreview() {
    return (<>
        <h1>Section Preview</h1>
        <Box component={Typography} variant='h4'>A section can be previewed from here</Box>
    </>)
}

export default SectionPreview