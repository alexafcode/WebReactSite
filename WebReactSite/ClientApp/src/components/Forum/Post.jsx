import React, { useState, useEffect } from "react";
import PostControl from "./PostControl";


const Post = props => {
  const { id } = props.match.params;
  return <div className="post">
    <div className="post__new">
      <PostControl id={id} />
    </div>
  </div>;
};

export default Post;
