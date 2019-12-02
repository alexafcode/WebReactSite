import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import history from "../../../history";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    border: "solid 1px rgba(72, 76, 84, 0.68)",
    borderRadius: ".5rem",
    marginBottom: theme.spacing(2),
    background: "whitesmoke"
  },
  titleContainer: {
    flex: "auto"
  },
  rightContainer: {
    width: "20%"
  },
  chip: {
    margin: theme.spacing(0.25)
  }
}));

// ToDo Icon User
const PostItem = props => {
  console.log(props.post);
  const classes = useStyles();
  const { header, description, tags, createdDate } = props.post;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const date = new Date(createdDate).toLocaleString("ru", options);
  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
      className={classes.root}
      onClick={() =>
        history.push({
          pathname: `/forum/${props.post.forumId}/post`,
          search: `?postId=${props.post.postId}`
        })
      }
      // onClick={() =>
      //   history.push(
      //     `/forum/${props.post.forumId}/post?postId=${props.post.postId}`
      //   )
      // }
    >
      {/* <Grid item>{Icon}</Grid> */}
      <div className={classes.titleContainer}>
        <Typography variant="h5">{header}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      <div className={classes.rightContainer}>
        <Typography variant="body2" className={classes.name}>
          Создано: {date}
        </Typography>
        <div>
          {tags.map((data, i) => {
            return (
              <Chip
                size="small"
                key={i}
                label={data.tagName}
                className={classes.chip}
              />
            );
          })}
        </div>
      </div>
    </Grid>
  );
};

export default PostItem;
