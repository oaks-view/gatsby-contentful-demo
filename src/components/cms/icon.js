import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  actionLink: {
    cursor: 'pointer',
  },
}))

function Icon(props) {
  const classes = useStyles(props)
  const { image, url, openInNewTab } = props

  const linkProps = {
    href: url || '/#',
    target: openInNewTab ? '_blank' : '_self',
  }

  if (!url) {
      return <img src={image} />
  }

  return (
    <a classes={classes.actionLink} {...linkProps}>
      <img src={image} />
    </a>
  )
}

export default Icon
