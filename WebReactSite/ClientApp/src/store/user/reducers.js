import helper from "../../utils/authHelpers";

const initialState = {
  isAuthenticated: null,
  token: helper.getToken(),
  user: helper.getLogin(),
  error: false,
  errorMessage: "",
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: false
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case "TOKEN":
      return {
        ...state,
        token: action.payload
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload
      };
    case "ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
