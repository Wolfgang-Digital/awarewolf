import * as actionTypes from '../actions/actionTypes';
import { arrayUtils } from '../utils';

const initialState = {
  surveys: [],
  polls: [],
  sortBy: 'byMostRecent',
  filterExclude: ['completed'],
  resultsPerPage: 21,
  pageIndex: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SURVEY_SUCCESS:
      return {
        ...state,
        surveys: [action.survey, ...state.surveys]
      };

    case actionTypes.FETCH_SURVEYS_SUCCESS:
      return {
        ...state,
        surveys: action.surveys
      };

    case actionTypes.FETCH_SURVEY_SUCCESS:
    case actionTypes.GET_SURVEY_RESPONSES_SUCCESS:
      return {
        ...state,
        surveys: [...state.surveys.filter(q => q._id !== action.survey._id), action.survey]
      };

    case actionTypes.SET_SURVEY_FILTER:
      const filterExclude = state.filterExclude.includes(action.filter) ?
        state.filterExclude.filter(n => n !== action.filter) :
        [action.filter, ...state.filterExclude];

      return {
        ...state,
        filterExclude
      };
    
    case actionTypes.SET_SURVEY_SORT_METHOD:
      if (!arrayUtils.sortMethods.hasOwnProperty(action.sortMethod.value)) return state;
      return {
        ...state,
        sortBy: action.sortMethod.value
      };

    case actionTypes.SET_SURVEY_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.index
      };

    default:
      return state;
  }
};