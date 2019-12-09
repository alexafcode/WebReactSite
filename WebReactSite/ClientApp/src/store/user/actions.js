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
import authHelpers from "../../utils/authHelpers";

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
      const {
        user,
        token,
        isAdmin,
        email,
        userAvatar,
        refToken
      } = response.data;
      helper.saveAuth(user, token, isAdmin, email, userAvatar, refToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
        token: token,
        email: email,
        isAdmin: isAdmin,
        userAvatar: userAvatar
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
      const {
        user,
        token,
        isAdmin,
        email,
        userAvatar,
        refToken
      } = response.data;
      helper.saveAuth(user, token, isAdmin, email, userAvatar, refToken);
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

export const uploadUserImage = image => async dispatch => {
  dispatch({ type: UPLOAD_AVATAR });
  const result = await uploadImage(image);
  console.log(result);
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
    authHelpers.updateUserInfo(token, "access_token");
    authHelpers.updateUserInfo(refToken, "refToken");
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
  const jwtToken = authHelpers.getToken();
  const refToken = authHelpers.getrefToken();
  try {
    const response = await axios.post(authHelpers.urlConstants.refreshToken, {
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
  authHelpers.updateUserInfo(token, "access_token");
  authHelpers.updateUserInfo(refToken, "refToken");
  dispatch({ type: TOKEN, payload: token });
};
