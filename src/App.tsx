import { Avatar, Box, Chip, Container, makeStyles, Typography } from "@material-ui/core";
import {red, green, orange, common} from '@material-ui/core/colors';
import { CSSProperties } from "@material-ui/core/styles/withStyles";

import ServiceBus from "./components/service-bus";

/* tslint:disable max-line-length */
interface IColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100?: string;
  A200?: string;
  A400?: string;
  A700?: string;
};


const generateChipStyles = (color: IColor): CSSProperties => ({
    borderColor: color[700],
    color: color[700],
    "& .MuiChip-avatar": {
      backgroundColor: color[700],
      color: common.white
    }
})

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(5)
  },
  main: {
    flexGrow: 1
  },
  header: {
    marginTop: 0
  },
  badges: {
    marginBottom: theme.spacing(3),
    "& > *": {
      marginRight: theme.spacing(2)
    }
  },
  errorChip: generateChipStyles(red),
  warningChip: generateChipStyles(orange),
  okChip: generateChipStyles(green)
}))

function App() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={`App ${classes.root}`} >

        <header className="App-header">
          <Typography variant="h1" className={classes.header}>
            Pull Request Dashboard
          </Typography>
          <Box display="flex" flexDirection="row" className={classes.badges}>
            <Chip avatar={<Avatar>2</Avatar>} label="Errors" variant="outlined" className={classes.errorChip} />
            <Chip avatar={<Avatar>1</Avatar>} label="Warnings" variant="outlined" className={classes.warningChip} />
            <Chip avatar={<Avatar>22</Avatar>} label="OK" variant="outlined" className={classes.okChip} />
          </Box>
        </header>

        <main className={classes.main}>
          <ServiceBus />
        </main>

    </Container>
  );
}

export default App;
