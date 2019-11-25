import React, { useState } from "react";
import { connect } from "react-redux";
import { addThemeAction } from "../../store/forum/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ThemeDialog from "./ThemeDialog";
import Loading from "../Loading/Loading";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  loading: {
    margin: "auto",
    width: "10%",
    marginTop: "10%"
  }
}));

const Cabinet = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    header: "",
    description: "",
    icon: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addTheme = () => {
    props.addThemeAction(values.header, values.description, values.icon);
    setOpen(false);
  };

  return (
    <React.Fragment>
      {props.loading ? (
        <div className={classes.loading}>
          <Loading />
        </div>
      ) : (
        <div>
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
            <ThemeDialog
              open={open}
              handleClose={handleClose}
              handleInputChange={handleInputChange}
              values={values}
              addTheme={addTheme}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    isAdmin: state.UsersReducers.isAdmin
  };
};

const mapDispatchToProps = {
  addThemeAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
