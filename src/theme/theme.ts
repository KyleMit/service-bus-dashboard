import { common } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IColor } from '../types/IColor';

const defaultTheme = createMuiTheme({})

const theme = createMuiTheme({
  typography: {
      allVariants: {
          color: "rgba(0,0,0,.9)",
          fontFamily: [
            '"Segoe UI"',
            '"-apple-system"',
            'BlinkMacSystemFont',
            'Roboto',
            '"Helvetica Neue"',
            'Helvetica',
            'Ubuntu',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
          ].join(','),
      },
      h1: {
          fontSize: 22,
          fontWeight: 600,
          marginTop: defaultTheme.spacing(4),
          marginBottom: defaultTheme.spacing(4)
      },
      h2: {
          fontSize: 18,
          fontWeight: 400
      },
      h3: {
          fontSize: 16
      },
      body1: {
          fontSize: 16
      },
      body2: {
          fontSize: 16
      }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "rgb(241 241 241)",
          height: "100vh"
        },
        "#root": {
          height: "100%"
        }
      },
    }
  },
});

export default theme;

export const generateChipStyles = (color: IColor): CSSProperties => ({
  borderColor: color[700],
  color: color[700],
  "& .MuiChip-avatar": {
    backgroundColor: color[700],
    color: common.white
  }
})
