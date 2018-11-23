import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiReducer from './apiReducer';
import viewReducer from './viewReducer';
import pollSurveyReducer from './pollSurveyReducer';

const rootReducer = combineReducers({
  apiState: apiReducer,
  viewState: viewReducer,
  pollSurveyState: pollSurveyReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;