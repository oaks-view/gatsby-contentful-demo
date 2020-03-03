import React from 'react'
import Button from '@material-ui/core/Button'
import get from 'lodash/get'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  actionButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  actionButtonLink: {
    color: 'inherit',
    width: '100%',
    height: '100%',
    textDecoration: 'none'
  },
  actionLink: {
    cursor: 'pointer'
  }
}))

const ContentfulAction = (props) => {
  const classes = useStyles();
  console.log('Props %j', props);

  const { title, urlTo, openInNewTab } = props;
  const image = get(props, 'image.file.url');

  console.log('props =< ', props);

  const linkProps = {
    href: urlTo,
    target: openInNewTab ? '_blank' : '_self'
  }

  if (image) {
    return <a classes={classes.actionLink} {...linkProps}>
      <img src={image} />
    </a>
  }

  return <Button className={classes.actionButton}>
    <a className={classes.actionButtonLink} {...linkProps}>
      {title && title}
    </a>
  </Button>
}

export default ContentfulAction
