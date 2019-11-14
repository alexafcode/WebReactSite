import React, { useState } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { createUserAction } from "../store/user/actions";
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp(props) {
  const classes = useStyles();

  const [login, setLogin] = useState({
    value: "",
    error: false
  });
  const [password, setPwd] = useState({
    value: "",
    error: false
  });
  const [email, setEmail] = useState({
    value: "",
    error: false
  });

  const loginValidation = login => {
    if (login.length >= 4 && login.length <= 10) {
      setLogin({
        value: login,
        error: false
      });
    } else {
      setLogin({
        value: login,
        error: true
      });
    }
  };

  const pwdValidation = pwd => {
    if (pwd.length >= 6 && pwd.length <= 8) {
      setPwd({
        value: pwd,
        error: false
      });
    } else {
      setPwd({
        value: pwd,
        error: true
      });
    }
  };

  const emailValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      setEmail({
        value: email,
        error: false
      });
    } else {
      setEmail({
        value: email,
        error: true
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={email.value}
                error={email.error}
                variant="outlined"
                // required
                fullWidth
                autoFocus
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => emailValidation(e.target.value)}
              />
              {email.error && (
                <p style={{ color: "red" }}>Email not Corrected</p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={login.value}
                error={login.error}
                variant="outlined"
                required
                fullWidth
                label="Enter Login"
                name="login"
                onChange={e => loginValidation(e.target.value)}
              />
              {login.error && (
                <p style={{ color: "red" }}>
                  Your Login must be at least 4 characters long and most 10
                  characters
                </p>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password.value}
                error={password.error}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={e => pwdValidation(e.target.value)}
              />
              {password.error && (
                <p style={{ color: "red" }}>
                  Your password must be at least 4 characters long and most 8
                  characters
                </p>
              )}
            </Grid>
          </Grid>
          {props.loading && <LinearProgress />}
          {props.error && (
            <p style={{ color: "red", textAlign: "center" }}>
              {props.errorMessage}
            </p>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              e.preventDefault();
              if (!email.error && !password.error) {
                props.createUserAction(
                  login.value,
                  password.value,
                  email.value
                );
              }
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    error: state.UsersReducers.error,
    errorMessage: state.UsersReducers.errorMessage,
    loading: state.UsersReducers.loading
  };
};
const mapDispatchToProps = {
  createUserAction
};

// SignUp.propTypes = {
//   error: PropTypes.bool.isRequired,
//   errorMessage: PropTypes.string.isRequired,
//   loading: PropTypes.bool.isRequired,
//   createUserAction: PropTypes.func.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
