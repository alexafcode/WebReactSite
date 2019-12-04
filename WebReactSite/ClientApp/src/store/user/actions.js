import axios from "axios";
import {
  SIGNIN,
  SIGNOUT,
  TOKEN,
  SIGNIN_ERROR,
  LOGIN_SUCCESS,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_ERROR
} from "./constants";
import helper from "../../utils/authHelpers";
import history from "../../history";

export const signInAction = (login, password) => dispatch => {
  dispatch({ type: SIGNIN });
  axios
    .post(helper.urlConstants.singInUrl, null, {
      params: {
        login,
        password
      }
    })
    .then(response => {
      console.log(response);
      const { user, token, isAdmin, email, userAvatar } = response.dataa;
      helper.saveAuth(user, token, isAdmin, email, userAvatar);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
        token: token,
        email: email,
        isAdmin: isAdmin
      });
      history.push("/");
    })
    .catch(e => {
      console.log(e.response);
      dispatch({ type: SIGNIN_ERROR, payload: e.response.data });
    });
};

export const signOutAction = () => dispatch => {
  dispatch({ type: SIGNOUT });
  helper.clearAuth();
  history.push("/");
};

export const createUserAction = (login, password, email) => dispatch => {
  dispatch({ type: SIGNIN });
  axios
    .post(helper.urlConstants.signUpUrl, {
      Username: login,
      Password: password,
      Email: email
    })
    .then(response => {
      console.log(response);
      const { user, token, isAdmin, email, userAvatar } = response.dataa;
      helper.saveAuth(user, token, isAdmin, email, userAvatar);
      helper.saveAuth(user, token, isAdmin, email, userAvatar);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
        token: token,
        email: email,
        isAdmin: isAdmin
      });
      dispatch({ type: TOKEN, payload: token });
      history.push("/");
    })
    .catch(e => {
      console.log(e.response);
      dispatch({ type: SIGNIN_ERROR, payload: e.response.data });
    });
};

export const uploadUserImage = image => dispatch => {
  const formData = new FormData();
  const imageName = helper.getLogin();
  const userName = helper.getLogin();
  formData.set("Name", userName);
  formData.append("image", image, imageName);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${helper.getToken()}`
  };
  axios
    .post(helper.urlConstants.uploadAvatarUrl, formData, { headers })
    .then(response => {
      console.log(response.data);
      helper.updateUserInfo(response.data, "userAvatar");
      dispatch({ type: UPLOAD_AVATAR_SUCCESS, payload: response.data });
    })
    .catch(e => {
      console.log(e);
      console.log(e.response);
    });
};
