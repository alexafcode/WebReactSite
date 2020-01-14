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

import ApiService from "../../utils/apiService";
const apiService = new ApiService();
export const signInAction = (login, password) => dispatch => {
  dispatch({ type: SIGNIN });
  const data = { login, password };
  apiService
    .signIn(data)
    .then(options => {
      helper.saveAuth(options);
      dispatch({
        type: LOGIN_SUCCESS,
        ...options
      });
      history.push("/");
    })
    .catch(e => {
      dispatch({
        type: SIGNIN_ERROR,
        payload: "Invalid User Name or Password"
      });
    });
};

export const signOutAction = () => dispatch => {
  dispatch({ type: SIGNOUT });
  helper.clearAuth();
  history.push("/");
};
export const createUserAction = (username, password, email) => dispatch => {
  const data = { username, password, email };
  dispatch({ type: SIGNIN });
  apiService
    .signUp(data)
    .then(options => {
      const { token } = options;
      helper.saveAuth(options);
      dispatch({
        type: LOGIN_SUCCESS,
        ...options
      });
      dispatch({ type: TOKEN, payload: token });
      history.push("/");
    })
    .catch(e => {
      dispatch({ type: SIGNIN_ERROR, payload: "Some that Wrong" });
    });
};

export const uploadUserImage = image => async dispatch => {
  dispatch({ type: UPLOAD_AVATAR });
  const result = await uploadImage(image);
  if (result.status === 200) {
    helper.updateUserInfo(result.data, "userAvatar");
    dispatch({ type: UPLOAD_AVATAR_SUCCESS, payload: result.data });
  } else if (
    result.status === 401 &&
    result.headers["token-expired"] === "true"
  ) {
    const refreshTokenResponse = await getRefreshToken();
    if (refreshTokenResponse.status !== 200) {
      dispatch({
        type: UPLOAD_AVATAR_ERROR,
        payload: refreshTokenResponse.data
      });
    }
    const { token, refToken } = refreshTokenResponse.data;
    helper.updateUserInfo(token, "access_token");
    helper.updateUserInfo(refToken, "refToken");
    dispatch({ type: TOKEN, payload: token });
    const uploadResponse = await uploadImage(image);
    if (uploadResponse.status === 200) {
      helper.updateUserInfo(uploadResponse.data, "userAvatar");
      dispatch({ type: UPLOAD_AVATAR_SUCCESS, payload: uploadResponse.data });
    }
  } else {
    dispatch({ type: UPLOAD_AVATAR_ERROR, payload: result.data });
  }
};

const uploadImage = async image => {
  const formData = new FormData();
  const imageName = helper.getLogin();
  const userName = helper.getLogin();
  formData.set("Name", userName);
  formData.append("image", image, imageName);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${helper.getToken()}`
  };
  try {
    const response = await axios.post(
      helper.urlConstants.uploadAvatarUrl,
      formData,
      { headers }
    );
    return response;
  } catch (e) {
    return e.response;
  }
};

const getRefreshToken = async () => {
  const jwtToken = helper.getToken();
  const refToken = helper.getrefToken();
  try {
    const response = await axios.post(helper.urlConstants.refreshToken, {
      Token: jwtToken,
      RefreshToken: refToken
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

export const UpdateRefreshToken = () => async dispatch => {
  const response = await getRefreshToken();
  const { token, refToken } = response.data;
  helper.updateUserInfo(token, "access_token");
  helper.updateUserInfo(refToken, "refToken");
  dispatch({ type: TOKEN, payload: token });
};
