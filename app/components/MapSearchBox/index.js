/**
 *
 * MapSearchBox
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const _ = require('lodash');
const { compose, withProps, lifecycle } = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require('react-google-maps');
const {
  SearchBox,
} = require('react-google-maps/lib/components/places/SearchBox');
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
import Icon from '@material-ui/core/Icon';

const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%`  }} />,
    containerElement: <div style={{ height: window.innerHeight }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624,
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center,
          );

          this.props.onSearch(nextCenter);

          this.setState({
            center: nextCenter,

            markers: nextMarkers,
          });
          console.log('nextCenter: ', nextCenter.lat(), nextCenter.lng());
          console.log('nextMarkers: ', nextMarkers);
          refs.map.fitBounds(bounds);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(props => {

  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={14}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_RIGHT}
        onPlacesChanged={props.onPlacesChanged}
      >
        {/* <div>asdafd</div> */}
        <input
          type="text"
          placeholder="Enter your Location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `440px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            left: '300px',
          }}
        />
      </SearchBox>

      {props.restaurantMarkers && props.restaurantMarkers.length > 0
        ? props.restaurantMarkers.map((marker, index) => (
          <MarkerWithLabel key={index} position={{lat: marker.lat, lng: marker.lng}}
          labelAnchor={new google.maps.Point(30, 0)}
          labelStyle={{ background: 'white' ,fontSize: "12px", fontWeight: "bold"}}
          onClick={() => window.open(marker.url).focus()}
              >
      <div  style={{width: '80px'}} >{marker.name}</div>


              </MarkerWithLabel>
        ))
        : props.markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}

    </GoogleMap>
  );
});

function MapSearchBox(props) {
  console.log('props restaurents: ', props.restaurants);

  return (
    <div>
      <MapWithASearchBox
        onSearch={data => props.coords({ lat: data.lat(), lng: data.lng() })}
        restaurantMarkers={props.restaurants}
      />
    </div>
  );
}

MapSearchBox.propTypes = {};

export default MapSearchBox;
