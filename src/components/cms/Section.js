import React from 'react'
import JsxParser from 'react-jsx-parser'
import CMSLib from '../../components/cms'
import { SectionContext } from '../../context'

function SubSection({ slug, subsections }) {
  const subsection = subsections.find(({ fields }) => fields.slug === slug)

  if (!subsection) return null

  const { fields } = subsection

  // TODO handle sub section children like Title which is rendered
  return <JsxParser components={{ ...CMSLib }} jsx={fields.body} renderInWrapper={false} />
}

export default function Section({ slug }) {
  // TODO handle null slug
  return (
    <SectionContext.Consumer>
      {props => <SubSection slug={slug} subsections={props.sections} />}
    </SectionContext.Consumer>
  )
}
