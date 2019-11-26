import React from "react";

const Post = props => {
  const { id } = props.match.params;
  return <div>{id}</div>;
};

export default Post;
