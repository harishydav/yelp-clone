/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import MapSearchBox from '../../components/MapSearchBox';

import { yelpSearchData } from './actions';

const { useEffect } = React;

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  useEffect(() => props.dispatch(yelpSearchData()), []);
  const { homePage } = props;
  console.log('homePage: ', homePage, Object.keys(props));
  return (
    <div>
      {/* <SearchBar style={{ position: 'fixed', top: '30px', right: 0 }} /> */}
      {/* <Map height="100em" /> */}
      <MapSearchBox />
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
