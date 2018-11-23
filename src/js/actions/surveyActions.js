import { api } from '../utils';
import * as actionTypes from './actionTypes';
import uuid from 'uuid/v1';

const MESSAGE_DURATION = 5000;

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

export const submitSurvey = (data, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.submitSurvey(data, token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.CREATE_SURVEY_SUCCESS,
            survey: res.data,
            message: { id, message: 'Survey created!', type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const fetchSurveys = token => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.fetchSurveys(token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.FETCH_SURVEYS_SUCCESS,
            surveys: res.data
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const fetchSurveyById = (id, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.fetchSurveyById(id, token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.FETCH_SURVEY_SUCCESS,
            survey: res.data
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const getSurveyResponses = (id, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.getSurveyResponses(id, token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.GET_SURVEY_RESPONSES_SUCCESS,
            survey: res.data
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const submitResponse = (data, id, token) => {
  return dispatch => {
    dispatch({ type: actionTypes.AWAITING_RESPONSE });

    api.submitSurveyResponse(data, id, token)
      .then(res => {
        if (res.success) {
          const id = uuid();

          dispatch({
            type: actionTypes.SUBMIT_SURVEY_RESPONSE_SUCCESS,
            message: { id, message: 'Response submitted!', type: 'success' }
          });

          window.setTimeout(() => dispatch({
            type: actionTypes.REMOVE_MESSAGES,
            id
          }), MESSAGE_DURATION);

        } else {
          setErrorMessage(dispatch, res.messages);
        }
      })
      .catch(err => {
        setErrorMessage(dispatch, err);
      });
  };
};

export const toggleSurveyFilter = filter => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_SURVEY_FILTER,
      filter
    });
  };
};

export const setSurveySortMethod = sortMethod => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_SURVEY_SORT_METHOD,
      sortMethod
    });
  };
};

export const setPageIndex = index => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_SURVEY_PAGE_INDEX,
      index
    })
  };
};