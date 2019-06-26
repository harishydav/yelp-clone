/**
 *
 * HomePage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import MapSearchBox from '../../components/MapSearchBox';
import RestaurantCard from '../../components/RestaurantCard';

import UseMyLocation from '../../components/UseMyLocation';
import SearchBox from '../../components/SearchBox';

import { yelpSearchData } from './actions';

const { useEffect } = React;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 0,
    height: '100%',
  },

  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [mapVisibility, changeVisibility] = useState(false);
  useEffect(() => () => props.dispatch(yelpSearchData()), []);
  const {
    homePage: { businesses },
  } = props;
  // console.log('homePage: ', homePage);
  console.log('businesses: ', businesses);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        style={
          window.innerWidth > 767
            ? { display: 'none', height: 0 }
            : { background: '#4FBFD8' }
        }
      >
        <Grid style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '20px'}} container spacing={0}>
          <Grid item xs={12}>
              <Paper className={classes.paper}>
                <SearchBox
                coords={data =>
                  props.dispatch(
                  yelpSearchData({ lat: data.latitude, lng: data.longitude }),
                )
                              }
              />
              </Paper>
            </Grid>
            <Grid item xs={6}>
                <UseMyLocation
              location={data =>
                props.dispatch(
                  yelpSearchData({ lat: data.latitude, lng: data.longitude }),
                )
              }
            />
            </Grid>
          </Grid>
      </Paper>

      <Grid container spacing={0}>
        {businesses &&
          businesses.businesses &&
          businesses.businesses.length > 0 && (
            <Grid item sm={3}>
              <Paper className={classes.paper}>
                <div style={{ height: window.innerHeight, overflow: 'auto' }}>
                  {businesses.businesses.map(business => (
                    <RestaurantCard
                      name={business.name}
                      imageUrl={business.image_url}
                      addresses={business.location.display_address}
                      rating={business.rating}
                      category={business.categories}
                      url={business.url}
                      key={business.id}
                    />
                  ))}
                </div>
              </Paper>
            </Grid>
          )}
        <Grid
          item
          sm={
            businesses &&
            businesses.businesses &&
            businesses.businesses.length > 0
              ? 9
              : 12
          }
          style={window.innerWidth < 767 ? { display: 'none', height: 0 } : {}}
          xs={12}
        >
          <div style={{ height: 0 }}>
            <UseMyLocation
              location={data =>
                props.dispatch(
                  yelpSearchData({ lat: data.latitude, lng: data.longitude }),
                )
              }
            />
          </div>
          <Paper className={classes.paper}>
            <MapSearchBox
              coords={latLng => props.dispatch(yelpSearchData(latLng))}
              restaurants={
                businesses &&
                businesses.businesses &&
                businesses.businesses.length > 0
                  ? businesses.businesses.map(business => ({
                      lat: business.coordinates.latitude,
                      lng: business.coordinates.longitude,
                      url: business.url,
                      name: business.name,
                    }))
                  : []
              }
            />
          </Paper>
        </Grid>
      </Grid>
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
