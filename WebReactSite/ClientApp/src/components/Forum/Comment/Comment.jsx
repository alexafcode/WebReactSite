import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";
import {
  getPostActionByPostId,
  addCommentAction
} from "../../../store/forum/actions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Loading from "../../Loading/Loading";

const Comment = props => {
  // const { forumId } = props.match.params;
  const search = new URLSearchParams(props.location.search);
  const postId = search.get("postId");
  const { posts } = props;
  console.log(posts);
  const post = posts.length
    ? posts.filter(p => p.postId === parseInt(postId))[0]
    : [];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const openText = () => setOpen(!open);

  const addComment = () => {
    props.addCommentAction(input, postId);
  };

  useEffect(() => {
    if (!props.posts.length) {
      props.getPostActionByPostId(postId);
    }
  }, []);

  return (
    <div>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            {post.header}
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
        </>
      )}
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
  getPostActionByPostId,
  addCommentAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
