import React from 'react'
import JsxParser from 'react-jsx-parser'
import CMSLib from '../../components/cms'
import { SectionContext } from '../../context'

function SubSection({ slug, subsections }) {
  const subsection = subsections.find(s => s.slug === slug)

  if (!subsection) return null

  const jsx = subsection.body.childMarkdownRemark.html

  // TODO handle sub section children like Title which is rendered
  return <JsxParser jsx={jsx} components={{ ...CMSLib }} renderInWrapper={false} />
}

export default function Section({ slug }) {
  // TODO handle null slug
  return (
    <SectionContext.Consumer>{props => <SubSection slug={slug} subsections={props.blocks} />}</SectionContext.Consumer>
  )
}
