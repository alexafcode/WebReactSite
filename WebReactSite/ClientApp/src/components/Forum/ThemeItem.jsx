import React from "react";
import * as Font from "@material-ui/icons/";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import history from "../../history";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: "80%",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    background: "#c5c5c5",
    cursor: "pointer"
  },
  icon: {
    fontSize: "2.5rem",
    color: "primary"
  },
  counter: {
    marginTop: "25%"
  }
}));

const ThemeItem = props => {
  const classes = useStyles();
  const { header, description, icon, forumId } = props.theme;

  const Icon = React.createElement(Font[icon], { className: classes.icon });
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper
        className={classes.paper}
        onClick={() => history.push(`/forum/${forumId}`)}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>{Icon}</Grid>
          <Grid item xs>
            <Typography variant="h5">{header}</Typography>
            <Typography variant="body1">{description}</Typography>
          </Grid>
          {/* <Grid item>
            <Typography variant="body2" className={classes.counter}>
              Количество постов: 0
            </Typography>
          </Grid> */}
        </Grid>
      </Paper>
    </div>
  );
};

export default ThemeItem;
