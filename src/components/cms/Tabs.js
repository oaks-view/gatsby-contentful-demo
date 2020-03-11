import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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

const MvTab = ({ children, ...props }) => <Tab label={children} {...props} />

const a11yProps = i => ({
  id: `simple-tab-${i}`,
  'aria-controls': `simple-tabpanel-${i}`,
})

function MvTabs({ children, props }) {
  const [value, setValue] = React.useState(0)
  const matches = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const scrollable = matches ? { scrollButtons: 'on' } : {}

  const handleChange = (_event, newValue) => {
    setValue(newValue)
  }

  const childrenTab = children.filter(x => typeof x.type === 'function')
  const headers = childrenTab.filter(x => x.props && !x.props.body)
  // the tab body could be any component, even a div. it only need boolean prop `body`
  const bodies = childrenTab.filter(x => x.props && x.props.body)

  return (
    <Box width="100%">
      <Tabs
        indicatorColor="secondary"
        textColor="secondary"
        value={value}
        onChange={handleChange}
        variant={matches ? 'scrollable' : 'fullWidth'}
        {...scrollable}
        area-label="full width tabs example"
      >
        {headers.map(({ type: TabHeader, props }, i) => (
          <TabHeader {...props} key={i} {...a11yProps(i)} />
        ))}
      </Tabs>

      <Box>
        {bodies.map((tabBody, i) => (
          <TabPanel value={value} index={i} key={i}>
            {tabBody.props.children}
          </TabPanel>
        ))}
      </Box>
    </Box>
  )
}

export default {
  Tab: MvTab,
  Tabs: MvTabs,
}
