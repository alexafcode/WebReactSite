import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { routes, nonAuthRoutes } from "./routes";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  }
};

const MobileDrawer = props => {
  const { classes, toggleDrawer, isOpen } = props;

  const sideList = (
    <div className={classes.list}>
      <List>
        {props.isAuthenticated ? (
          <>
            {routes.map((el, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <Link to={el.link} className={classes.link}>
                  <ListItemText primary={el.name} />
                </Link>
              </ListItem>
            ))}
            <Button
              color="inherit"
              className={classes.linkAuth}
              onClick={() => props.singOutAction()}
            >
              SignOut
            </Button>
          </>
        ) : (
          <>
            {nonAuthRoutes.map((el, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <Link to={el.link} className={classes.link}>
                  <ListItemText primary={el.name} />
                </Link>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        aria-label="Menu"
        className={classes.menuButton}
        color="inherit"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={isOpen} onClose={toggleDrawer}>
        <div tabIndex={0} role="button" onClick={toggleDrawer}>
          {sideList}
        </div>
      </Drawer>
    </div>
  );
};

// TemporaryDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
//   toggleDrawer: PropTypes.func,
//   isOpen: PropTypes.bool.isRequired
// };

export default withStyles(styles)(MobileDrawer);
