import React from 'react'
import PreviewWrapper from '../PreviewWrapper'
import ContentType from '../types/ContentfulAction'

const ContentPreview = props => {
  return <PreviewWrapper type="Action" component={ContentType} {...props} />
}

export default ContentPreview
