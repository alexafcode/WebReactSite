import axios from "axios";
import {
  LOADING,
  SET_MODAL,
  SET_ERROR,
  GET_THEME_SUCCESS,
  GET_POSTS_SUCCESS,
  GET_POST_SUCCESS
  // GET_THEME_ERROR,
  // ADD_POST_ERROR,
  // GET_POSTS_ERROR,
  // GET_COMMENT_SUCCESS,
  // GET_COMMENT_ERROR
} from "./constants";
import history from "../../history";
import helper from "../../utils/forumHelpers";
import authHelper from "../../utils/authHelpers";

export const addThemeAction = (header, desc, icon) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authHelper.getToken()}`
  };
  const postBody = JSON.stringify({
    Header: header,
    Description: desc,
    Icon: icon
  });
  axios
    .post(helper.urlConstants.themeUrl, postBody, { headers })
    .then(response => {
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: SET_MODAL });
    })
    .catch(e => {
      const err = e.response.data.Header
        ? e.response.data.Header[0]
        : e.response.status + " Not Authorized";
      dispatch({ type: SET_ERROR, payload: err });
    });
};

export const setModalAction = () => dispatch => {
  dispatch({ type: SET_MODAL });
};

export const getModalThemeAction = () => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  const response = await axios.get(helper.urlConstants.themeUrl);
  if (response.status === 200) {
    dispatch({ type: GET_THEME_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: SET_ERROR, payload: response });
  }
};

export const addPostAction = (header, desc, id, tags) => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  const url = helper.urlConstants.baseUrl + helper.urlConstants.postUrl;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authHelper.getToken()}`
  };
  const postBody = {
    ForumId: parseInt(id),
    Header: header,
    Description: desc,
    Tags: tags,
    CommentUser: authHelper.getLogin()
  };
  axios
    .post(url, JSON.stringify(postBody), { headers })
    .then(response => {
      dispatch({ type: LOADING, payload: false });
      history.push(`/forum/${id}`);
    })
    .catch(e => {
      const err = e.response.data.Header
        ? e.response.data.Header[0]
        : e.response.status + " Not Authorized";
      dispatch({ type: SET_ERROR, payload: err });
    });
};

export const getPostsAction = forumId => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  const url = helper.urlConstants.baseUrl + helper.urlConstants.postUrl;
  try {
    const response = await axios.get(url, {
      params: {
        id: parseInt(forumId)
      }
    });
    dispatch({ type: GET_POSTS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: SET_ERROR, payload: e.response });
  }
};

export const getPostActionByPostId = postId => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  try {
    const response = await axios.get(helper.urlConstants.postById, {
      params: {
        id: parseInt(postId)
      }
    });
    dispatch({ type: GET_POST_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: SET_ERROR, payload: e.response });
  }
};

export const addCommentAction = (body, postId) => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  const url = helper.urlConstants.commentUrl;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authHelper.getToken()}`
  };
  const postBody = {
    PostId: parseInt(postId),
    Body: body,
    Author: authHelper.getLogin()
  };
  axios
    .post(url, JSON.stringify(postBody), { headers })
    .then(response => {
      getPostActionByPostId(postId)(dispatch);
    })
    .catch(e => {
      dispatch({ type: SET_ERROR, payload: e.response });
    });
};
