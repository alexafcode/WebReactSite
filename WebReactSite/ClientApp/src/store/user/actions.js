import axios from "axios";
import {
  SIGNIN,
  SIGNOUT,
  TOKEN,
  SIGNIN_ERROR,
  LOGIN_SUCCESS
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
      const data = response.data;
      helper.saveAuth(
        data.user,
        data.token,
        data.isAdmin,
        data.email,
        data.userAvatar
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
        token: data.token,
        email: data.email,
        isAdmin: data.isAdmin
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
      const data = response.data;
      helper.saveAuth(
        data.user,
        data.token,
        data.isAdmin,
        data.email,
        data.userAvatar
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
        token: data.token,
        email: data.email,
        isAdmin: data.isAdmin
      });
      dispatch({ type: TOKEN, payload: data.token });
      history.push("/");
    })
    .catch(e => {
      console.log(e.response);
      dispatch({ type: SIGNIN_ERROR, payload: e.response.data });
    });
};
