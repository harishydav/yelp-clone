/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, YELP_SEARCH_DATA } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function yelpSearchData(data) {
  return {
    type: YELP_SEARCH_DATA,
    data,
  };
}
