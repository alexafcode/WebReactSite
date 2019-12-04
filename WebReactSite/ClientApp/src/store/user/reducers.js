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

// ToDo delete errorMessage
const initialState = {
  isAuthenticated: helper.isAuthenticated(),
  token: helper.getToken(),
  user: helper.getLogin(),
  email: helper.getEmail(),
  isAdmin: helper.isAdmin(),
  userAvatar: helper.getUserAvatar(),
  error: false,
  errorMessage: "",
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
        user: action.payload,
        loading: false,
        token: action.token,
        email: action.email,
        isAdmin: action.isAdmin
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
        error: true,
        errorMessage: action.payload
      };
    case SIGNOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        email: "",
        isAdmin: null,
        userAvatar: null
      };
    case UPLOAD_AVATAR:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ""
      };
    case UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        userAvatar: action.payload
      };
    case UPLOAD_AVATAR_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
