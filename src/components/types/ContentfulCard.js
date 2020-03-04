import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'

// TODO add actions

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
  },
  title: props => ({
    textAlign: props.textAlignment || 'center',
    padding: 0,
  }),
  image: {
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      maxWidth: '100%',
    },
  },
  content: {
    padding: 0,
    '& p': {
      margin: theme.spacing(0),
      lineHeight: 1.5,
      fontWeight: 400,
      color: '#4a4a4a',
      fontSize: '1rem',
    },
  },
}))

const MyCardTitle = ({ title, subtitle, titleAlignment, classes }) => {
  const align = titleAlignment || 'center'
  return (
    <CardHeader
      className={classes.title}
      title={
        title && (
          <Typography variant="subtitle1" align={align}>
            {title}
          </Typography>
        )
      }
      subheader={subtitle || undefined}
    />
  )
}
const MyCardImage = ({ image, classes }) => {
  const Image = () => (
    <Box className={classes.image}>
      <img src={image.file.url} alt={image.title} />
    </Box>
  )
  return <CardMedia component={Image} />
}
const MyCardBody = ({ body, classes }) => {
  return (
    <CardContent
      className={classes.content}
      dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
    />
  )
}

const DEFAULT_ORDER = 'title,image,body'
const CARD_ITEMS = {
  title: MyCardTitle,
  image: MyCardImage,
  body: MyCardBody,
}

const ContentfulCard = props => {
  const classes = useStyles(props)
  const order = (props.order || DEFAULT_ORDER).replace(/\s+/g, '').split(',')

  if (order.length !== 3) {
    throw new Error(
      `Card.order field is not correct. It should contain three items (title, image, body), but got (${order})`
    )
  }

  return (
    <Card className={classes.root} elevation={0}>
      {order.map(name => {
        if (!props[name]) return null
        const Component = CARD_ITEMS[name]
        return <Component {...props} classes={classes} key={name} />
      })}
    </Card>
  )
}

export default ContentfulCard
