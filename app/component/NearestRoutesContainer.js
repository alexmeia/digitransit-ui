import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay/compat';
import { Store } from 'react-relay/classic';
import NearbyRouteListContainer from './NearbyRouteListContainer';
import NetworkError from './NetworkError';
import Loading from './Loading';

export default class NearestRoutesContainer extends Component {
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    modes: PropTypes.array.isRequired,
    placeTypes: PropTypes.array.isRequired,
    maxDistance: PropTypes.number.isRequired,
    maxResults: PropTypes.number.isRequired,
    timeRange: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    // useSpinner is used to only render the spinner on initial render.
    // After the initial render it is changed to false and data will be updated silently.
    this.useSpinner = true;
  }


  shouldComponentUpdate(nextProps) {
    return (
      nextProps.lat !== this.props.lat ||
      nextProps.lon !== this.props.lon ||
      nextProps.currentTime !== this.props.currentTime ||
      nextProps.modes !== this.props.modes ||
      nextProps.placeTypes !== this.props.placeTypes ||
      nextProps.maxDistance !== this.props.maxDistance ||
      nextProps.maxResults !== this.props.maxResults ||
      nextProps.timeRange !== this.props.timeRange
    );
  }

  render() {
    return (
      <QueryRenderer
        environment={Store}
        query={
          graphql`
            query NearestRoutesContainerQuery(
              $lat: Float!,
              $lon: Float!,
              $currentTime: Long!,
              $modes: [Mode!],
              $placeTypes: [FilterPlaceType!],
              $maxDistance: Int!,
              $maxResults: Int!,
              $timeRange: Int!
            ){
              nearest: viewer {
                ...NearbyRouteListContainer_nearest
              }
            }
          `
        }
        variables={{
          lat: this.props.lat,
          lon: this.props.lon,
          currentTime: this.props.currentTime,
          modes: this.props.modes,
          placeTypes: this.props.placeTypes,
          maxDistance: this.props.maxDistance,
          maxResults: this.props.maxResults,
          timeRange: this.props.timeRange,
        }}
        render={({ error, props, retry }) => {
          if (error) {
            this.useSpinner = true;
            return <NetworkError retry={retry} />;
          } else if (props) {
            this.useSpinner = false;
            return (
              <NearbyRouteListContainer
                nearest={props.nearest}
                currentTime={this.props.currentTime}
                timeRange={this.props.timeRange}
              />
            );
          }
          if (this.useSpinner === true) {
            return <Loading />;
          }
          return undefined;
        }}
      />
    );
  }
}
