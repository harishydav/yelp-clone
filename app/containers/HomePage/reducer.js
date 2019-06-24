/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, YELP_SEARCH_DATA } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case `${YELP_SEARCH_DATA}_SUCCESS`: {
        console.log('action: ', action);
        console.log('state: ', state);
        return state.set('businesses', action.data);
      }
    }
  });

export default homePageReducer;
