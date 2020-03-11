import React from 'react'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

function MvTab(props) {
  const { body, ...rest } = props

  return <Tab label={props.children} {...rest} />
}

export default MvTab
