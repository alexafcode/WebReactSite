import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "red",
    textAlign: "center"
  }
});
const ErrorMessage = props => {
  const classes = useStyles();
  return <p className={classes.root}>{props.error}</p>;
};

export default ErrorMessage;
