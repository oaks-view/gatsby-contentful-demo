import clsx from 'clsx'
import toLower from 'lodash/toLower'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

// TODO: allow editor set props to custom icon size, color, ...
const Icon = ({ name, href, ...props }) => {
  if (!name) throw new Error(`Icon is missing "name"`)

  let icon = `mdi mdi-${toLower(name)}`

  let IconEl = <span className={clsx(icon)}></span>

  // if (href) {
  //   IconEl = <a href={href}>{IconEl}</a>
  // }

  return IconEl
}

const useStyles = makeStyles(theme => ({
  root: props => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.count}, 1fr)`,
    justifyItems: 'center',
    '& > .mdi': {
      fontSize: 30,
    },
  }),
}))

/*
Group of icons rendered side-by-side
<Icons>
  <Icon name="pinterest" />
  <Icon name="facebook" />
  <Icon name="instagram" />
  <Icon name="twitter" />
  <Icon name="linkedin" />
</Icons>
*/
const Icons = ({ children, className = '', ...props }) => {
  const iconsChildren = children.filter(x => typeof x.type === 'function')
  const classes = useStyles({ ...props, count: iconsChildren.length })

  return <div className={classes.root}>{iconsChildren}</div>
}

export default {
  Icon,
  Icons,
}
