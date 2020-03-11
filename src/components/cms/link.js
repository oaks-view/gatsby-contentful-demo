import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  actionButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    textTransform: props => props.textTransform || 'uppercase',
  },
  actionButtonLink: {
    color: 'inherit',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
  }
}))

const MvLink = props => {
  const classes = useStyles(props)

  const { title, url, openInNewTab, size, type } = props

  const linkProps = {
    href: url || '/#',
    target: openInNewTab ? '_blank' : '_self',
  }

  if (type === 'button') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" margin={0}>
        <Button className={classes.actionButton} size={size || 'medium'}>
          <a className={classes.actionButtonLink} {...linkProps}>
            {title && title}
          </a>
        </Button>
      </Box>
    )
  }

  return (
    <a {...linkProps}>
      {title && title}
      {!title && "No title"}
    </a>
  )
}

export default MvLink
