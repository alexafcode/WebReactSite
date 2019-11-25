import axios from "axios";
import {
  LOADING,
  GET_THEME_SUCCESS,
  GET_THEME_ERROR,
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
    .post(helper.urlConstants.getThemeUrl, postBody, { headers })
    .then(response => {
      console.log(response);
      dispatch({ type: LOADING, payload: false });
    })
    .catch(e => {
      dispatch({ type: LOADING, payload: false });
      console.log(e.response);
      console.log(e.response.data.Header[0]);
    });
};
