/**
 *
 * UseMyLocation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { geolocated } from 'react-geolocated';
import messages from './messages';

const Button = styled.button`
  @media only screen and (min-width: 768px) {
    position: relative;
    display: inline;
    left: 165px;
    top: 30px;
    z-index: 5;
    background: green;
    padding: 5px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
    font-size: 15px;
    color: white;
  }
  @media only screen and (max-width: 767px) {
    // position: relative;
    display: inline;
    // left: 165px;
    // top: 30px;
    z-index: 5;
    background: green;
    padding: 5px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
    font-size: 15px;
    color: white;
    width: 100%;
    margin-right: 30px;
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

function UseMyLocation(props) {
  const { location } = props;

  return (
    <Button
      onClick={() => {
        if (!props.isGeolocationAvailable || !props.isGeolocationEnabled)
          return location(undefined);
        if (props.coords) {
          return location(props.coords);
        }
      }}
    >
      Use My Location
    </Button>
  );
}

UseMyLocation.propTypes = {};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(UseMyLocation);
