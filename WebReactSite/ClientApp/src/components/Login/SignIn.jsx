import React, { useState } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { signInAction } from "../../store/user/actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import ErrorMessage from "../Layouts/ErrorMessage";
import FooterLink from "./FooterLink";

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

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const lineProgress = props.loading ? <LinearProgress /> : null;
  const errorMessage = props.error ? (
    <ErrorMessage error={props.error} />
  ) : null;

  const signInCheck = e => {
    e.preventDefault();
    if (login && password) {
      props.signInAction(login, password);
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Login"
            name="login"
            autoFocus
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <TextField
            error={password.error}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          {lineProgress}
          {errorMessage}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => signInCheck(e)}
          >
            Sign In
          </Button>
          <FooterLink href={"/signup"}>
            Don't have an account? Sign Up
          </FooterLink>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    error: state.UsersReducers.error,
    loading: state.UsersReducers.loading
  };
};
const mapDispatchToProps = {
  signInAction
};

// SignIn.propTypes = {
// };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
