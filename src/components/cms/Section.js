import toLower from 'lodash/toLower'
import React from 'react'
import JsxParser from 'react-jsx-parser'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { SectionContext } from '../../context'
import CMSLib from '../../components/cms'
import { Divider } from '@material-ui/core'

const findSubsection = (slug, subsections) => subsections.find(s => toLower(s.slug) === slug)

const SectionError = ({ error }) => {
  console.error(error)

  if (process.env.NODE_ENV === 'production') {
    return (
      <Box bgcolor="#FFCDCD" p={1}>
        <Typography variant="subtitle1">
          <Box color="red">Something went wrong</Box>
          <Box>{error && error.message}</Box>
        </Typography>
      </Box>
    )
  } else {
    return (
      <Box bgcolor="#FFCDCD" p={1}>
        <Typography variant="subtitle1">
          <Box color="red">ERROR: {error.message}</Box>
        </Typography>
        <details style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</details>
      </Box>
    )
  }
}

function SubSection({ slug, parentSlug, subsections, children }) {
  try {
    if (slug && parentSlug === slug) throw new Error('Cannot nest a section within itself')

    if (children) return children

    if (!slug) {
      const names = subsections.map(s => s.slug).join(', ')
      throw new Error(`A subsection in this page must have one of the these slugs: ${names}`)
    }

    const subsection = findSubsection(slug, subsections)
    if (!subsection) {
      throw new Error(`No subsection found with slug "${slug}"`)
    }

    const jsx = subsection.body.childMarkdownRemark.html

    return <JsxParser jsx={jsx} components={{ ...CMSLib }} renderInWrapper={false} />
  } catch (error) {
    return <SectionError error={error} />
  }
}

export default function Section({ slug = '', children }) {
  return (
    <SectionContext.Consumer>
      {rootSection => {
        if (!rootSection.blocks) return null

        return (
          <SubSection slug={toLower(slug)} subsections={rootSection.blocks} parentSlug={rootSection.slug}>
            {children}
          </SubSection>
        )
      }}
    </SectionContext.Consumer>
  )
}
