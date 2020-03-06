import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: props => ({
    display: 'grid',
    gridTemplateAreas: props.areas,
    backgroundColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  }),
  title: props => ({
    gridArea: 'title',
    textAlign: props.textAlignment || 'center',
    padding: props.orientation === 'row' ? theme.spacing(0, 2) : 0,
    paddingBottom: theme.spacing(1),
  }),
  image: {
    gridArea: 'image',
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      maxWidth: '100%',
    },
  },
  body: props => ({
    gridArea: 'body',
    padding: props.orientation === 'row' ? theme.spacing(0, 2) : 0,
    '& p': {
      margin: theme.spacing(0),
      lineHeight: 1.5,
      fontSize: 16,
    },
  }),
}))

const MyCardTitle = ({ title, subtitle, titleAlignment, classes }) => {
  const align = titleAlignment || 'center'
  return (
    <CardHeader
      className={classes.title}
      title={
        title && (
          <Typography variant="subtitle2" align={align}>
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
  return <CardContent className={classes.body} dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }} />
}

const DEFAULT_ORDER = 'title,image,body'
const CARD_ITEMS = {
  title: MyCardTitle,
  image: MyCardImage,
  body: MyCardBody,
}

function getStructure(props) {
  const order = (props.order || DEFAULT_ORDER).replace(/\s+/g, '').split(',')
  if (order.length !== 3) {
    throw new Error(`Card.order field is not correct. It should contain three items (title, image, body), but got (${order})`)
  }

  const items = order.filter(name => !!props[name])
  let areas = order.map(e => `"${e}"`).join(' ')

  if (props.orientation === 'row') {
    areas = `"${order[0]} ${order[1]}" "${order[0]} ${order[2]}"`
    if (order[2] === 'image') {
      areas = `"${order[0]} image" "${order[1]} image"`
    }
  }

  return { items, areas }
}

const ContentfulCard = props => {
  const { items, areas } = getStructure(props)
  const classes = useStyles({ ...props, areas })

  return (
    <Card className={classes.root} elevation={0}>
      {items.map(name => {
        if (!props[name]) return null
        const Component = CARD_ITEMS[name]
        return <Component {...props} classes={classes} key={name} />
      })}
    </Card>
  )
}

export default ContentfulCard
