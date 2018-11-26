import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  loggedIn: false,
  posts: [],
  awaitingResponse: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH_SUCCESS:
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
        awaitingResponse: false
      };

    case actionTypes.USER_LOGOUT:
      return {
        user: null,
        loggedIn: false,
        posts: [],
        awaitingResponse: false
      };

    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        awaitingResponse: false
      };

    case actionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.post, ...state.posts],
        awaitingResponse: false
      };

    case actionTypes.SUBMIT_VOTE_SUCCESS:
    case actionTypes.SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        awaitingResponse: false,
        posts: [...state.posts.filter(p => p._id !== action.post._id), action.post]
      };

    case actionTypes.RESOLVE_POST_SUCCESS:
    case actionTypes.PIN_POST_SUCCESS:
      return {
        ...state,
        awaitingResponse: false,
        posts: [...state.posts.filter(p => p._id !== action.post._id), action.post]
      };

    case actionTypes.AWAITING_RESPONSE:
      return {
        ...state,
        awaitingResponse: true
      };

    case actionTypes.SET_MESSAGES:
    case actionTypes.REQUEST_RESET_PASSWORD:
      return {
        ...state,
        awaitingResponse: false
      };
    
    case actionTypes.AVATAR_UPLOAD_SUCCESS:
    case actionTypes.AVATAR_REMOVE_SUCCESS:
      return {
        ...state,
        user: { 
          ...state.user,
          avatar: action.user.avatar 
        },
        awaitingResponse: false
      };

    case actionTypes.CREATE_SURVEY_SUCCESS:
    case actionTypes.FETCH_SURVEYS_SUCCESS:
    case actionTypes.FETCH_SURVEY_SUCCESS:
    case actionTypes.SUBMIT_SURVEY_RESPONSE_SUCCESS:
      return {
        ...state,
        awaitingResponse: false
      };
        
    default:
      return state;
  }
};