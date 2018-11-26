import { api } from '../utils';
import * as actionTypes from './actionTypes';
import uuid from 'uuid/v1';

const MESSAGE_DURATION = 5000;

export const tryGetUserFromStorage = () => {
  return dispatch => {
    const user = document.cookie.split(';')
      .find(i => i.includes('wolfganger='));

    if (user) {
      dispatch({
        type: actionTypes.USER_AUTH_SUCCESS,
        user: JSON.parse(user.replace('wolfganger=', ''))
      });
    }
  };
};

const updateCookie = user => {
  document.cookie = `wolfganger=${JSON.stringify(user)};`;
};

const setErrorMessage = (dispatch, errorMsgs) => {
  const id = uuid();
  const msgs = Array.isArray(errorMsgs) ? errorMsgs : [errorMsgs];

  const errors = msgs.map(m => {
    return {
      id,
      message: m,
      type: 'error'
    };
  });

  dispatch({
    type: actionTypes.SET_MESSAGES,
    messages: errors
  });
  window.setTimeout(() => dispatch({
    type: actionTypes.REMOVE_MESSAGES,
    id
  }), MESSAGE_DURATION);

  if (typeof msgs[0] !== 'string') return;

  if (msgs.some(n => n.includes('Authorisation') || n.includes('authorisation'))) {
    const cookies = document.cookie.split(';');
    cookies.forEach(c => {
      const eqPos = c.indexOf('=');
      const name = eqPos > -1 ? c.substr(0, eqPos) : c;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    dispatch({ type: actionTypes.USER_LOGOUT });
  }
};

export const login = data => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.login(data)
      .then(res => {
        if (res.success) {
          // Save user to local storage.
          const user = res.data;
          document.cookie = `wolfganger=${JSON.stringify(user)};`;
          dispatch({
            type: actionTypes.USER_AUTH_SUCCESS,
            user
          });
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const logout = () => {
  return dispatch => {
    // Remove all cookies.
    const cookies = document.cookie.split(';');
    cookies.forEach(c => {
      const eqPos = c.indexOf('=');
      const name = eqPos > -1 ? c.substr(0, eqPos) : c;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    dispatch({ type: actionTypes.USER_LOGOUT });
  };
};

export const signup = data => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.signup(data)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.SET_MESSAGES,
            messages: [{ id, message: res.data, type: 'success' }]
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);
          
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      })
  };
};

export const fetchPosts = token => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.fetchPosts(token)
      .then(res => {
        if (res.success) {
          // Dispatch posts success.
          dispatch({
            type: actionTypes.FETCH_POSTS_SUCCESS,
            posts: res.data
          });
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const fetchPostById = (postId, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.fetchPost(postId, token)
      .then(res => {
        if (res.success) {
          // Dispatch posts success.
          dispatch({
            type: actionTypes.FETCH_POSTS_SUCCESS,
            posts: [res.data]
          });
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const submitPost = (data, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.createPost(data, token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.CREATE_POST_SUCCESS,
            post: res.data,
            message: { id, message: 'Post created!', type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const submitVote = (data, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.submitVote(token, data)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.SUBMIT_VOTE_SUCCESS,
            post: res.data,
            message: { id, message: 'Vote submitted!', type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  }
};

export const resolvePost = (id, { roles, token }) => {
  return dispatch => {
    if (!roles.includes('admin')) {
      setErrorMessage(dispatch, 'Admin permission required.');
      return;
    }
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.resolvePost(id, token)
      .then(res => {
        if (res.success) {
          const id = uuid();
          dispatch({
            type: actionTypes.RESOLVE_POST_SUCCESS,
            post: res.data,
            message: { id, message: res.message, type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  }
};

export const pinPost = (id, { roles, token }) => {
  return dispatch => {
    if (!roles.includes('admin')) {
      setErrorMessage(dispatch, 'Admin permission required.');
      return;
    }
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.pinPost(id, token)
      .then(res => {
        if (res.success) {
          const id = uuid();
          dispatch({
            type: actionTypes.PIN_POST_SUCCESS,
            post: res.data,
            message: { id, message: res.message, type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  }
};

export const submitComment = (data, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.createComment(token, data)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.SUBMIT_COMMENT_SUCCESS,
            post: res.data,
            message: { id, message: 'Comment submitted!', type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);
        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const uploadAvatar = (file, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.uploadAvatar(file, token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.AVATAR_UPLOAD_SUCCESS,
            user: res.data,
            message: { id, message: 'Image upload successful!', type: 'success' }
          });

          updateCookie(res.data);

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const removeAvater = token => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.removeAvatar(token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.AVATAR_REMOVE_SUCCESS,
            user: res.data,
            message: { id, message: 'Image removed successfully!', type: 'success' }
          });

          updateCookie(res.data);

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const confirmResetPassword = data => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.makeRequest({
      endpoint: `/auth/confirm-reset`,
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      }
    })
      .then(res => {
        if (res.success) {
          const id = uuid();

          const user = res.data;
          document.cookie = `wolfganger=${JSON.stringify(user)};`;

          dispatch({
            type: actionTypes.USER_AUTH_SUCCESS,
            user,
            message: { id, message: 'Password reset successful!', type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const requestResetPassword = email => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.makeRequest({ endpoint: `/auth/request-reset/${encodeURIComponent(email)}` })
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.REQUEST_RESET_PASSWORD,
            message: { id, message: `Sent to: ${email}`, type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          // Dispatch error message.
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};