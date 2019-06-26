/**
 *
 * SearchBox
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
const { compose, withProps, lifecycle } = require('recompose');
const { withScriptjs } = require('react-google-maps');
const {
  StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const SearchBox = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.props.coords({
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng(),
          });
          this.setState({
            places,
          });
        },
      });
    },
  }),
  withScriptjs,
)(props => (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search places"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `100%`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
  </div>
));

SearchBox.propTypes = {};

export default SearchBox;
