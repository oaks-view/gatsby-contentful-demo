import * as _ from 'lodash'
import remark from 'remark'
import html from 'remark-html'

function normalizeContentfulCard(contentfulCard) {
  const { fields } = contentfulCard

  const normalizedContent = {
    ...fields,
    internal: {
      type: 'ContentfulCard',
    },
  }

  const { body, image } = fields

  if (image) {
    normalizedContent.image = {
      file: { url: image.fields.file.url },
    }
  }

  if (body) {
    console.log(body)
    const htmlContent = parseBody(body)
    normalizedContent.body = {
      body,
      childMarkdownRemark: {
        html: htmlContent,
      },
    }
  }

  return normalizedContent
}

function normalizeContentfulSection(contentfulSection) {
  const { fields } = contentfulSection

  const normalizedContent = {
    ...fields,
    internal: {
      type: 'ContentfulSection',
    },
  }

  const { backgroundImage, blocks } = fields

  if (backgroundImage) {
    normalizedContent.backgroundImage = {
      file: { url: backgroundImage.fields.file.url },
    }
  }

  if (blocks) {
    normalizedContent.blocks = blocks.map(block => normalizeEntry(block))
  }

  return normalizedContent
}

function normalizeContentfulAction(entry) {
  const imageUrl = _.get(entry.fields, 'image.fields.file.url')

  return {
    internal: {
      type: 'ContentfulAction',
    },
    ...entry.fields,
    ...(imageUrl && { image: { file: { url: imageUrl } } }),
  }
}

function parseBody(body) {
  const value = remark()
    .use(html)
    .processSync(body)

  return value.contents
}

function normalizeEntry(entry) {
  const contentType = entry.sys.contentType.sys.id
  let normalizedEntry = {}

  switch (contentType) {
    case 'action':
      normalizedEntry = normalizeContentfulAction(entry)
      break
    case 'card':
      normalizedEntry = normalizeContentfulCard(entry)
      break
    case 'section':
      normalizedEntry = normalizeContentfulSection(entry)
      break
    default:
      throw new Error('Unknown content type')
  }

  return normalizedEntry
}

export { normalizeEntry }
