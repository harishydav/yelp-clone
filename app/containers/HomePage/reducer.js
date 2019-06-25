/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, YELP_SEARCH_DATA } from './constants';

export const initialState = {
  businesses: {},
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        return state;
      case `${YELP_SEARCH_DATA}_SUCCESS`: {
        draft.businesses = action.data;
        console.log('action.data: ', action.data);
        break;
      }
    }
  });

export default homePageReducer;
