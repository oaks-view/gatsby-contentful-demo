import React from 'react'
import { Router } from '@reach/router'

import PreviewWrapper from '../components/PreviewWrapper'
import ContentfulAction from '../components/types/ContentfulAction'
import ContentfulCard from '../components/types/ContentfulCard'
import ContentfulSection from '../components/types/ContentfulSection'

const types = [
  { type: 'action', component: ContentfulAction },
  { type: 'card', component: ContentfulCard },
  { type: 'section', component: ContentfulSection },
  { type: 'page', component: null },
]

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
