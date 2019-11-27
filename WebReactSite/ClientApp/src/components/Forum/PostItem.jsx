import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  icon: {
    fontSize: "2.5rem",
    color: "primary"
  },
  name: {
    marginTop: "25%"
  }
}));

// ToDo Icon User
const PostItem = props => {
  const classes = useStyles();
  console.log(props);
  const { header, description } = props.posts;
  return (
    <div></div>
    // <Grid container wrap="nowrap" spacing={2}>
    //   {/* <Grid item>{Icon}</Grid> */}
    //   <Grid item xs>
    //     <Typography variant="h5">{header}</Typography>
    //     <Typography variant="body1">{description}</Typography>
    //   </Grid>
    //   <Grid item>
    //     <Typography variant="body2" className={classes.name}>
    //       Отправлено пользователем
    //     </Typography>
    //   </Grid>
    // </Grid>
  );
};

export default PostItem;
