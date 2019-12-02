import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getPostAction } from "../../../store/forum/actions";
import Loading from "../../Loading/Loading";
import PostControl from "./PostControl";
import PostItem from "./PostItem";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 1)
  },
  paper: {
    maxWidth: `calc(80% - ${theme.spacing(1)}px)`,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1)
  }
}));

const Post = props => {
  const classes = useStyles();
  const { id } = props.match.params;
  const { posts, loading, error, isAuthenticated } = props;

  useEffect(() => {
    props.getPostAction(id);
  }, []);

  return (
    <div className={classes.root}>
      <div className="post__control">
        <PostControl id={id} isAuthenticated={isAuthenticated} />
      </div>
      <div className={classes.paper}>
        {loading ? (
          <Loading />
        ) : (
          posts.map(el => <PostItem key={el.postId} post={el} />)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    posts: state.ForumReducers.posts,
    error: state.ForumReducers.error,
    isAuthenticated: state.UsersReducers.isAuthenticated
  };
};

const mapDispatchToProps = {
  getPostAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
