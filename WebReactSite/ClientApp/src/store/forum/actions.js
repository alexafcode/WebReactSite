import axios from "axios";
import {
  LOADING,
  SET_MODAL,
  SET_ERROR,
  GET_THEME_SUCCESS,
  GET_THEME_ERROR,
  ADD_POST_ERROR,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR
} from "./constants";
import history from "../../history";
import helper from "../../utils/forumHelpers";

export const addThemeAction = (header, desc, icon) => dispatch => {
  dispatch({ type: LOADING, payload: true });
  console.log(header, desc, icon);
  const headers = {
    "Content-Type": "application/json"
  };
  const postBody = JSON.stringify({
    Header: header,
    Description: desc,
    Icon: icon
  });
  axios
    .post(helper.urlConstants.themeUrl, postBody, { headers })
    .then(response => {
      console.log(response);
      dispatch({ type: LOADING, payload: false });
      dispatch({ type: SET_MODAL });
    })
    .catch(e => {
      console.log(e.response);
      const err = e.response.data.Header[0];
      console.log(err);
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
    console.log(response);
    dispatch({ type: GET_THEME_SUCCESS, payload: response.data });
  } else {
    console.log(response);
    dispatch({ type: SET_ERROR, payload: response });
  }
};

export const addPostAction = (header, desc, id) => async dispatch => {
  dispatch({ type: LOADING, payload: true });
  const url = helper.urlConstants.baseUrl + helper.urlConstants.postUrl;
  const headers = {
    "Content-Type": "application/json"
  };
  const postBody = {
    ForumId: parseInt(id),
    Header: header,
    Description: desc
  };
  axios
    .post(url, JSON.stringify(postBody), { headers })
    .then(response => {
      console.log(response);
      dispatch({ type: LOADING, payload: false });
      history.push(`/forum/${id}`);
    })
    .catch(e => {
      console.log(e.response);
      dispatch({ type: SET_ERROR, payload: e.response.data.Header[0] });
    });
};
