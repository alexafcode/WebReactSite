import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../src/history";
import Main from "./components/Main";
import Menu from "./components/Nav/Menu";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import PrivateRoute from "./components/Login/PrivateRoute";
import Cabinet from "./components/Cabinet/Cabinet";
import NotFound from "./components/Layouts/NotFound";
import "./App.css";

const App = () => (
  <Router history={history}>
    <Menu />
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute path="/cabinet" component={Cabinet} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
