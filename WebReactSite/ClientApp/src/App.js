import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../src/history";
import Main from "./components/Forum/Main";
import Menu from "./components/Nav/Menu";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import PrivateRoute from "./components/Login/PrivateRoute";
import Cabinet from "./components/Cabinet/Cabinet";
import Post from "./components/Forum/Post/Post";
import AddPost from "./components/Forum/Post/AddPost";
import Comment from "./components/Forum/Comment/Comment";
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
        <Route exact path="/forum/add" component={AddPost} />
        <Route exact path="/forum/:id/post" component={Comment} />
        <Route exact path="/forum/:id" component={Post} />
        <PrivateRoute path="/cabinet" component={Cabinet} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
