import React from 'react'
import { Link, graphql } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { getBlockComponent } from '../../utils'

const useStyles = makeStyles(theme => ({
  root: props => ({
    width: '100%',
    display: 'flex',
    flexDirection: props.orientation || 'column',
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
  panelContent: {
    paddingTop: 0,
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
      mt={3}
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

  const handleChange = (_event, newValue) => {
    setValue(newValue)
  }

  // render nested section without title and padding
  const caller = {
    ContentfulSection: { hideTitle: true },
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

  const Section = () => (
    <>
      {props.title && (
        <Box
          component={Typography}
          component="h2"
          display="flex"
          justifyContent="center"
          color="primary.main"
          mt={0}
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
                <BlockComponent
                  {...block}
                  caller={caller}
                  className={classes.panelContent}
                />
              </TabPanel>
            )
          })}
        </>
      )}
    </>
  )

  return (
    <Box className={`${classes.root} ${classes.bgImage}`}>
      {props.parentBlock ? (
        <Container maxWidth="md">
          <Section />
        </Container>
      ) : (
        <Section />
      )}
    </Box>
  )
}

export default ContentfulSectionTabs
