import clsx from 'clsx'
import toLower from 'lodash/toLower'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const sizes = { x: 15, m: 30, l: 45 }

const useStylesIcon = makeStyles(theme => ({
  root: props => ({
    fontSize: sizes[props.size] || props.size,
  }),
}))

/**
 * props:
 *  - name (any material icon name)
 *  - size (`x`, `m`, `l` or with unit like `50px`, `3rem`)
 */
const Icon = ({ name, size = 'm' }) => {
  const classes = useStylesIcon({ size })

  if (!name) throw new Error(`Icon is missing "name"`)

  let IconEl = <span className={clsx('mdi', `mdi-${toLower(name)}`, classes.root)}></span>

  return IconEl
}

const useStyles = makeStyles(theme => ({
  root: props => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: `repeat(${props.count}, 1fr)`,
    justifyItems: 'center',
  }),
}))

/*
Group of icons rendered side-by-side
<Icons>
  <Icon name="pinterest" />
  <Icon name="facebook" />
  <Icon name="instagram" size="l" />
  <Icon name="twitter" />
  <Icon name="linkedin" size="50px" />
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
