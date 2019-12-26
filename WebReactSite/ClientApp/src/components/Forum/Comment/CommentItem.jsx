import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AuthHelpers from "../../../utils/authHelpers";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 1.5),
    border: "solid 1px rgba(72, 76, 84, 0.68)",
    borderRadius: ".5rem",
    marginBottom: theme.spacing(1.5),
    background: "whitesmoke",
    width: "85%",
    marginLeft: theme.spacing(2)
  },
  date: {
    fontSize: "0.75rem"
  }
}));

const CommentItem = props => {
  const classes = useStyles();
  const { comment } = props;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const date = new Date(comment.createDate).toLocaleString("ru", options);
  return (
    <Grid container wrap="nowrap" spacing={1} className={classes.root}>
      <Grid item xs={2} sm={1}>
        <Avatar
          alt={comment.author}
          src={
            comment.authorAvatar
              ? comment.authorAvatar
              : AuthHelpers.getUserAvatar()
          }
        />
      </Grid>
      <Grid item xs={7} sm={9}>
        {comment.body}
      </Grid>
      <Grid item xs={3} sm={2} className={classes.date}>
        {date}
      </Grid>
    </Grid>
  );
};

export default CommentItem;
