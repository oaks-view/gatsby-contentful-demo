import React from 'react'
import * as PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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
  panel: {},
  panelContent: {
    paddingTop: '0 !important',
  },
}))

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </Box>
  )
}

const ContentfulSectionTabs = props => {
  const classes = useStyles(props)
  const [value, setValue] = React.useState(0)
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const blocks = props.blocks || []

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const scrollable = matches ? { scrollButtons: 'on' } : {}

  const SectionTabs = () => (
    <Box>
      <Tabs
        indicatorColor="secondary"
        textColor="secondary"
        value={value}
        onChange={handleChange}
        variant={matches ? 'scrollable' : 'fullWidth'}
        {...scrollable}
        area-label="full width tabs example"
      >
        {blocks.map((block, i) => (
          <Tab label={block.title} key={i} {...a11yProps(i)} />
        ))}
      </Tabs>
    </Box>
  )

  return (
    <Box className={`${classes.root} ${classes.bgImage}`}>
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
        {blocks.length && (
          <>
            <SectionTabs />
            {blocks.map((block, i) => {
              const { BlockComponent } = getBlockComponent(block)
              return (
                <TabPanel value={value} index={i} key={i}>
                  <BlockComponent {...block} className={classes.panelContent} />
                </TabPanel>
              )
            })}
          </>
        )}
      </Container>
    </Box>
  )
}

export default ContentfulSectionTabs
