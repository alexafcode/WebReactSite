import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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
  header: {
    width: "95%"
  },
  title: {
    marginLeft: theme.spacing(2)
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

  const classes = useStyles();

  const addComment = () => {
    props.addCommentAction(input, postId);
    setOpen(!open);
    setInput("");
  };

  useEffect(() => {
    props.getPostActionByPostId(postId);
  }, []);

  return (
    <div>
      {props.loading ? (
        <Loading />
      ) : (
        <div className={classes.header}>
          <Typography variant="h4" gutterBottom className={classes.title}>
            {post.header}
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {post.description}
          </Typography>
          <div>
            {post.comments &&
              post.comments.map(comment => (
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
        </div>
      )}
    </div>
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
