import React from "react";
import * as Font from "@material-ui/icons/";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  paper: {
    maxWidth: "80%",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  }
}));

const ThemeItem = props => {
  const classes = useStyles();
  const { header, description, icon } = props.theme;

  const Icon = React.createElement(Font[icon], {
    style: { fontSize: "2.5rem", color: "primary" }
  });
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>{Icon}</Grid>
          <Grid item xs>
            <Typography>{header}</Typography>
            <Typography>{description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ThemeItem;
