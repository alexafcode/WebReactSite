import React, { useEffect } from "react";
import * as Font from "@material-ui/icons/";
import { connect } from "react-redux";
import { getModalTheme } from "../../store/forum/actions";
import Loading from "../Loading/Loading";

const ForumBody = () => {};
const Main = props => {
  const { loading, forumTheme, getModalTheme } = props;
  useEffect(() => {
    getModalTheme();
  }, []);
  // return <div>{React.createElement(Font[icon])}</div>;
  return (
    <div className="container">
      {loading && <Loading />}
      <div className="container__body">LLL</div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.ForumReducers.loading,
    forumTheme: state.ForumReducers.forumTheme
  };
};

const mapDispatchToProps = {
  getModalTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
