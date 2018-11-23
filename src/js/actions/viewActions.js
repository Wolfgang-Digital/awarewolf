import * as actionTypes from './actionTypes';
import uuid from 'uuid/v1';

const MESSAGE_DURATION = 5000;

export const dismissMessages = id => {
  return dispatch => {
    dispatch({
      type: actionTypes.REMOVE_MESSAGES,
      id
    });
  };
};

export const setErrorMessages = messages => {
  return dispatch => {
    const id = uuid();
    const msgs = Array.isArray(messages) ? messages : [messages];

    window.setTimeout(() => dispatch({
      type: actionTypes.REMOVE_MESSAGES,
      id
    }), MESSAGE_DURATION);
    dispatch({
      type: actionTypes.SET_MESSAGES,
      messages: msgs.map(e => ({ message: e, type: 'error', id }))
    });

    if (msgs.some(n => n.includes('authorisation'))) {
      const cookies = document.cookie.split(';');
      cookies.forEach(c => {
        const eqPos = c.indexOf('=');
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });
      dispatch({ type: actionTypes.USER_LOGOUT });
    }
  };
};

export const setPostSortMethod = sortMethod => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_POST_SORT_METHOD,
      sortMethod
    });
  };
};

export const setCommentSortMethod = sortMethod => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_COMMENT_SORT_METHOD,
      sortMethod
    });
  };
};

export const toggleFilter = filter => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_POST_FILTER,
      filter
    });
  };
};

export const setPostPageIndex = index => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_POST_PAGE_INDEX,
      index
    })
  };
};