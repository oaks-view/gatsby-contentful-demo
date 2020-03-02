import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: props => ({
    display: 'flex',
    width: '100%',
    flexDirection: props.orientaion || 'column',
  }),
}))

const CardTitle = props => {
  return (
    props.title && (
      <Box component={Grid} item>
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
      <Box component={Grid} item display="flex" justifyContent="center">
        <img src={props.image.file.url} alt={props.image.title} />
      </Box>
    )
  )
}

const CardBody = ({ body }) => {
  return (
    body && (
      <Box component={Grid} item>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
        />
      </Box>
    )
  )
}

const items = { title: CardTitle, image: CardImage, body: CardBody }

const ContentfulCard = props => {
  const classes = useStyles(props)
  const order = (props.order || 'image,title,body').split(',')

  return (
    <Box component={Grid} container className={classes.root}>
      {order.map(itemName => {
        const name = itemName.trim()
        if (!props[name]) return

        const Component = items[name]
        return <Component {...props} key={name} />
      })}
    </Box>
  )
}

export default ContentfulCard
