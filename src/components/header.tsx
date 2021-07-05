import { Avatar, Box, Chip , makeStyles, Typography } from "@material-ui/core";
import {red, green, orange} from '@material-ui/core/colors';
import { useMemo } from "react";
import { useGetAllQuery } from "../services/messages";
import { generateChipStyles } from "../theme/theme";
import { TopicStatus } from "../types/messages";



const useStyles = makeStyles(theme => ({
  header: {
    marginTop: 0,
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

interface ICounts {
    errors: number;
    warnings: number;
    successes: number;
}

const defaultCount = {
    errors: 0,
    warnings: 0,
    successes: 0
}

function Header() {
  const classes = useStyles()
  const { data: messages, error, isLoading } = useGetAllQuery("")

    const counts: ICounts = useMemo(() => {
        return messages?.topicStatuses?.reduce((acc, cur) => {
            switch (cur.status) {
                case "OK": acc.successes += 1; break;
                case "Error": acc.warnings += 1; break;
                case "Warning": acc.errors += 1; break;
            }
            return acc;
        }, defaultCount) ?? defaultCount
    }, [messages])

  return (

    <header className="App-header">
        <Typography variant="h1" className={classes.header}>
            Azure Pull Request Dashboard
        </Typography>
        {!isLoading && <Box display="flex" flexDirection="row" alignItems="center" className={classes.badges}>
            <Typography variant="h2" className={classes.header}>
                Overall Status:
            </Typography>
            {counts.errors > 0 && <Chip avatar={<Avatar>{counts.errors}</Avatar>} label="Errors" variant="outlined" className={classes.errorChip} />}
            {counts.warnings > 0 && <Chip avatar={<Avatar>{counts.warnings}</Avatar>} label="Warnings" variant="outlined" className={classes.warningChip} />}
            {counts.successes > 0 && <Chip avatar={<Avatar>{counts.successes}</Avatar>} label="OK" variant="outlined" className={classes.okChip} />}
        </Box>}
    </header>

  );
}

export default Header;
