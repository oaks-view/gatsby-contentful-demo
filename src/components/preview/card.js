import React from 'react'
import PreviewWrapper from '../PreviewWrapper'
import ContentType from '../types/ContentfulCard'

const ContentPreview = props => {
  return <PreviewWrapper type="Card" component={ContentType} {...props} />
}

export default ContentPreview
