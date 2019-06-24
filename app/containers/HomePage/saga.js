import request from 'superagent';
import {
  takeLatest,
  put,
  call,
  select,
  all,
  throttle,
} from 'redux-saga/effects';

import { YELP_SEARCH_DATA } from './constants';
// Individual exports for testing

export function* yelpSearchData(action) {
  try {
    console.log('Ran the saga');

    const query = {
      latitude: 37.786882,
      longitude: -122.399972,
    };
    const data = yield request
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
      )
      .query(query)
      .set(
        'Authorization',
        'Bearer wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx',
      )
      .set('Access-Control-Allow-Origin', '*')
      .set('Origin', '')
      .set('Referer', '')
      .then(response => {
        if (!response.ok) {
          throw new Error('Something goes wrong with API');
        }
        console.log('response.body: ', response.body);
        return response.body;
      });
    yield put({ type: `${YELP_SEARCH_DATA}_SUCCESS`, data });
  } catch (error) {
    if (error.status === 400) {
      window.alert(error.response.body.reason);
    }

    // yield put({ type: `${GET_FEEDER_GRAPH_DATA}_FAILURE`, error });
  }
}
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(YELP_SEARCH_DATA, yelpSearchData);
}
