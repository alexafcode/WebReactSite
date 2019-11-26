import {
  LOADING,
  SET_MODAL,
  SET_MODAL_ERROR,
  GET_THEME_SUCCESS,
  GET_THEME_ERROR,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_ERROR
} from "./constants";

const initialState = {
  forumTheme: [],
  error: false,
  errorMessage: "",
  loading: false,
  openModal: false,
  modalError: null
};
//ToDo Clear Error in Modal
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action.payload,
        modalError: null
      };
    }
    case SET_MODAL: {
      return {
        ...state,
        openModal: !state.openModal
      };
    }
    case SET_MODAL_ERROR: {
      return {
        ...state,
        loading: false,
        modalError: action.payload
      };
    }
    case GET_THEME_SUCCESS: {
      return {
        ...state,
        loading: false,
        forumTheme: [...action.payload]
      };
    }
    default:
      return state;
  }
};
