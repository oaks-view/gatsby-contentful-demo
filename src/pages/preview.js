import React from 'react'
import { Router } from '@reach/router'

import PreviewWrapper from '../components/PreviewWrapper'

const types = [{ type: 'page', component: null }]

const Preview = () => {
  return (
    <Router basepath="/preview">
      {types.map(({ type, component }, i) => (
        <PreviewWrapper key={i} path={`${type}/:entryId`} type={type} component={component} />
      ))}
    </Router>
  )
}

export default Preview
