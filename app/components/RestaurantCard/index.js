/**
 *
 * RestaurantCard
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from 'material-ui-rating';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    paddingLeft: '10px',
  },
}));

const Title = styled.h3`
  color: #000;
  font-size: 15px;
  line-height: 16px;
  padding-bottom: 2px;
  white-space: normal;
  text-align: left;
  font-family: Roboto, 'Noto Sans Devanagari UI', 'Noto Sans Bengali UI',
    'Noto Sans Telugu UI', 'Noto Sans Tamil UI', 'Noto Sans Gujarati UI',
    'Noto Sans Kannada UI', 'Noto Sans Malayalam UI', 'Noto Sans Gurmukhi UI',
    Arial, sans-serif;
`;

const Category = styled.p`
  color: #8c8c8c;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  font-family: Roboto, 'Noto Sans Devanagari UI', 'Noto Sans Bengali UI',
    'Noto Sans Telugu UI', 'Noto Sans Tamil UI', 'Noto Sans Gujarati UI',
    'Noto Sans Kannada UI', 'Noto Sans Malayalam UI', 'Noto Sans Gurmukhi UI',
    Arial, sans-serif;
  margin: 0px;
`;

const AddressLine = styled.p`
  color: #8c8c8c;
  font-size: 13px;
  line-height: 16px;
  text-align: left;
  font-family: Roboto, 'Noto Sans Devanagari UI', 'Noto Sans Bengali UI',
    'Noto Sans Telugu UI', 'Noto Sans Tamil UI', 'Noto Sans Gujarati UI',
    'Noto Sans Kannada UI', 'Noto Sans Malayalam UI', 'Noto Sans Gurmukhi UI',
    Arial, sans-serif;
  margin: 0px;
`;

function RestaurantCard(props) {
  const classes = useStyles();

  return (
    <div onClick={() => window.open(props.url).focus()} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <Title onClick={() => window.open(props.url).focus()} >{props.name} </Title>
            <div>
              {' '}
              <div style={{ display: 'inline' }}> {props.rating} </div>
              <div
                style={{
                  display: 'inline',
                  position: 'relative',
                  left: '-30px',
                }}
              >
                <Rating
                  value={props.rating}
                  max={5}
                  onChange={value => console.log(`Rated with value ${value}`)}
                  style={{ display: 'inline' }}
                />
              </div>
            </div>
            {props.category && props.category.length && props.category.length > 0 &&  <Category> {props.category.map(x => x.title).join('-').slice(0,-1)}</Category>
 } 
            {props.addresses &&
              props.addresses.map(line => (
                <AddressLine key={line}>{line}</AddressLine>
              ))}
          </Grid>
          <Grid item xs={5}>
            <div style={{ padding: '10px' }}>
              <img onClick={() => window.open(props.url).focus()} height="90px" width="80px" src={props.imageUrl} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

RestaurantCard.propTypes = {};

export default RestaurantCard;
