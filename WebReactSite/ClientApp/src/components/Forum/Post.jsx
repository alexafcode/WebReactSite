import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPostAction } from "../../store/forum/actions";
import Loading from "../Loading/Loading";
import PostControl from "./PostControl";
import PostItem from "./PostItem";

const Post = props => {
  console.log("props", props);
  const { id } = props.match.params;
  const { posts, loading, error } = props;
  // const PostBody = posts.map(el => <PostItem key={el.postId} post={el} />);

  useEffect(() => {
    props.getPostAction(id);
  }, []);

  return (
    <div className="post">
      <div className="post__new">
        <PostControl id={id} />
      </div>
      {/* {loading ? <Loading /> : <PostBody />} */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.ForumReducers.loading,
    posts: state.ForumReducers.posts,
    error: state.ForumReducers.error
  };
};

const mapDispatchToProps = {
  getPostAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
