import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../src/history";
import Main from "./components/Main";
import Menu from "./components/Menu";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./App.css";

const App = () => (
  <Router history={history}>
    <Menu />
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
