import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ThemeDialog from "./ThemeDialog";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Cabinet = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div>Cabinet</div>
      <div>
        {props.isAdmin && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleClickOpen()}
          >
            Management
          </Button>
        )}
        <ThemeDialog open={open} handleClose={handleClose} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.UsersReducers.isAuthenticated,
    isAdmin: state.UsersReducers.isAdmin
  };
};

export default connect(mapStateToProps, null)(Cabinet);
