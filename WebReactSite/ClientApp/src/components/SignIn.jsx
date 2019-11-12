import React, { useState } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { signInAction } from "../store/user/actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    login: "",
    password: "",
    loginError: false,
    // passwordError: false,
    loginErrorText: ""
    // passwordErrorText: ""
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={state.loginError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Login"
            name="login"
            autoFocus
            value={state.login}
            onChange={e => setState({ ...state, login: e.target.value })}
          />
          {state.loginError && (
            <p style={{ color: "red" }}>{state.loginErrorText}</p>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={state.password}
            onChange={e => setState({ ...state, password: e.target.value })}
          />
          {props.loading && <LinearProgress />}
          {props.error && <p style={{ color: "red" }}>{props.errorMessage}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              e.preventDefault();
              if (state.login && state.password && !state.loginError) {
                console.log(state);
                props.signInAction(state.login, state.password);
                console.log("Send");
                setState({ ...state, password: "" });
              }
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    // error: state.AuthReducers.error,
    // errorMessage: state.AuthReducers.errorMessage,
    // loading: state.AuthReducers.loading
  };
};
const mapDispatchToProps = {
  signInAction
};

// SignIn.propTypes = {
// };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
