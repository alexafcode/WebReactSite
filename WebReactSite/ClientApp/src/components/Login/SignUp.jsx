import React, { useState } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { createUserAction } from "../../store/user/actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import ErrorMessage from "../Layouts/ErrorMessage";
import TextField from "@material-ui/core/TextField";
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

  const { error, loading, createUserAction } = props;

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
  const createUser = e => {
    e.preventDefault();
    if (!email.error && !password.error) {
      createUserAction(login.value, password.value, email.value);
    }
  };

  const lineProgress = loading ? <LinearProgress /> : null;

  const messageError = (error, text) => {
    if (!error) return null;
    return <ErrorMessage error={text} />;
  };

  const inputArray = [
    {
      error: email.error,
      label: "Email Address",
      name: "email",
      autofocus: true,
      value: email.value,
      helperText: "Email is not Corrected",
      change: emailValidation
    },
    {
      error: login.error,
      label: "Login",
      name: "login",
      autofocus: false,
      value: login.value,
      helperText:
        "Your Login must be at least 4 characters long and most 10 characters",
      change: loginValidation
    },
    {
      error: password.error,
      label: "Password",
      name: "password",
      autofocus: false,
      value: password.value,
      helperText:
        "Your password must be at least 4 characters long and most 8 characters",
      change: pwdValidation
    }
  ];
  const textInputs = inputArray.map(input => {
    const { error, label, name, autoFocus, value } = input;
    return (
      <TextField
        error={error}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label={label}
        name={name}
        autoFocus={autoFocus}
        value={value}
        helperText={input.error ? input.helperText : null}
        onChange={e => input.change(e.target.value)}
        key={name}
      />
    );
  });
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
          {textInputs}
          {lineProgress}
          {messageError(error, error)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => createUser(e)}
          >
            Sign Up
          </Button>
          <FooterLink href={"/signin"}>
            Already have an account? Sign in
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
  createUserAction
};

// SignUp.propTypes = {
//   error: PropTypes.bool.isRequired,
//   errorMessage: PropTypes.string.isRequired,
//   loading: PropTypes.bool.isRequired,
//   createUserAction: PropTypes.func.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
