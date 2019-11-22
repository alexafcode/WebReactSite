import helper from "../../utils/authHelpers";

const initialState = {
  isAuthenticated: helper.isAuthenticated(),
  token: helper.getToken(),
  user: helper.getLogin(),
  email: helper.getEmail(),
  isAdmin: helper.isAdmin(),
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
        errorMessage: ""
      };
    case "LOGIN_SUCCESS":
      console.log(action);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        token: action.token,
        email: action.email,
        isAdmin: action.isAdmin
      };
    case "TOKEN":
      return {
        ...state,
        token: action.payload
      };
    case "SIGNIN_ERROR":
      console.log(action);
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload
      };
    case "SIGNOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        email: "",
        isAdmin: null
      };
    // case "ERROR_MESSAGE":
    //   return {
    //     ...state,
    //     errorMessage: action.payload
    //   };
    // case "LOADING":
    //   return {
    //     ...state,
    //     loading: action.payload
    //   };
    default:
      return state;
  }
};
