import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Pagination from "material-ui-flat-pagination";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  getPostActionByPostId,
  addCommentAction
} from "../../../store/forum/actions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Loading from "../../Loading/Loading";

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 64px)"
  },
  title: {
    marginLeft: theme.spacing(2)
  },
  footer: {
    textAlign: "center",
    marginTop: "auto",
    width: "100%"
  }
}));

const Comment = props => {
  // const { forumId } = props.match.params;
  const search = new URLSearchParams(props.location.search);
  const postId = search.get("postId");
  const { post } = props;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const openText = () => setOpen(!open);

  const [state, setState] = useState({
    offset: 0,
    limit: 10,
    to: 10
  });

  const classes = useStyles();

  const addComment = () => {
    props.addCommentAction(input, postId);
    setOpen(!open);
    setInput("");
  };

  const handleClick = (offset, page) => {
    const to = page * state.limit;
    setState({ ...state, offset, to });
    window.scrollTo({
      top: 0
    });
  };

  // const goToFirstPage = () => {
  //   setState({ ...state, offset: 0, to: state.limit });
  // };

  useEffect(() => {
    props.getPostActionByPostId(postId);
  }, []);

  return (
    <>
      {props.loading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {post.header}
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {post.description}
          </Typography>
          <div>
            {post.comments &&
              post.comments
                .slice(state.offset, state.to)
                .map(comment => (
                  <CommentItem key={comment.commentId} comment={comment} />
                ))}
          </div>
          <Divider variant="middle" />
          <AddComment
            openText={openText}
            open={open}
            input={input}
            setInput={setInput}
            addComment={addComment}
          />
          <footer className={classes.footer}>
            <Pagination
              className="pagination"
              limit={state.limit}
              offset={state.offset}
              total={post.comments && post.comments.length}
              onClick={(e, offset, page) => handleClick(offset, page)}
              centerRipple={true}
            />
          </footer>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    post: state.ForumReducers.post,
    error: state.ForumReducers.error,
    isAuthenticated: state.UsersReducers.isAuthenticated
  };
};

const mapDispatchToProps = {
  getPostActionByPostId,
  addCommentAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
