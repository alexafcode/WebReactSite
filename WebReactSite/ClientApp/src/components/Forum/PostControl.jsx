import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import history from "../../history";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 1)
  },
  paper: {
    maxWidth: "80%",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
    background: "#d4d3d3"
  },
  button: {
    marginLeft: "auto"
  }
}));

const PostControl = props => {
  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item className={classes.button}>
          <Button variant="contained" onClick={() => history.push(`/forum/add`, props)}>Add Post</Button>
        </Grid>
      </Grid>
    </Paper>
  </div>
};

export default PostControl;
