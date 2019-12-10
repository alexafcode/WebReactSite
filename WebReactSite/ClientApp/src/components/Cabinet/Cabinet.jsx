import React, { useState } from "react";
import { connect } from "react-redux";
import { addThemeAction, setModalAction } from "../../store/forum/actions";
import { uploadUserImage } from "../../store/user/actions";
import { makeStyles } from "@material-ui/core/styles";
import ThemeDialog from "./ThemeDialog";
import Loading from "../Loading/Loading";
import UploadAvatar from "./UploadAvatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Cabinet = props => {
  const classes = useStyles();
  const open = props.openModal;
  const [values, setValues] = useState({
    header: "",
    description: "",
    icon: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const clickModal = () => props.setModalAction();

  const addTheme = () => {
    props.addThemeAction(values.header, values.description, values.icon);
  };

  return (
    <div className={classes.root}>
      <UploadAvatar
        userAvatar={props.userAvatar}
        uploadUserImage={props.uploadUserImage}
        usersError={props.usersError}
      />
      {props.loading ? (
        <Loading />
      ) : (
        <div>
          <div>Cabinet</div>
          <div>
            {props.isAdmin && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => clickModal()}
              >
                Management
              </Button>
            )}
            <ThemeDialog
              open={open}
              handleClose={clickModal}
              handleInputChange={handleInputChange}
              values={values}
              addTheme={addTheme}
              modalError={props.error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    openModal: state.ForumReducers.openModal,
    error: state.ForumReducers.error,
    isAdmin: state.UsersReducers.isAdmin,
    userAvatar: state.UsersReducers.userAvatar,
    usersError: state.UsersReducers.error
  };
};

const mapDispatchToProps = {
  addThemeAction,
  setModalAction,
  uploadUserImage
};

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
