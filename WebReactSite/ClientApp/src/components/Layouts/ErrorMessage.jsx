import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "red",
    textAlign: "center"
  }
});
const ErrorMessage = ({ error }) => {
  const classes = useStyles();
  return <p className={classes.root}>{error}</p>;
};

export default ErrorMessage;
