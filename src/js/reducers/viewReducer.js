import * as actionTypes from '../actions/actionTypes';
import { arrayUtils } from '../utils';

const initialState = {
  messages: [],
  redirectTo: '',
  postSortMethod: 'byMostRecent',
  commentSortMethod: 'byMostRecent',
  postFilters: ['pinned'],
  postsPerPage: 21,
  postPageIndex: 0,
  query: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: state.messages.concat(action.messages)
      };

    case actionTypes.REMOVE_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.id)
      };

    case actionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.message],
        redirectTo: `posts/${action.post._id}`
      };

    case actionTypes.CREATE_SURVEY_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.message],
        redirectTo: `surveys/${action.survey._id}`
      };

    case actionTypes.SUBMIT_VOTE_SUCCESS:
    case actionTypes.SUBMIT_COMMENT_SUCCESS:
    case actionTypes.RESOLVE_POST_SUCCESS:
    case actionTypes.PIN_POST_SUCCESS:
    case actionTypes.AVATAR_UPLOAD_SUCCESS:
    case actionTypes.AVATAR_REMOVE_SUCCESS:
    case actionTypes.REQUEST_RESET_PASSWORD:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };

    case actionTypes.SUBMIT_SURVEY_RESPONSE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.message],
        redirectTo: `/surveys`
      };

    case actionTypes.SET_POST_SORT_METHOD:
      if (!arrayUtils.sortMethods.hasOwnProperty(action.sortMethod.value)) return state;
      return {
        ...state,
        postSortMethod: action.sortMethod.value
      };

    case actionTypes.SET_COMMENT_SORT_METHOD:
      if (!arrayUtils.sortMethods.hasOwnProperty(action.sortMethod.value)) return state;
      return {
        ...state,
        commentSortMethod: action.sortMethod.value
      };

    case actionTypes.SET_POST_FILTER:
      const postFilters = state.postFilters.includes(action.filter) ?
        state.postFilters.filter(n => n !== action.filter) :
        [action.filter, ...state.postFilters];

      return {
        ...state,
        postFilters
      };

    case actionTypes.SET_POST_PAGE_INDEX:
      // TODO: Check that changing page keeps in range.
      return {
        ...state,
        postPageIndex: action.index
      };

    case actionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.query
      };

    default:
      return state;
  }
};