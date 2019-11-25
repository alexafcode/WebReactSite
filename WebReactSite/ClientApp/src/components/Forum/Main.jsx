import React from "react";
import * as Font from "@material-ui/icons/";
import { connect } from "react-redux";
import { addThemeAction } from "../../store/forum/actions";
import Loading from "../Loading/Loading";

const ForumBody = () => {};
const Main = props => {
  const { loading, forumTheme } = props;
  // return <div>{React.createElement(Font[icon])}</div>;
  return <div>LLL</div>;
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    forumTheme: state.ForumReducers.forumTheme
  };
};

const mapDispatchToProps = {
  addThemeAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
