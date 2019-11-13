import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "redux";
// import PropTypes from "prop-types";
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import { routes } from "./routes";
import { signOutAction } from "../../store/user/actions";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  link: {
    textDecoration: "none",
    marginRight: 1 + "rem",
    color: "white"
  },
  linkAuth: {
    marginLeft: "auto"
  }
};

const Menu = props => {
  console.log(props);
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden only={["xs", "sm"]}>
            {props.isAuthenticated ? (
              <>
                <Typography variant="h6">
                  {routes.map((route, index) => (
                    <Link key={index} to={route.link} className={classes.link}>
                      {route.name}
                    </Link>
                  ))}
                </Typography>
                <Button
                  color="inherit"
                  className={classes.linkAuth}
                  onClick={() => props.signOutAction()}
                >
                  SignOut
                </Button>
              </>
            ) : (
              <Typography variant="h6">
                <Link to="/signin" className={classes.link}>
                  SignIn
                </Link>
                <Link to="/signup" className={classes.link}>
                  SignUp
                </Link>
              </Typography>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

// export default withStyles(styles)(Menu);
const mapStateToProps = state => ({
  ...state,
  isAuthenticated: state.UsersReducers.isAuthenticated
});

const mapDispatchToProps = {
  signOutAction
};

export default compose(
  withStyles(styles, {
    name: "Menu"
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Menu);
