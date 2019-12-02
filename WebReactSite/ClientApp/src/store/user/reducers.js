import helper from "../../utils/authHelpers";
import {
  SIGNIN,
  LOGIN_SUCCESS,
  SIGNOUT,
  TOKEN,
  SIGNIN_ERROR
} from "./constants";

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
        isAdmin: null
      };
    default:
      return state;
  }
};
