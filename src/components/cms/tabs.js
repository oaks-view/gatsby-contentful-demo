import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'


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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function MvTabs({ children, props }) {
  const [value, setValue] = React.useState(0)

  const handleChange = (_event, newValue) => {
    setValue(newValue)
  }

  const childrenTab = children.filter(x => x.type.name === 'MvTab');

  const headers = childrenTab.filter(x => !x.props.body);
  const bodies = childrenTab.filter(x => x.props.body);

  const tabHeaders = React.Children.map(headers, (tabHeader, index) =>  React.cloneElement(tabHeader, { key: index, ...a11yProps(index) }))

  return (
    <Box width="100%">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        area-label="full width tabs example"
      >
        {tabHeaders}
      </Tabs>

      {/* Tab body */}
      <Box>
        {bodies.map((tabBody, index) => <TabPanel value={value} index={index} key={index}>
          {tabBody.props.children}
        </TabPanel>)}
      </Box>
    </Box>
  )
}

export default MvTabs
