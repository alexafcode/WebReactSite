import {
  LOADING,
  SET_MODAL,
  SET_ERROR,
  GET_THEME_SUCCESS,
  // ADD_POST_ERROR,
  // GET_THEME_ERROR,
  GET_POSTS_SUCCESS,
  // GET_POSTS_ERROR,
  // GET_COMMENT_SUCCESS,
  // GET_COMMENT_ERROR,
  GET_POST_SUCCESS
} from "./constants";

const initialState = {
  forumTheme: [],
  posts: [],
  post: [],
  error: false,
  errorMessage: "",
  loading: false,
  openModal: false
};
//ToDo Clear Error in Modal
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: null
      };
    }
    case SET_MODAL: {
      return {
        ...state,
        openModal: !state.openModal
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case GET_THEME_SUCCESS: {
      return {
        ...state,
        loading: false,
        forumTheme: [...action.payload]
      };
    }
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: action.payload //[...action.payload] arr.push([action.newItem])  [...state.arr, action.newItem]
      };
    }
    case GET_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    }
    default:
      return state;
  }
};
