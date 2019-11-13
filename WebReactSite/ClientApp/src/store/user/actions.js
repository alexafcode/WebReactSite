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

export const signInAction = (login, password) => async dispatch => {
  dispatch({ type: SIGNIN });
  axios
    .post("api/user/signin", {
      Login: login,
      Password: password
    })
    .then(response => {
      console.log(response);
      const data = response.data;
      helper.saveAuth(data.user, data.token, data.isAdmin);
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      dispatch({ type: TOKEN, payload: data.token });
      history.push("/");
    })
    .catch(e => {
      console.log(e);
      SIGNIN_ERROR({ type: SIGNIN_ERROR, payload: e.message });
    });
};

export const signOutAction = () => dispatch => {
  dispatch({ type: SIGNOUT });
  helper.clearAuth();
  history.push("/");
};
