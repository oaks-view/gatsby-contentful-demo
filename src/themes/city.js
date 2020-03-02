import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme()

// const { spacing } = defaultTheme

// TODO improve theme colors, font, ...

const palette = {
  common: {
    black: '#333',
    white: '#fff',
  },
  background: {
    default: '#fff',
  },
  primary: {
    main: '#005783',
  },
  secondary: {
    main: '#ff5722',
    dark: '#ef511f',
  },
  error: {
    main: '#cb202d',
  },
  success: {
    main: '#46B46C',
  },
  warning: {
    main: '#F5A623',
  },
  info: {
    main: '#005783',
  },
  text: {
    primary: '#333',
    secondary: '#4a4a4a',
    disabled: '#9b9b9b',
    hint: '#636363',
  },
}

export default responsiveFontSizes(
  createMuiTheme({
    props: {},
    overrides: {},
    typography: {
      fontFamily: 'Open Sans, arial, sans-serif',
      lineHeight: 1.15,
      letterSpacing: '0.15px',
      body1: {
        color: '#4a4a4a',
      },
      body2: {
        color: '#4a4a4a',
      },
      subtitle1: {
        fontWeight: 600,
        color: palette.primary.main,
      },
      subtitle2: {
        fontWeight: '1rem',
        color: '#4a4a4a',
      },
      h1: {
        fontWeight: 600,
        color: palette.common.white,
      },
      h2: {
        fontWeight: 600,
        color: palette.common.white,
      },
      h3: {
        fontWeight: 600,
        color: palette.common.white,
      },
      h4: {
        fontWeight: 600,
        color: palette.primary.main,
      },
      h5: {
        fontWeight: 600,
        color: palette.primary.main,
      },
      h6: {
        fontWeight: 600,
        color: palette.primary.main,
      },
    },
    palette,
  })
)
