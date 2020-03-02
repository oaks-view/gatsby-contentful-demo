// content fetched has an internal type which `Contentful` + its id. Eg. `section` becomes
// available in the result as `ContentfulSection`. That name is used then to select the
// React component that render its content. There's also sub type, which is the case for `Section`.
// When sub type is present, the type gets appended to internal type. eg. `ContentfulSectionTabs`
import blockTypes from '../components/types'

// Select the right component for the block. Section has subtypes, tabs and banner
// Later if another subtype is added, a new component must be added under components/types
export const getBlockComponent = ({ type = 'generic', internal }) => {
  let componentName = internal.type

  if (internal.type === 'ContentfulSection') {
    if (['tabs', 'banner'].includes(type)) {
      componentName = `${internal.type}${_.capitalize(type)}`
    }
  }

  if (componentName in blockTypes) {
    return { BlockComponent: blockTypes[componentName] }
  }
  throw new Error(`${componentName} is not supported.`)
}

export default {
  getBlockComponent,
}
