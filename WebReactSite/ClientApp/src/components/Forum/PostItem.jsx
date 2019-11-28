import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    border: "solid 1px rgba(72, 76, 84, 0.68)",
    borderRadius: ".5rem"
  },
  name: {
    marginTop: "25%"
  }
}));

// ToDo Icon User, Tags in string
const PostItem = props => {
  const classes = useStyles();
  const { header, description, tags } = props.post;

  return (
    <Grid container wrap="nowrap" spacing={2} className={classes.root}>
      {/* <Grid item>{Icon}</Grid> */}
      <Grid item xs>
        <Typography variant="h5">{header}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" className={classes.name}>
          Создано пользователем:
        </Typography>
        <div>
          {tags.map((t, i) => (
            <li key={i}>{t.tagName}</li>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default PostItem;
