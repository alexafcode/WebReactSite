import { SIGNIN, TOKEN, SIGNIN_ERROR, LOADING } from "./constants";
import history from "../../history";
import axios from "axios";

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
      const token = data.token;
      const userLogin = data.user;
      // const isAdmin = responce.data.isAdmin;
      // helper
    })
    .catch(e => {
      console.log(e);
    });
};
