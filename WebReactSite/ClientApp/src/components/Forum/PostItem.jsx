import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

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
  chip: {
    margin: theme.spacing(0.25)
  }
}));

// ToDo Icon User, Tags in string
const PostItem = props => {
  const classes = useStyles();
  const { header, description, tags } = props.post;
  return (
    <Grid container wrap="nowrap" spacing={2} className={classes.root}>
      {/* <Grid item>{Icon}</Grid> */}
      <div className={classes.titleContainer}>
        <Typography variant="h5">{header}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      <div>
        <Typography variant="body2" className={classes.name}>
          Создано пользователем:
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
