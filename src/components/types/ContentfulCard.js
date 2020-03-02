import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const CardTitle = props => {
  return (
    props.title && (
      <Box component={Grid} item {...props.styleProps}>
        <Typography variant="subtitle1" component="h6" align="center">
          {props.title}
        </Typography>
      </Box>
    )
  )
}

const CardImage = props => {
  return (
    props.image && (
      <Box
        component={Grid}
        item
        display="flex"
        justifyContent="center"
        {...props.styleProps}
      >
        <img src={props.image.file.url} alt={props.image.title} />
      </Box>
    )
  )
}

const CardBody = ({ body, styleProps }) => {
  return (
    body && (
      <Box component={Grid} item {...styleProps}>
        <Typography
          variant="body1"
          component="div"
          dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
        />
      </Box>
    )
  )
}

const items = { title: CardTitle, image: CardImage, body: CardBody }

const ContentfulCard = props => {
  const order = (props.order || 'image,title,body').split(',')
  const itemsPresent = order.filter(name => !!props[name.trim()])

  return (
    <Box
      component={Grid}
      container
      display="flex"
      flexDirection={props.orientation || 'column'}
    >
      {itemsPresent.map(name => {
        const Component = items[name.trim()]
        return <Component {...props} styleProps={{ xs: true }} key={name} />
      })}
    </Box>
  )
}

export default ContentfulCard