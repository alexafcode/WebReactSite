import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    border: "solid 1px rgba(72, 76, 84, 0.68)",
    borderRadius: ".5rem",
    marginBottom: theme.spacing(2),
    background: "whitesmoke"
  }
}));

const CommentItem = props => {
  const classes = useStyles();
  const { comment } = props;
  return (
    <Grid container wrap="nowrap" spacing={2} className={classes.root}>
      <Grid item>
        <Avatar alt={comment.author} src={comment.authorAvatar} />
        {/* body , createDate: "2019-12-12T08:44:24.5727698"*/}
      </Grid>
    </Grid>
  );
};

export default CommentItem;
