import React from "react";

const Comment = props => {
  const { forumId } = props.match.params;
  const search = new URLSearchParams(props.location.search);
  const postId = search.get("postId");
  console.log(postId);
  return <div>{postId}</div>;
};

export default Comment;
