import React, { useState, useEffect } from "react";
import AddComment from "./AddComment";
import Divider from "@material-ui/core/Divider";

const Comment = props => {
  // const { forumId } = props.match.params;
  const search = new URLSearchParams(props.location.search);
  const postId = search.get("postId");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const openText = () => setOpen(!open);

  return (
    <div>
      <div></div>
      <Divider variant="middle" />
      <AddComment
        openText={openText}
        open={open}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default Comment;
