import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// const defaultTheme = createMuiTheme()

// const { spacing } = defaultTheme

export default responsiveFontSizes(
  createMuiTheme({
    props: {},
    overrides: {},
    typography: {
      fontFamily: 'Open Sans, arial, sans-serif',
      lineHeight: 1.15,
      letterSpacing: '0.15px',
    },
  })
)
