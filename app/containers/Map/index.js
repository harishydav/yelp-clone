/**
 *
 * Map
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
import makeSelectMap from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Map() {
  useInjectReducer({ key: 'map', reducer });
  useInjectSaga({ key: 'map', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Map.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  map: makeSelectMap(),
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

export default compose(withConnect)(Map);
