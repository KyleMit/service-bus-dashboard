import { Container, makeStyles } from "@material-ui/core";
import Header from "./components/header";
import { useBadgeCount } from "./hooks/use-badge-count";
import ServiceBusGrid from "./components/service-bus-grid";

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
}))

function App() {
  const classes = useStyles()
  useBadgeCount();

  return (
    <Container maxWidth="lg" className={`App ${classes.root}`} >
        <Header />

        <main className={classes.main}>
          <ServiceBusGrid />
        </main>

    </Container>
  );
}

export default App;
