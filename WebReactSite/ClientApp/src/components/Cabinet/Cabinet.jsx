import React, { useState } from "react";
import { connect } from "react-redux";
import { addThemeAction, setModalAction } from "../../store/forum/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ThemeDialog from "./ThemeDialog";
import Loading from "../Loading/Loading";
import Grid from "@material-ui/core/Grid";

const Cabinet = props => {
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
    },
    media: {
      backgroundImage: `url(${props.userAvatar})`,
      height: "30vh",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden"
    }
  }));
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
    <React.Fragment>
      <Grid item xs={4} sm={1}>
        <div className={classes.media} />
      </Grid>
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
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    openModal: state.ForumReducers.openModal,
    error: state.ForumReducers.error,
    isAdmin: state.UsersReducers.isAdmin,
    userAvatar: state.UsersReducers.userAvatar
  };
};

const mapDispatchToProps = {
  addThemeAction,
  setModalAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
