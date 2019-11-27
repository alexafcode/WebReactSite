import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getModalThemeAction } from "../../store/forum/actions";
import Loading from "../Loading/Loading";
import ThemeItem from "./ThemeItem";

const Main = props => {
  const { loading, forumTheme, getModalThemeAction } = props;

  const ForumBody = forumTheme.map(el => (
    <ThemeItem key={el.forumId} theme={el} />
  ));

  useEffect(() => {
    getModalThemeAction();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <div className="container__body">{ForumBody}</div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    forumTheme: state.ForumReducers.forumTheme
  };
};

const mapDispatchToProps = {
  getModalThemeAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
