import helper from "../../utils/authHelpers";
import {
  SIGNIN,
  LOGIN_SUCCESS,
  SIGNOUT,
  TOKEN,
  SIGNIN_ERROR,
  UPLOAD_AVATAR,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_ERROR
} from "./constants";

const initialState = {
  isAuthenticated: helper.isAuthenticated(),
  token: helper.getToken(),
  user: helper.getLogin(),
  email: helper.getEmail(),
  isAdmin: helper.isAdmin(),
  userAvatar: helper.getUserAvatar(),
  error: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        loading: false,
        token: action.token,
        email: action.email,
        isAdmin: action.isAdmin,
        userAvatar: action.userAvatar
      };
    case TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SIGNOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        email: "",
        isAdmin: null,
        userAvatar: null,
        error: null
      };
    case UPLOAD_AVATAR:
      return {
        ...state,
        loading: true,
        error: null,
        userAvatar: null
      };
    case UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        userAvatar: action.payload
      };
    case UPLOAD_AVATAR_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
